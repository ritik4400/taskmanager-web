export type AuthResponse = {
  token: string;
  expiresAtUtc: string;
  fullName: string;
  email: string;
};

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
};
