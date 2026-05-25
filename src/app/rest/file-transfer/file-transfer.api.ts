import { Api } from "../api";
import { Observable } from "rxjs";
import { ApiResponse, MultiPart, RequestConfig } from "../rest.model";
import { DeviceFile, DeviceFileStatus } from "./file-transfer.model";
import { ApiClient } from "../api-client";

export class FileTransferApi extends Api {

  constructor(client: ApiClient) {
    super(client);
  }

  /**
   * Upload file to the device.
   */
  uploadFile(key: string, autoInstall: boolean, file: MultiPart) {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
      },
      authenticated: true,
      params: {
        autoInstall: autoInstall,
      }
    };

    const parts: MultiPart[] = [file];

    return this.apiClient.postMultipart<MultiPart[], DeviceFile>(`/api/devices/${key}/fileTransfer`, parts, config);
  }

  /**
   * Initiate download from url.
   */
  initiateDownloadFromUrl(key: string, autoInstall: boolean, url: string): Observable<ApiResponse<DeviceFile>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
      params: {
        autoInstall: autoInstall,
      }
    };

    return this.apiClient.post<string, DeviceFile>(`/api/devices/${key}/fileTransfer`, url, config);
  }

  /**
   * Install file by name or last update.
   */
  install(key: string, fileName?: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json',
        contentType: 'application/json'
      },
      params: {
        fileName: fileName
      }
    };

    return this.apiClient.post<void, void>(`/api/devices/${key}/fileTransfer/installation`, undefined, config);
  }

  /**
   * Returns the list of files on the device.
   */
  listFiles(key: string): Observable<ApiResponse<DeviceFile[]>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<DeviceFile[]>(`/api/devices/${key}/fileTransfer/files`, config);
  }

  /**
   * Delete file from device based on name.
   */
  delete(key: string, fileNames: string[]): Observable<ApiResponse<void>> {
    const params = {
      "fileNames": fileNames
    };

    const config: RequestConfig = {
      headers: {
        accept: 'application/vnd.bulk.operation+json'
      },
      authenticated: true,
      params
    };

    return this.apiClient.delete<void>(`/api/devices/${key}/fileTransfer/files`, config);
  }

  /**
   * Abort file transfer.
   */
  abort(key: string, fileName: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
      params: {
        fileName: fileName
      }
    };

    return this.apiClient.post<undefined, void>(`/api/devices/${key}/fileTransfer/transferAbortion`, undefined, config);
  }

  /**
   * Reset file transfer.
   */
  reset(key: string, fileName: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true,
      params: {
        fileName: fileName
      }
    };

    return this.apiClient.delete<void>(`/api/devices/${key}/fileTransfer`, config);
  }

  /**
   * Ask a device to send its list of files to platform.
   */
  readFilesFromDevice(key: string): Observable<ApiResponse<void>> {
    const config: RequestConfig = {
      headers: {
        accept: 'application/json'
      },
      authenticated: true
    };

    return this.apiClient.get<void>(`/api/devices/${key}/fileTransfer/refresh`, config);
  }

  fileStatus(key: string): Observable<DeviceFileStatus> {
    return this.apiClient.getStream('GET', `/api/sse/devices/${key}/fileTransferStatus`)
  }
}
