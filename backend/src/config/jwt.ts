export const JWT_CONFIG = {
  ACCESS_SECRET: (process.env.ACCESS_SECRET as string) || ("your_access_secret_key" as string),
  REFRESH_SECRET: (process.env.REFRESH_SECRET as string) || ("your_refresh_secret_key" as string),
  ACCESS_EXPIRES_IN: 86400000, // 1 day in milliseconds
  REFRESH_EXPIRES_IN: 604800000, // 7 days in milliseconds
  ACCESS_EXPIRES_TOKEN: "1d", // for jwt
  REFRESH_EXPIRES_TOKEN: "7d", // for jwt
};
