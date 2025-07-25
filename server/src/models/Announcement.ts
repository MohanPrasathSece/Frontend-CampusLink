import mongoose, { Schema, Document } from 'mongoose';
import { Role } from './User.js';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
