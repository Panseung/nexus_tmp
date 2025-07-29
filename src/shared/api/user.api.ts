import createAxiosInstance from './axios.instance';

export async function fetchUsers(query: {
  take: number;
  page: number;
  search?: string;
}) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/users', {
    params: query,
  });
  return response.data.data;
}

export async function createUser(body: { [key: string]: string }) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.post('/users', body);
}

export async function updateUser(
  userId: string,
  body: { [key: string]: string }
) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.patch(`/users/${userId}`, body);
}

export async function deleteUser(userId: string) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.delete(`/users/${userId}`);
}

export async function fetchUserOtp(userId: string) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get(`/users/${userId}/otp`);
  return response.data.data;
}
