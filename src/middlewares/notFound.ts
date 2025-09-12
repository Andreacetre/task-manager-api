import { Request, Response, NextFunction } from 'express';

// Middleware para rutas no encontradas
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
};
