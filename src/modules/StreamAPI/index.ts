import {
  IVideoData,
  ICreateVideoModel,
  IUpdateCollectionModel,
  ICollectionData,
  IAPIResponse,
  IListResponse,
} from '../../types';
import * as tus from 'tus-js-client';
import crypto from 'crypto';
import fs from 'fs';

export class StreamAPI {
  private _accessKey: string;
  private _libraryId: number;
  private _apiUrl = 'https://video.bunnycdn.com';

  constructor(accessKey: string, libraryId: number) {
    this._accessKey = accessKey;
    this._libraryId = libraryId;
  }
  // Class helper methods
  get accessKey(): string {
    return this._accessKey;
  }
  set accessKey(value: string) {
    this._accessKey = value;
  }
  get libraryId(): number {
    return this._libraryId;
  }
  set libraryId(value: number) {
    this._libraryId = value;
  }
  get apiUrl(): string {
    return this._apiUrl;
  }
  set apiUrl(value: string) {
    this._apiUrl = value;
  }

  // Manage Collections
  public async createCollection(
    bodyParams: IUpdateCollectionModel
  ): Promise<IAPIResponse<ICollectionData>> {
    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/collections`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AccessKey: this._accessKey,
        },
        body: JSON.stringify(bodyParams),
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message:
          'The collection was successfuly created and returned as the response.',
        data: await response.json(),
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }
  public async getCollection(
    guid: string,
    includeThumbnails: boolean = false
  ): Promise<IAPIResponse<ICollectionData>> {
    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/collections/${guid}?includeThumbnails=${includeThumbnails}`,
      {
        method: 'GET',
        headers: {
          AccessKey: this._accessKey,
        },
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message: 'The collection was successfuly retrieved.',
        data: await response.json(),
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    } else if (response.status === 404) {
      return {
        status: response.status,
        message: 'The collection was not found.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }
  public async getCollectionList(
    page: number | null = null,
    itemsPerPage: number | null = null,
    search: string | null = null,
    orderBy: string | null = null,
    includeThumbnails: boolean | null = null
  ): Promise<IAPIResponse<IListResponse<ICollectionData>>> {
    let queryString = '';

    if (page !== null) {
      queryString += `page=${page}`;
    }

    if (itemsPerPage !== null) {
      queryString += `&itemsPerPage=${itemsPerPage}`;
    }

    if (search !== null) {
      queryString += `&search=${search}`;
    }

    if (orderBy !== null) {
      queryString += `&orderBy=${orderBy}`;
    }

    if (includeThumbnails !== null) {
      queryString += `&includeThumbnails=${includeThumbnails}`;
    }

    if (queryString.length > 0) {
      queryString = `?${queryString}`;
    }

    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/collections${queryString}`,
      {
        method: 'GET',
        headers: {
          AccessKey: this._accessKey,
        },
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message: 'The collections were successfuly retrieved.',
        data: await response.json(),
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }
  public async updateCollection(
    guid: string,
    bodyParams: IUpdateCollectionModel
  ): Promise<IAPIResponse<ICollectionData>> {
    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/collections/${guid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AccessKey: this._accessKey,
        },
        body: JSON.stringify(bodyParams),
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message: 'The collection was successfuly updated.',
        data: await response.json(),
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    } else if (response.status === 404) {
      return {
        status: response.status,
        message: 'The collection was not found.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }
  public async deleteCollection(guid: string): Promise<IAPIResponse<null>> {
    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/collections/${guid}`,
      {
        method: 'DELETE',
        headers: {
          AccessKey: this._accessKey,
        },
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message: 'The collection was successfuly deleted.',
        data: null,
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    } else if (response.status === 404) {
      return {
        status: response.status,
        message: 'The collection was not found.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }
  // Manage videos
  public async createVideo(
    bodyParams: ICreateVideoModel
  ): Promise<IAPIResponse<IVideoData>> {
    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/videos`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AccessKey: this._accessKey,
        },
        body: JSON.stringify(bodyParams),
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message:
          'The video was successfuly created and returned as the response.',
        data: await response.json(),
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }

  public async tusUpload(
    videoGuid: string,
    file: fs.ReadStream | Blob,
    onProgress: (bytesSent: number, bytesTotal: number) => void = () => {},
    onSucces: () => void = () => {},
    onError: (error: Error) => void = () => {}
  ): Promise<void> {
    const expire = (Math.floor(Date.now() / 1000) + 3600).toString();
    const signature = crypto
      .createHash('sha256')
      .update(this._libraryId + this._accessKey + expire + videoGuid)
      .digest('hex');
    const upload = new tus.Upload(file, {
      endpoint: `${this._apiUrl}/tusupload`,
      retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
      headers: {
        AuthorizationSignature: signature,
        AuthorizationExpire: expire,
        VideoId: videoGuid,
        LibraryId: this._libraryId.toString(),
      },
      onError: (error) => {
        onError(error);
      },
      onProgress: (bytesSent, bytesTotal) => {
        onProgress(bytesSent, bytesTotal);
      },
      onSuccess: () => {
        onSucces();
      },
    });

    upload.findPreviousUploads().then((previousUploads) => {
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }
      upload.start();
    });
  }

  public async getVideo(guid: string): Promise<IAPIResponse<IVideoData>> {
    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/videos/${guid}`,
      {
        method: 'GET',
        headers: {
          AccessKey: this._accessKey,
        },
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message: 'The video was successfuly retrieved.',
        data: await response.json(),
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    } else if (response.status === 404) {
      return {
        status: response.status,
        message: 'The video was not found.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }

  public async listVideos(
    page: number | null = null,
    itemsPerPage: number | null = null,
    search: string | null = null,
    collection: string | null = null,
    orderBy: string | null = null
  ): Promise<IAPIResponse<IListResponse<IVideoData>>> {
    let queryString = '';

    if (page !== null) {
      queryString += `page=${page}`;
    }

    if (itemsPerPage !== null) {
      queryString += `&itemsPerPage=${itemsPerPage}`;
    }

    if (search !== null) {
      queryString += `&search=${search}`;
    }

    if (collection !== null) {
      queryString += `&collection=${collection}`;
    }

    if (orderBy !== null) {
      queryString += `&orderBy=${orderBy}`;
    }

    if (queryString.length > 0) {
      queryString = `?${queryString}`;
    }

    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/videos${queryString}`,
      {
        method: 'GET',
        headers: {
          AccessKey: this._accessKey,
        },
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message: 'The videos were successfuly retrieved.',
        data: await response.json(),
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }

  public async deleteVideo(guid: string): Promise<IAPIResponse<null>> {
    const response = await fetch(
      `${this._apiUrl}/library/${this._libraryId}/videos/${guid}`,
      {
        method: 'DELETE',
        headers: {
          AccessKey: this._accessKey,
        },
      }
    );

    if (response.status === 200) {
      return {
        status: response.status,
        message: 'The video was successfuly deleted.',
        data: null,
      };
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: 'The request authorization failed.',
      };
    } else if (response.status === 404) {
      return {
        status: response.status,
        message: 'The video was not found.',
      };
    }

    return {
      status: response.status,
      message: 'An unexpected error occurred.',
    };
  }
}
