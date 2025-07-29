import { CreateEventProfileBody } from '../request/create-event-profile.body';

export type ImportParticipantBody = {
  email: string;
  name: string;
  profile?: CreateEventProfileBody;
};

export type ImportParticipantsBody = {
  participants: ImportParticipantBody[];
  makeProfile: boolean;
};
