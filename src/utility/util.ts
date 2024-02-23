import * as jwt from 'jsonwebtoken';

export const sign = (user) => {
  const { _id, role } = user;
  return jwt.sign(
    {
      id: _id,
      role,
    },
    process.env.JWT_SECRET,
  );
}
export const paginationHelper = (payload: any) => {
  if (payload.length) {
    return payload[0].count;
  } else {
    return 0;
  }
};

export function generateRandomOTP(): number {
  const otpLength = 6;
  const min = Math.pow(10, otpLength - 1);
  const max = Math.pow(10, otpLength) - 1;
  const randomOTP = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomOTP;
}
