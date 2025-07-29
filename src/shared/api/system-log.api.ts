import createAxiosInstance from './axios.instance';

export async function fetchSystemLogs(query: {
  take: number;
  page: number;
  search?: string;
  filter?: string;
  sort?: string;
  order?: string;
}) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/system-logs', {
    params: query,
  });
  return response.data.data;
}

export async function fetchSystemLogDetails(logId: string) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get(`/system-logs/${logId}`);
  return response.data.data;
}
