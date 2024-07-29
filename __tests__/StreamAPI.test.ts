import { StreamAPI } from '../src/modules/StreamAPI';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const ACCESS_KEY = process.env.ACCESS_KEY as string;
const LIBRARY_ID = process.env.LIBRARY_ID as string;

describe('StreamAPI', () => {
  let streamAPI: StreamAPI;

  beforeEach(() => {
    streamAPI = new StreamAPI(ACCESS_KEY, Number(LIBRARY_ID));
  });

  // Class helper methods
  it('should create a new StreamAPI instance', () => {
    expect(streamAPI).toBeInstanceOf(StreamAPI);
  });

  it('should get the access key', () => {
    expect(streamAPI.accessKey).toBe(ACCESS_KEY);
  });

  it('should set the access key', () => {
    streamAPI.accessKey = 'new-access';
    expect(streamAPI.accessKey).toBe('new-access');
  });

  it('should get the library ID', () => {
    expect(streamAPI.libraryId).toBe(Number(LIBRARY_ID));
  });

  it('should set the library ID', () => {
    streamAPI.libraryId = 123;
    expect(streamAPI.libraryId).toBe(123);
  });

  it('should get the API URL', () => {
    expect(streamAPI.apiUrl).toBe('https://video.bunnycdn.com');
  });

  it('should set the API URL', () => {
    streamAPI.apiUrl = 'https://example.com';
    expect(streamAPI.apiUrl).toBe('https://example.com');
  });

  // Manage Collections
  let collectionGuid: string;

  it('should create a new collection', async () => {
    const response = await streamAPI.createCollection({
      name: 'Test Collection',
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('guid');

    if (response.data !== undefined && response.data.guid !== undefined) {
      collectionGuid = response.data.guid;
    }
  });

  it('should get 401 when creating a new collection', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.createCollection({
      name: 'Test Collection',
    });
    expect(response.status).toBe(401);
  });

  it('should get an error response status when creating a new collection', async () => {
    streamAPI.apiUrl = 'https://example.com';
    const response = await streamAPI.createCollection({
      name: '',
    });
    expect(response.message).toBe('An unexpected error occurred.');
  });

  it('should get collection details', async () => {
    const response = await streamAPI.getCollection(collectionGuid);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('guid');
  });

  it('should get 401 when getting collection details', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.getCollection(collectionGuid);
    expect(response.status).toBe(401);
  });

  it('should get 404 when getting collection details', async () => {
    const response = await streamAPI.getCollection('invalid');
    expect(response.status).toBe(404);
  });

  it('should get an error response status when getting collection details', async () => {
    streamAPI.apiUrl = 'https://example.com';
    const response = await streamAPI.getCollection(collectionGuid);
    expect(response.message).toBe('An unexpected error occurred.');
  });

  it('should get collection list', async () => {
    const response = await streamAPI.getCollectionList();
    expect(response.status).toBe(200);
  });

  it('should get collection list with query parameters', async () => {
    const response = await streamAPI.getCollectionList(
      1,
      10,
      'Test Collection',
      'date',
      true
    );
    expect(response.status).toBe(200);
  });

  it('should get 401 when getting collection list', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.getCollectionList();
    expect(response.status).toBe(401);
  });

  it('should get an error response status when getting collection list', async () => {
    streamAPI.apiUrl = 'https://example.com';
    const response = await streamAPI.getCollectionList();
    expect(response.message).toBe('An unexpected error occurred.');
  });

  it('should update a collection', async () => {
    const response = await streamAPI.updateCollection(collectionGuid, {
      name: 'Updated Collection',
    });
    expect(response.status).toBe(200);
  });

  it('should get 401 when updating a collection', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.updateCollection(collectionGuid, {
      name: 'Updated Collection',
    });
    expect(response.status).toBe(401);
  });

  it('should get 404 when updating a collection', async () => {
    const response = await streamAPI.updateCollection('invalid', {
      name: 'Updated Collection',
    });
    expect(response.status).toBe(404);
  });

  it('should get an error response status when updating a collection', async () => {
    const response = await streamAPI.updateCollection(collectionGuid, {
      name: '',
    });
    expect(response.message).toBe('An unexpected error occurred.');
  });

  it('should delete a collection', async () => {
    const response = await streamAPI.deleteCollection(collectionGuid);
    expect(response.status).toBe(200);
  });

  it('should get 401 when deleting a collection', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.deleteCollection(collectionGuid);
    expect(response.status).toBe(401);
  });

  it('should get 404 when deleting a collection', async () => {
    const response = await streamAPI.deleteCollection('invalid');
    expect(response.status).toBe(404);
  });

  it('should get an error response status when deleting a collection', async () => {
    streamAPI.apiUrl = 'https://example.com';
    const response = await streamAPI.deleteCollection(collectionGuid);
    expect(response.message).toBe('An unexpected error occurred.');
  });

  // Manage Videos
  let videoGuid: string;

  it('should create a new video', async () => {
    const response = await streamAPI.createVideo({
      title: 'Test Video',
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('guid');

    if (response.data !== undefined) {
      videoGuid = response.data.guid;
    }
  });

  it('should get 401 when creating a new video', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.createVideo({
      title: 'Test Video',
    });
    expect(response.status).toBe(401);
  });

  it('should get an error response status when creating a new video', async () => {
    streamAPI.apiUrl = 'https://example.com';
    const response = await streamAPI.createVideo({
      title: '',
    });
    expect(response.message).toBe('An unexpected error occurred.');
  });

  it('should upload a video file', async () => {
    const file = fs.createReadStream(
      `${path.resolve(__dirname)}/assets/videos/test-video.mp4`
    );
    await streamAPI.tusUpload(
      videoGuid,
      file,
      function onProgress() {},
      function onSucces() {
        expect(true).toBe(true);
      },
      function onError() {}
    );
  });

  it('should get video details', async () => {
    const response = await streamAPI.getVideo(videoGuid);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('guid');
  });

  it('should get video list', async () => {
    const response = await streamAPI.listVideos();
    expect(response.status).toBe(200);
  });

  it('should get video list with query parameters', async () => {
    const response = await streamAPI.listVideos(1, 10, 'Test Video');
    expect(response.status).toBe(200);
  });

  it('should get 401 when getting video list', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.listVideos();
    expect(response.status).toBe(401);
  });

  it('should get an error response status when getting video list', async () => {
    streamAPI.apiUrl = 'https://example.com';
    const response = await streamAPI.listVideos();
    expect(response.message).toBe('An unexpected error occurred.');
  });

  it('should get 401 when getting video details', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.getVideo(videoGuid);
    expect(response.status).toBe(401);
  });

  it('should get 404 when getting video details', async () => {
    const response = await streamAPI.getVideo('invalid');
    expect(response.status).toBe(404);
  });

  it('should get an error response status when getting video details', async () => {
    streamAPI.apiUrl = 'https://example.com';
    const response = await streamAPI.getVideo(videoGuid);
    expect(response.message).toBe('An unexpected error occurred.');
  });

  it('should delete a video', async () => {
    const response = await streamAPI.deleteVideo(videoGuid);
    expect(response.status).toBe(200);
  });

  it('should get 401 when deleting a video', async () => {
    streamAPI.accessKey = 'invalid';
    const response = await streamAPI.deleteVideo(videoGuid);
    expect(response.status).toBe(401);
  });

  it('should get 404 when deleting a video', async () => {
    const response = await streamAPI.deleteVideo('invalid');
    expect(response.status).toBe(404);
  });

  it('should get an error response status when deleting a video', async () => {
    streamAPI.apiUrl = 'https://example.com';
    const response = await streamAPI.deleteVideo(videoGuid);
    expect(response.message).toBe('An unexpected error occurred.');
  });
});
