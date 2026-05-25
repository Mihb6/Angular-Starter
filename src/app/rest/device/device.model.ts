export interface DeviceListQueryParameters {
  parentGuid?: string;
  typeGuid?: string;
}

export interface DeviceCreationDto {
  name: string;
  key: string;
  parentId: number | string | null;
  deviceType: string;
  groupGuids: any[];
  connectivityProperties: { [key: string]: any };
  attributes?: { [key: string]: any };
}

export interface DeviceCredentialsDto {
  name: string;
  key: string;
  password?: string;
}
