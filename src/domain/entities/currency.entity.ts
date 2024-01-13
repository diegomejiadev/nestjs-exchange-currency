export class CurrencyEntity {
  code: string;
  updated_at: string;
  data: Record<
    string,
    {
      code: string;
      value: number;
    }
  >;
}
