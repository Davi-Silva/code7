import jwt from 'jsonwebtoken';

export function generateAccessToken(adminId: string): string {
  return jwt.sign({ adminId }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
}

export function generateRefreshToken(adminId: string): string {
  return jwt.sign({ adminId }, process.env.JWT_REFRESH_TOKEN_SECRET);
}

export function decodeToken(token: string): any {
  let userObj: any;
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return {};

    userObj = user;
  });

  return userObj;
}
