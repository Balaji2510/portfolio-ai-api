import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.model';
import { IUser } from '../../models/user.model';

export class AuthService {
  private jwtSecret = process.env.JWT_SECRET || 'secret';
  private jwtExpiry: SignOptions['expiresIn'] = (process.env.JWT_EXPIRY || '24h') as SignOptions['expiresIn'];
  private refreshTokenExpiry: SignOptions['expiresIn'] = (process.env.REFRESH_TOKEN_EXPIRY || '7d') as SignOptions['expiresIn'];

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    designation?: string;
  }): Promise<{ user: IUser; token: string; refreshToken: string }> {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      designation: data.designation || '',
      role: 'USER',
      isActive: true,
    });

    const signOptions: SignOptions = { expiresIn: this.jwtExpiry };
    const token = jwt.sign({ userId: user._id, role: user.role }, this.jwtSecret, signOptions);

    const refreshSignOptions: SignOptions = { expiresIn: this.refreshTokenExpiry };
    const refreshToken = jwt.sign({ userId: user._id }, this.jwtSecret, refreshSignOptions);

    return {
      user: user.toJSON ? user.toJSON() : user,
      token,
      refreshToken,
    };
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string; refreshToken: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    if (!user.isActive) {
      throw new Error('User account is inactive');
    }

    const signOptions: SignOptions = { expiresIn: this.jwtExpiry };
    const token = jwt.sign({ userId: user._id, role: user.role }, this.jwtSecret, signOptions);

    const refreshSignOptions: SignOptions = { expiresIn: this.refreshTokenExpiry };
    const refreshToken = jwt.sign({ userId: user._id }, this.jwtSecret, refreshSignOptions);

    return {
      user: user.toJSON ? user.toJSON() : user,
      token,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtSecret) as any;
      const user = await User.findById(decoded.userId);

      if (!user || !user.isActive) {
        throw new Error('User not found or inactive');
      }

      const signOptions: SignOptions = { expiresIn: this.jwtExpiry as any };
      const newToken = jwt.sign({ userId: user._id, role: user.role }, this.jwtSecret, signOptions);

      const refreshSignOptions: SignOptions = { expiresIn: this.refreshTokenExpiry as any };
      const newRefreshToken = jwt.sign({ userId: user._id }, this.jwtSecret, refreshSignOptions);

      return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
