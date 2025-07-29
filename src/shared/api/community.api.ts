import createAxiosInstance from './axios.instance';

export async function fetchCommunities(query: {
  take: number;
  page: number;
  search?: string;
}) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/communities', {
    params: query,
  });
  return response.data.data;
}

export async function fetchCommunityDetails(communityId: string) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get(`/communities/${communityId}`);
  return response.data.data;
}

export async function updateCommunity(
  communityId: string,
  body: { [key: string]: string }
) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.patch(`/communities/${communityId}`, body);
}

export async function deleteCommunity(communityId: string) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.delete(`/communities/${communityId}`);
}

export async function fetchCommunityMembers(
  communityId: string,
  query: {
    take: number;
    page: number;
    search?: string;
  }
) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get(
    `/communities/${communityId}/members`,
    {
      params: query,
    }
  );
  return response.data.data;
}
