import { BulkItem, BulkOperation, DocContainer } from "./types";

export function printBulkItemInsert<T>(item: BulkItem<T>) {
    const meta = JSON.stringify(item.metadata);
    const content = JSON.stringify(item.content);
}

export function printBulkItem<T>(item: BulkItem<T>, op: BulkOperation=BulkOperation.Insert): string {
    switch (op) {
        case BulkOperation.Insert: {
            const meta = JSON.stringify({index: item.metadata});

            let content: T

            const container = item.content as DocContainer<T>
            if (container.doc !== undefined) {  
                content = container.doc
            } else {
                content = item.content as T
            }

            const parsed = JSON.stringify(content);
            return [meta, parsed].join("\n");
        }
    }

    return ""
}

export function printBulkItems<T>(items: Array<BulkItem<T>>, op: BulkOperation): string {
  const parts = new Array<string>();
  for (const item of items) {
    parts.push(printBulkItem<T>(item, op));
  }

  return parts.join("\n");
}
