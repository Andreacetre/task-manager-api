import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para manejar rutas no encontradas (404)
 * @param req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param next - Función para pasar al siguiente middleware
 * @returns JSON con mensaje de "Ruta no encontrada"
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
};
