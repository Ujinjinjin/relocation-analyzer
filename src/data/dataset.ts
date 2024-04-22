import type { TCountryDataDict } from '@/types/countries'
import type { TPeriodicExpense } from '@/types/expenses'

export const COUNTRIES: TCountryDataDict = {
  ES: {
    name: 'Spain',
    currency: 'EUR',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 25 },
          { name: 'Social', value: 6.45 }
        ],
        corporate: [
          { name: 'Payroll', value: 32 }
        ],
      },
      other: [
        { name: 'Rent', value: 850, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },
        { name: 'Gas', value: 30, period: 'month' },
        { name: 'Water', value: 40, period: 'month' },
        { name: 'Electricity', value: 80, period: 'month' },
        { name: 'Internet', value: 80, period: 'month' },
        { name: 'Gym', value: 75, period: 'month' }
      ]
    }
  },
  BG: {
    name: 'Bulgaria',
    currency: 'BGN',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 10 },
          { name: 'Social', value: 13.8 },
        ],
        corporate: [
          { name: 'Payroll', value: 20 }
        ]
      },
      other: [
        { name: 'Rent', value: 500, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },

        { name: 'Unknown', value: 350, period: 'month' }
      ]
    }
  },
  EE: {
    name: 'Estonia',
    currency: 'EUR',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 20 },
          { name: 'Social', value: 3.6 },
        ],
        corporate: [
          { name: 'Payroll', value: 33.8 }
        ]
      },
      other: [
        { name: 'Rent', value: 500, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },
        { name: 'Apartment Utilities', value: 250, period: 'month' },
        { name: 'Electricity', value: 50, period: 'month' },
        { name: 'Internet', value: 25, period: 'month' },
        { name: 'Phone Bill', value: 30, period: 'month' },
      ]
    }
  },
  GE: {
    name: 'Georgia',
    currency: 'GEL',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 20 },
          { name: 'Social', value: 2 },
        ],
        corporate: [
          { name: 'Payroll', value: 2 }
        ]
      },
      other: [
        { name: 'Rent', value: 500, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },
        { name: 'Apartment Utilities', value: 50, period: 'month' },
        { name: 'Internet', value: 50, period: 'month' },
        { name: 'Gym', value: 50, period: 'month' },
      ]
    }
  },
  HU: {
    name: 'Hungary',
    currency: 'HUF',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 15 },
          { name: 'Social', value: 18.5 },
        ],
        corporate: [
          { name: 'Payroll', value: 13 }
        ]
      },
      other: [
        { name: 'Rent', value: 1000, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },

        { name: 'Unknown', value: 350, period: 'month' }
      ]
    }
  },
  RO: {
    name: 'Romania',
    currency: 'RON',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 10 },
          { name: 'Social', value: 25 },
          { name: 'Health', value: 10 },
        ],
        corporate: [
          { name: 'Payroll', value: 6.25 }
        ]
      },
      other: [
        { name: 'Rent', value: 350, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },

        { name: 'Unknown', value: 350, period: 'month' }
      ]
    }
  },
  KZ: {
    name: 'Kazakhstan',
    currency: 'KZT',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 10 },
          { name: 'Social', value: 12 },
        ],
        corporate: [
          { name: 'Payroll', value: 18 }
        ]
      },
      other: [
        { name: 'Rent', value: 1000, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },

        { name: 'Unknown', value: 350, period: 'month' }
      ]
    }
  },
  CZ: {
    name: 'Czech Republic',
    currency: 'CZK',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 15 },
          { name: 'Social', value: 11.6 },
        ],
        corporate: [
          { name: 'Payroll', value: 34 }
        ]
      },
      other: [
        { name: 'Rent', value: 1000, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },

        { name: 'Unknown', value: 350, period: 'month' }
      ]
    }
  },
  PL: {
    name: 'Poland',
    currency: 'PLN',
    expenses: {
      taxes: {
        personal: [
          { name: 'Income', value: 32 },
          { name: 'Social', value: 23.5 },
        ],
        corporate: [
          { name: 'Payroll', value: 28.5 }
        ]
      },
      other: [
        { name: 'Rent', value: 500, period: 'month' },
        { name: 'Living', value: 500, period: 'month' },

        { name: 'Unknown', value: 350, period: 'month' }
      ]
    }
  },
}

export const SHARED_EXPENSES: TPeriodicExpense[] = [
  { name: 'Other', value: 3000, period: 'year' },
  { name: 'Spotify', value: 18, period: 'month' },
  { name: 'Netflix', value: 12, period: 'month' },
  { name: 'Dev Tools', value: 225, period: 'year' },
  { name: 'D&D Subscriptions', value: 60, period: 'year' },
]
