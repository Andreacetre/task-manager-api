import { Request, Response } from 'express';
import Task from '../models/Task';

// Crear tarea
export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const task = new Task({ ...req.body, user: userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creando tarea', error });
  }
};

// Listar tareas del usuario autenticado
export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo tareas', error });
  }
};

// Obtener tarea por ID
export const getTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    if (task.user.toString() !== userId) return res.status(403).json({ message: 'No autorizado' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo tarea', error });
  }
};

// Actualizar tarea
export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    if (task.user.toString() !== userId) return res.status(403).json({ message: 'No autorizado' });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando tarea', error });
  }
};

// Eliminar tarea
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    if (task.user.toString() !== userId) return res.status(403).json({ message: 'No autorizado' });

    await task.deleteOne();
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando tarea', error });
  }
};
