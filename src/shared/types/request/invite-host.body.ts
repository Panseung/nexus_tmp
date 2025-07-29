import { EventHostAccessLevel } from '../enum/event-host-access-level.enum';

export type InviteHostBody = {
  email: string;
  listingEnabled: boolean;
  accessLevel: EventHostAccessLevel;
};
