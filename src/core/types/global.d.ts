declare type DateFilter = {
  type: 'date';
  gte?: string;
  lte?: string;
  eq?: string;
  gt?: string;
  lt?: string;
};

declare type StringFilter = {
  type: 'string';
  eq?: string;
  leq?: string;
  req?: string;
  beq?: string;
};

declare type NumberFilter = {
  type: 'number';
  gte?: number;
  lte?: number;
  eq?: number;
  gt?: number;
  lt?: number;
};

declare type GetQuery = {
  table: 'settlement' | 'refund' | 'support'[];
  columns: Record<'settlement' | 'refund' | 'support', string[]>;
  filter: Record<
    'settlement' | 'refund' | 'support',
    Record<string, DateFilter | StringFilter | NumberFilter>
  >;
};
