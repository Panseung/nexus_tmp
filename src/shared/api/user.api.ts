import createAxiosInstance from './axios.instance';
import {
  User,
  UserListResponse,
  UserQueryParams,
  CreateUserRequest,
  UpdateUserRequest,
} from '../../entities/user/types/user.types';

export async function fetchUsers(
  query: UserQueryParams
): Promise<UserListResponse> {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/users', {
    params: query,
  });
  return response.data.data;
}

export async function fetchUserById(userId: string): Promise<User> {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data.data;
}

export async function createUser(body: CreateUserRequest): Promise<void> {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.post('/users', body);
}

export async function updateUser(
  userId: string,
  body: UpdateUserRequest
): Promise<void> {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.patch(`/users/${userId}`, body);
}

export async function deleteUser(userId: string): Promise<void> {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.delete(`/users/${userId}`);
}

export async function fetchUserOtp(userId: string): Promise<string> {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get(`/users/${userId}/otp`);
  return response.data.data;
}
