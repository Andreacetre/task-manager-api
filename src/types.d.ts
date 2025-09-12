import { Request } from 'express';
import { Document } from 'mongoose';

// Usuario autenticado en request
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

// Modelo de tarea
export interface Task extends Document {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'done';
  dueDate?: Date;
  user: string; // ID del usuario dueño de la tarea
}
