import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1d';

/**
 * Genera un JWT para un usuario
 * @param userId - ID del usuario
 * @returns token JWT
 */
function generateToken(userId: string) {
  return jwt.sign(
    { id: userId },
    JWT_SECRET as string,               // 👈 forzamos a string
    { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions // 👈 aclaramos tipo de las opciones
  );
}


/**
 * Registro de usuario
 * @route POST /api/auth/register
 * @param req.body.email - Email del usuario
 * @param req.body.password - Contraseña del usuario
 * @returns {token} JWT del usuario creado
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'El email ya está registrado' });

    const user = new User({ email, password });
    await user.save();

    const token = generateToken((user._id as string).toString());
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

/**
 * Login de usuario
 * @route POST /api/auth/login
 * @param req.body.email - Email del usuario
 * @param req.body.password - Contraseña del usuario
 * @returns {token} JWT si credenciales son válidas
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    // @ts-ignore porque TS no reconoce el método extra en el modelo
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = generateToken((user._id as string).toString());
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
