import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { asyncHandler } from '../../middleware/error.middleware';
import { AuthRequest } from '../../middleware/auth.middleware';

const usersService = new UsersService();

export class UsersController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await usersService.getAllUsers(page, limit);

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result.users,
      pagination: {
        total: result.total,
        page,
        limit,
        pages: Math.ceil(result.total / limit),
      },
    });
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const user = await usersService.getUserById(id);

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const user = await usersService.updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await usersService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  });

  static toggleStatus = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      res.status(400).json({
        success: false,
        message: 'isActive must be a boolean',
      });
      return;
    }

    const user = await usersService.toggleUserStatus(id, isActive);

    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: user,
    });
  });

  static changeRole = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { role } = req.body;

    if (!['ADMIN', 'USER'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Invalid role. Must be ADMIN or USER',
      });
      return;
    }

    const user = await usersService.changeUserRole(id, role);

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user,
    });
  });
}
