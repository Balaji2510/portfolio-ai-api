import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { asyncHandler } from '../../middleware/error.middleware';
import { AuthRequest } from '../../middleware/auth.middleware';

const authService = new AuthService();

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { firstName, lastName, email, password, designation } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: firstName, lastName, email, password',
      });
      return;
    }

    const result = await authService.register({
      firstName,
      lastName,
      email,
      password,
      designation,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  });

  static login = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
      return;
    }

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  });

  static refreshToken = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
      return;
    }

    const result = await authService.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: result,
    });
  });

  static getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const User = require('../../models/user.model').default;
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Current user retrieved successfully',
      data: user,
    });
  });

  static logout = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  });
}
