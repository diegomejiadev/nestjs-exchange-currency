import { ILoadCurrency } from 'src/domain/interfaces/load-currency.interface';

export const USDCurrency: ILoadCurrency = {
  meta: {
    last_updated_at: new Date().toISOString(),
  },
  code: 'USD',
  data: {
    EUR: {
      code: 'EUR',
      value: 0.91,
    },
    PEN: {
      code: 'PEN',
      value: 3.7,
    },
    YEN: {
      code: 'YEN',
      value: 145.38,
    },
    GBP: {
      code: 'GBP',
      value: 0.78,
    },
  },
};

export const EURCurrency: ILoadCurrency = {
  meta: {
    last_updated_at: new Date().toISOString(),
  },
  code: 'EUR',
  data: {
    USD: {
      code: 'USD',
      value: 1.1,
    },
    PEN: {
      code: 'PEN',
      value: 4.07,
    },
    YEN: {
      code: 'YEN',
      value: 159.69,
    },
    GBP: {
      code: 'GBP',
      value: 0.86,
    },
  },
};

export const PENCurrency: ILoadCurrency = {
  meta: {
    last_updated_at: new Date().toISOString(),
  },
  code: 'PEN',
  data: {
    USD: {
      code: 'USD',
      value: 0.27,
    },
    EUR: {
      code: 'EUR',
      value: 0.25,
    },
    YEN: {
      code: 'YEN',
      value: 39.29,
    },
    GBP: {
      code: 'GBP',
      value: 0.21,
    },
  },
};

export const YENCurrency: ILoadCurrency = {
  meta: {
    last_updated_at: new Date().toISOString(),
  },
  code: 'YEN',
  data: {
    USD: {
      code: 'USD',
      value: 0.0069,
    },
    EUR: {
      code: 'EUR',
      value: 0.025,
    },
    PEN: {
      code: 'PEN',
      value: 0.0063,
    },
    GBP: {
      code: 'GBP',
      value: 0.0054,
    },
  },
};

export const GBPCurrency: ILoadCurrency = {
  meta: {
    last_updated_at: new Date().toISOString(),
  },
  code: 'GBP',
  data: {
    USD: {
      code: 'USD',
      value: 1.28,
    },
    EUR: {
      code: 'EUR',
      value: 1.16,
    },
    PEN: {
      code: 'PEN',
      value: 4.72,
    },
    YEN: {
      code: 'YEN',
      value: 185.42,
    },
  },
};
