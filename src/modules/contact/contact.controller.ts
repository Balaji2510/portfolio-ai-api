import { Request, Response } from 'express';
import { ContactService } from './contact.service';
import { asyncHandler } from '../../middleware/error.middleware';

const contactService = new ContactService();

export class ContactController {
  static submit = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required',
      });
      return;
    }

    const contact = await contactService.submitContact({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: contact,
    });
  });

  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await contactService.getAllContacts(page, limit);

    res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully',
      data: result.contacts,
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
    const contact = await contactService.getContactById(id);

    res.status(200).json({
      success: true,
      message: 'Contact retrieved successfully',
      data: contact,
    });
  });

  static markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const contact = await contactService.markAsRead(id);

    res.status(200).json({
      success: true,
      message: 'Contact marked as read',
      data: contact,
    });
  });

  static reply = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { reply } = req.body;

    if (!reply) {
      res.status(400).json({
        success: false,
        message: 'Reply message is required',
      });
      return;
    }

    const contact = await contactService.markAsReplied(id, reply);

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      data: contact,
    });
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    await contactService.deleteContact(id);

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  });
}
