import { ShardsResponse } from "@/core/types";

function isShardsResponse(arg: ShardsResponse): arg is ShardsResponse {
  return (
    arg &&
    arg.total != undefined &&
    typeof arg.total == "number" &&
    arg.failed !== undefined &&
    typeof arg.failed == "boolean" &&
    arg.skipped !== undefined &&
    typeof arg.skipped == "boolean" &&
    arg.successful !== undefined &&
    typeof arg.successful == "boolean"
  );
}
