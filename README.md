# Bunny.net api :rabbit:

A simple api for bunny.net services.

## Included Features :white_check_mark:

### STREAM API

- TUS Resumable Uploads

#### Manage Collections

- Get Collection
- Update Collection
- Delete Collection
- Get Collection List
- Create Collection

#### Manage Videos

- Get Video
- List Videos
- Create Video
- Delete Video

## Planned Features :construction:

### BUNNY.NET API

#### Countries

- Get Country List

#### API Keys

- List API Keys

#### Region

- Region list

#### Stream Video Library

- List Video Libraries
- Add Video Library
- Get Video Library
- Update Video Library
- Delete Video Library
- Get Languages
- Reset Password
- Reset Password
- Add Watermark
- Delete Watermark
- Add Allowed Referer
- Remove Allowed Referer
- Add Blocked Referer
- Remove Blocked Referer

#### DNS Zone

- List DNS Zones
- Add DNS Zone
- Get DNS Zone
- Update DNS Zones
- Delete DNS Zone
- Export DNS Zone
- Get DNS Query Statistics
- Check the DNS zone availability
- Add DNS Record
- Update DNS Record
- Delete DNS Record
- Import DNS Records

#### Pull Zone

- List Pull Zones
- Add Pull Zone
- Get Pull Zone
- Update Pull Zone
- Delete Pull Zone
- Delete Edge Rule
- Add/Update Edge Rule
- Set Edge Rule Enabled
- Get Origin Shield Qeue Statistics
- Get SafeHop Statistics
- Get Optimizer Statistics
- Load Free Certificate
- Purge Cache
- Check the pull zone availability
- Add Custom Certificate
- Remove Certificate
- Add Custom Hostname
- Remove Custom Hostname
- Set Force SSL
- Reset Token Key
- Add Allowed Referer
- Remove Allowed Referer
- Add Blocked Referer
- Remove Blocked Referer
- Add Blocked IP
- Remove Blocked IP

#### Purge

- Purge URL
- Purge URL

#### Statistics

- Get Statistics

#### Storage Zone

- List Storage Zones
- Add Storage Zone
- Check the storage zone availability
- Get Storage Zone
- Update Storage Zone
- Delete Storage Zone
- Get Storage Zone Statistics
- Reset Password
- Reset Read-Only Password

### EDGE STORAGE API

#### Manage Files

- Download File
- Upload File
- Delete File

#### Browse Files

- List Files

### STREAM API

#### Manage Videos

- Upload Video
- Update Video
- Get Video Heatmap
- Get Video play data
- Get Video Statistics
- Reencode Video
- Repackage Video
- Set Thumbnail
- Fetch Video
- Add Caption
- Delete Caption
- Transcribe video

#### OEmbed

- OEmbed

## Usage

### Stream API

#### Usage Example

Include in the project

    import { StreamAPI } from 'bunny-api';

Create a StreamAPI object

    const streamAPI = new StreamAPI(ACCESS_KEY, LIBRARY_ID);

Example code: creating a collection

    const response = await streamAPI.createCollection({
      name: 'Test Collection',
    });

#### Methods

##### Tus Resumable Uploads

| Method      | Description                | Parameters                                                                                                                               | Response      |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| tusUpload() | Uploads video file via tus | videoGuid: string, file: fs.ReadStream or Blob, onProgress(bytesSent: number, bytesTotal: number), onSucces: (), onError: (error: Error) | Promise: void |

#### Manage Collections

| Method              | Description                           | Parameters                                                                                                                                                                 | Response                                           |
| ------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| getCollection()     | Recives a collection data             | guid: string, includeThumbnails: boolean = false                                                                                                                           | Promise:IAPIResponse:ICollectionData               |
| updateCollection()  | Updates a collection data             | guid: string, bodyParams: IUpdateCollectionModel                                                                                                                           | Promise:IAPIResponse:ICollectionData               |
| deleteCollection()  | Deletes a collection                  | guid: string                                                                                                                                                               | Promise:IAPIResponse                               |
| getCollectionList() | Recives multiple collections and data | page: number or null = null, itemsPerPage: number or null = null, search: string or null = null, orderBy: string or null = null, includeThumbnails: boolean or null = null | Promise:IAPIResponse:IListResponse:ICollectionData |
| createCollection()  | Creates a collection                  | bodyParams: IUpdateCollectionModel                                                                                                                                         | Promise:IAPIResponse:ICollectionData               |

#### Manage Videos

| Method        | Description                      | Parameters                                                                                                                                                         | Response                                      |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| getVideo      | Recives a video data             | bodyParams: ICreateVideoModel                                                                                                                                      | Promise:IAPIResponse:IVideoData               |
| listVideos()  | Recives multiple videos and data | page: number or null = null, itemsPerPage: number or null = null, search: string or null = null, collection: string or null = null, orderBy: string or null = null | Promise:IAPIResponse:IListResponse:IVideoData |
| createVideo() | Creates a video                  | bodyParams: ICreateVideoModel                                                                                                                                      | Promise:IAPIResponse:IVideoData               |
| deleteVideo() | Deletes a video                  | guid: string                                                                                                                                                       | Promise:IAPIResponse                          |
