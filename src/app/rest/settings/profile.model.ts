export interface UserUpdateDto {
  firstName: string;
  lastName: string;
}

export interface ChangePasswordRequest {
  username: string;
  oldPassword: string;
  newPassword: string;
}
