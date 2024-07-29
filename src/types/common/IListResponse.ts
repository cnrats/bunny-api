export interface IListResponse<T> {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  items?: T[];
}
