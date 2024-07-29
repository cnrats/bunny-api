export interface ICollectionData {
  videoLibraryId: number;
  guid?: string;
  name?: string;
  videoCount: number;
  totalSize: number;
  previewVideoIds?: string[];
  previewImageUrls?: string[];
}
