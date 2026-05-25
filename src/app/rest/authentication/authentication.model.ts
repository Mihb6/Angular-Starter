export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  user: User;
  refreshToken: string;
  accessList: SignInResponseAccess[];
  data: string | null; // Field used for OTP
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
}

export interface SignInResponseAccess {
  contextId: number;
  contextName: string;
  contextActive: boolean;
  masterContext: boolean;
  userActive: boolean;
  accessToken: string;
  roleNames: string[];
  permissions: string[];
  context: Context;
}

export interface Context {
  id: number;
  name: string;
  active: boolean;
  main: boolean;
}

export interface AccountActivationRequest {
  password: string;
  againPassword: string;
}

export interface ActiveInviteRequest {
  firstName: string;
  lastName: string;
  password: string;
  againPassword: string;
}

export interface SignUpByEmailRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  language: string;
  newsletterSubscription: boolean;
  acceptedEula: boolean;
}
