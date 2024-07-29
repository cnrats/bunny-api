export interface IAPIResponse<T> {
  status: number;
  message?: string;
  data?: T;
}
