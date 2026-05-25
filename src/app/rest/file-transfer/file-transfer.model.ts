export interface DeviceFile {
  uuid: any;
  name: string;
  deviceKey: string;
  timestamp: number;
  checksum: string;
  fileSize: number;
  autoInstall: boolean;
  lastStatusUpdate: number;
  status: DeviceFileStatus;
  error: string;
}
export enum DeviceFileStatus {
  AWAITING_DEVICE = 'AWAITING_DEVICE',
  FILE_TRANSFER = 'FILE_TRANSFER',
  FILE_READY = 'FILE_READY',
  INSTALLING = 'INSTALLING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  ABORTED = 'ABORTED',
  UNKNOWN = 'UNKNOWN'
}
