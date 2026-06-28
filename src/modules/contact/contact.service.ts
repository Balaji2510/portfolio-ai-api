import Contact from '../../models/contact.model';
import Notification from '../../models/notification.model';
import { IContact } from '../../models/contact.model';

export class ContactService {
  async submitContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<IContact> {
    const contact = await Contact.create({
      ...data,
      status: 'NEW',
    });

    // Create notification for admin
    await Notification.create({
      title: `New Contact from ${data.name}`,
      message: `${data.name} (${data.email}) sent: ${data.subject}`,
      type: 'INFO',
      read: false,
    });

    return contact;
  }

  async getAllContacts(page: number = 1, limit: number = 20): Promise<{ contacts: IContact[]; total: number }> {
    const skip = (page - 1) * limit;
    const contacts = await Contact.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments();
    return { contacts, total };
  }

  async getContactById(id: string): Promise<IContact> {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async markAsRead(id: string): Promise<IContact> {
    const contact = await Contact.findByIdAndUpdate(id, { status: 'READ' }, { new: true });
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async markAsReplied(id: string, reply: string): Promise<IContact> {
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status: 'REPLIED', reply },
      { new: true }
    );
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async deleteContact(id: string): Promise<void> {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw new Error('Contact not found');
    }
  }
}
