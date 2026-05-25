import { UserGroup } from "../user-group/user-group.model";
import { PageParameters } from "../rest.model";

export interface MessageSubscription {
  uuid: string;
  userGroup: UserGroup;
  channels: string[];
}

export interface MessageSubscriptionUpsertDto {
  userGroupId: number;
  channels: string[];
}
