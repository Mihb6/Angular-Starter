export interface DeviceGroupsListQueryParameters {
  query?: string;
  systemManaged?: boolean;
}

export interface DeviceGroupsDevicesListQueryParameters {
  query?: string;
  type?: string;
  typeId?: number;
}

export interface DeviceGroupCreationDto {
  name: string;
  description: string | null
}

export interface DeviceGroup {
  uuid: string;
  name: string;
  description: string;
}
