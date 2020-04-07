// Complete definition of the Search response
export interface ShardsResponse {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
}

export interface Hit<T> {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: T;
  _version?: number;
  _explanation?: Explanation;
  fields?: any;
  highlight?: any;
  inner_hits?: any;
  matched_queries?: string[];
  sort?: string[];
}

export interface SearchResponse<T> {
  took: number;
  timed_out: boolean;
  _scroll_id?: string;
  _shards: ShardsResponse;
  hits: {
    total: number;
    max_score: number;
    hits: Array<Hit<T>>;
  };
  aggregations?: any;
}

export interface Explanation {
  value: number;
  description: string;
  details: Explanation[];
}

export enum BulkOperation {
  Update = "update",
  Insert = "insert",
  Delete = "delete"
}

export interface DocContainer<T> {
  doc: T;
}

export interface BulkMetaData {
  _index: string;
  _id: string;
  _type: string;
}

export interface BulkItem<T> {
  metadata: BulkMetaData;
  operation: BulkOperation;
  content: DocContainer<T> | T; // takes the type doc container for update
}
