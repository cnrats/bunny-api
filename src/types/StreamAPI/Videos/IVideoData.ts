import type { ICaption } from './ICaption';
import type { IChapter } from './IChapter';
import type { IMoment } from './IMoment';
import type { IMetaTag } from './IMetaTag';
import type { ITranscodingMessage } from './ITranscodingMessage';

export interface IVideoData {
  videoLibraryId: number;
  guid: string;
  title: string;
  dateUploaded: string;
  views: number;
  isPublic: boolean;
  length: number;
  status: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Created, 1 = Uploaded, 2 = Processing, 3 = Transcoding, 4 = Finished, 5 = Error, 6 = UploadFailed
  framerate: number;
  rotation: number | null;
  width: number;
  height: number;
  availableResolutions: string[];
  thumnailCount: number;
  encodeProgress: number;
  storageSize: number;
  captions: ICaption[] | null;
  hasMP4Fallback: boolean;
  collectionId: string | null;
  thumbnailFileName: string | null;
  avarageWatchTime: number;
  totalWatchTime: number;
  category: string | null;
  chapters: IChapter[] | null;
  moments: IMoment[] | null;
  metaTags: IMetaTag[] | null;
  transcodingMessages: ITranscodingMessage[] | null;
}
