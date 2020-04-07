import {
  SearchResponse,
  DocContainer,
  BulkOperation,
  BulkMetaData,
  BulkItem
} from "@/core/types";

/**
 * Convert search response to bulk format, two arrays are returned, first contains
 * metadata and second the arguments. Both arrays has the same length and same index i
 * in arrays represent one bulk registry
 * @param response
 */
export function searchResponseToBulkInsert<T>(
  response: SearchResponse<T>
): Array<BulkItem<T>> {
  const items = new Array<BulkItem<T>>();

  for (const hit of response.hits.hits) {
    const meta: BulkMetaData = {
      _id: hit._id,
      _index: hit._index,
      _type : hit._type? hit._type: "doc"
    };

    const docContainer: DocContainer<T> = {
      doc: hit._source
    };

    const item: BulkItem<T> = {
      metadata: meta,
      content: docContainer,
      operation: BulkOperation.Insert
    };

    items.push(item);
  }

  return items;
}
