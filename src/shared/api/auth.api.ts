import createAxiosInstance from './axios.instance';

export async function signIn(email: string, password: string) {
  const credentials = btoa(`${email}:${password}`);
  const axiosInstance = createAxiosInstance();
  await axiosInstance.post('auth/token', undefined, {
    headers: {
      Authorization: `Basic ${credentials}`,
    },
  });
}

export async function signOut() {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.delete('auth/token');
}

export async function verifyToken() {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.post('auth/token/verify');
  return response.data.data;
}
