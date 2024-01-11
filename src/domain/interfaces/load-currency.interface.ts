export interface ILoadCurrency {
  meta: {
    last_updated_at: string;
  };
  code: string;
  data: Record<
    string,
    {
      code: string;
      value: number;
    }
  >;
}
