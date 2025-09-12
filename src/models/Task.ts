import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz de Task para TypeScript
 */
export interface ITask extends Document {
  title: string;                  // Título de la tarea
  description?: string;            // Descripción opcional
  dueDate?: Date;                  // Fecha de vencimiento
  status: 'pending' | 'in-progress' | 'done'; // Estado de la tarea
  user: mongoose.Types.ObjectId;   // Referencia al usuario dueño de la tarea
}

/**
 * Esquema de Task para MongoDB
 */
const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'done'], 
      default: 'pending' 
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', taskSchema);
