export interface IDefaultRespose<T> {
  data: T | null;
  statusCode: number;
  success: boolean;
  error: string | string[] | undefined;
}
