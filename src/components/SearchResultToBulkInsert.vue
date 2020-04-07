<template>
  <div>
    <h1>convertir</h1>
    <label for="input"> Input</label>
    <input id="input" v-model="input" />

    <pre  >{{output}}</pre>

    <button @click="convert">Convertir</button>
  </div>
</template>

<script lang="ts">
import { ShardsResponse, printBulkItems, searchResponseToBulkInsert, BulkOperation } from "@/core";
export default {
  data: function() {
    return {
      input: "",
      output: ""
    };
  },
  methods: {
    convert() {
      const searchResult = JSON.parse(this.input);
      this.output = printBulkItems(searchResponseToBulkInsert(searchResult), BulkOperation.Insert)
    }
  }
};
</script>

<style></style>
