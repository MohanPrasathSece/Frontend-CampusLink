import mongoose, { Schema, Document } from 'mongoose';

export enum Role {
  Student = 'student',
  Admin = 'admin'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.Student
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
