import {
  SearchResponse,
  BulkOperation,
  DocContainer,
  Hit,
  BulkMetaData,
  searchResponseToBulkInsert
} from "@/core";

class person {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

describe("Conversions", () => {
  it("search response to bulk insert", () => {
    const john = new person("John", "Doe");
    const hitID = "01";
    const hitIndex = "person";
    const hits: Array<Hit<person>> = [
      {
        _index: hitIndex,
        _type: "doc",
        _id: hitID,
        _score: 1,
        _source: john
      }
    ];

    const searchResponse: SearchResponse<person> = {
      took: 10,
      timed_out: false,
      _shards: {
        total: 1,
        failed: 0,
        skipped: 0,
        successful: 1
      },
      hits: {
        total: 1,
        max_score: 1,
        hits: hits
      }
    };

    const [bulkInsert] = searchResponseToBulkInsert(searchResponse);
    const personContainer: DocContainer<person> = {
      doc: john
    };

    expect(bulkInsert.content).toEqual(personContainer);
    expect(bulkInsert.operation).toEqual(BulkOperation.Insert);
    expect(bulkInsert.metadata._id).toEqual(hitID);
    expect(bulkInsert.metadata._index).toEqual(hitIndex);
  });
});
