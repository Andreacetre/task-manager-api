import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * Middleware para proteger rutas que requieren autenticación
 * @param req - Objeto de solicitud de Express
 * @param res - Objeto de respuesta de Express
 * @param next - Función para pasar al siguiente middleware
 * @returns 401 si no hay token o token inválido, o llama a next() si es válido
 */
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = { id: payload.id };
    next();
  } catch (err) {
    console.error('Error verificando token:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
}
