import createAxiosInstance from './axios.instance';
import { ImportParticipantsBody } from '../types/request/import-participants.body';
import { InviteHostBody } from '../types/request/invite-host.body';

export async function fetchEvents(query: {
  take: number;
  page: number;
  search?: string;
  filter?: string;
  sort?: string;
  order?: string;
}) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get('/events', {
    params: query,
  });
  return response.data.data;
}

export async function fetchEventDetails(eventId: string) {
  const axiosInstance = createAxiosInstance();
  const response = await axiosInstance.get(`/events/${eventId}`);
  return response.data.data;
}

export async function updateEvent(
  eventId: string,
  body: { [key: string]: string }
) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.patch(`/events/${eventId}`, body);
}

export async function deleteEvent(eventId: string) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.delete(`/events/${eventId}`);
}

export async function importParticipants(
  eventId: string,
  body: ImportParticipantsBody
) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.post(`/events/${eventId}/import-participants`, body);
}

export async function addHost(eventId: string, body: InviteHostBody) {
  const axiosInstance = createAxiosInstance();
  await axiosInstance.post(`/events/${eventId}/hosts`, body);
}
