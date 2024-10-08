import type { FilterQuery } from "mongoose";

type SortValues = -1 | 1 | "asc" | "ascending" | "desc" | "descending";

export type QueryFilter<TDO> = {
  queries?: FilterQuery<TDO>;
  limit?: number;
  skip?: number;
  sort?: Record<string, SortValues>;
  light?: boolean;
};

export type FilteredQueryFilter<TDO> = {
  queries?: FilterQuery<TDO>;
  limit?: number;
  skip?: number;
  sort?: Record<string, SortValues>;
  light?: boolean;
  filtered?: any;
};
