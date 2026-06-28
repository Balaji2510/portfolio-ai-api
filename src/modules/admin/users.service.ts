import User from '../../models/user.model';
import { IUser } from '../../models/user.model';

export class UsersService {
  async getAllUsers(page: number = 1, limit: number = 10): Promise<{ users: IUser[]; total: number }> {
    const skip = (page - 1) * limit;
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    return { users, total };
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
    const { password, ...updateData } = data as any;

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('User not found');
    }
  }

  async toggleUserStatus(id: string, isActive: boolean): Promise<IUser> {
    const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async changeUserRole(id: string, role: 'ADMIN' | 'USER'): Promise<IUser> {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
