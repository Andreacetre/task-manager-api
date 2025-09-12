import { Request, Response, NextFunction } from 'express';

/**
 * Middleware global de manejo de errores
 * @param err - Error capturado
 * @param req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param next - Función para pasar al siguiente middleware
 * @returns JSON con status code y mensaje de error
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log para debug

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};
