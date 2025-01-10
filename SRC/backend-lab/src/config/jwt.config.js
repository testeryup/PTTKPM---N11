import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'chihuahua';
export const JWT_ACCESS_EXPRISES_IN = '15m';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'chihuahua';
export const JWT_REFRESH_EXPRISES_IN = '24h';

export const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPRISES_IN });
};
export const generateRefreshToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPRISES_IN });
};

export const verifyRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });
    return decoded;
  } catch (error) {
    return null;
  }
}
