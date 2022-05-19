<template>
  <div class="flex flex-wrap w-full md:h-90vh">
    <div
      class="w-full md:w-6/12 h-80 mb-24 md:h-full md:mb-0 border-r border-black md:pr-12"
    >
      <div class="flex justify-between items-center">
        <input
          id="title-input"
          type="text"
          placeholder="Enter a title"
          class="my-4 w-9/12 md:w-10/12 p-2"
          v-model="title"
        />
        <button
          :class="` p-3 text-white text-sm ${
            title === files[activeTab].name
              ? 'bg-black bg-opacity-50 cursor-not-allowed'
              : 'bg-black'
          }`"
          :disabled="title === files[activeTab].name"
          @click.self="saveTitle"
        >
          Update
        </button>
      </div>

      <div class="bg-white h-5/6 relative">
        <div id="editor">
          {{ files[activeTab] && files[activeTab].query }}
        </div>
      </div>
      <div class="flex justify-center mt-4">
        <button class="btn flex items-center" @click="run" id="run-btn">
          <span>RUN</span>
          <svg
            class="ml-3"
            width="24"
            height="18"
            viewBox="0 0 24 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 1.18599L23.0654 15L1.25 28.814L1.25 1.18599Z"
              stroke="black"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="w-full md:w-6/12 h-80 mb-24 md:h-full md:mb-0 border-l border-black md:pl-12"
    >
      <h2 class="font-bold mb-2 mt-8">Output</h2>
      <div class="bg-white h-5/6 overflow-scroll p-4">
        <table
          v-if="files[activeTab].hasRun"
          class="border-collapse border border-slate-500"
        >
          <thead>
            <tr>
              <th
                v-for="(item, idx) in resultList[0].split(',')"
                :key="idx + item"
                class="border border-slate-600 font-bold w-32"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in resultList.slice(1)" :key="idx + item">
              <td
                v-for="(data, id) in item.split(',')"
                :key="id + data"
                class="border border-slate-600 overflow-x-scroll max-w-xs w-32 whitespace-pre"
              >
                {{ data }}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-else-if="loading"
          class="h-full flex justify-center items-center"
        >
          <Loading />
        </div>
        <p v-else>(Run the program to view its output)</p>
      </div>

      <div class="flex justify-end mt-4">
        <button
          class="btn"
          @click="downloadCSV"
       
        >
          Export CSV
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
// import {orders, customers, employees} from "@/assets/data/";

export default {
  props: ["files", "activeTab", "run", "loading"],
  components: {
    Loading,
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    saveTitle() {
      if (this.title.endsWith(".sql")) {
        this.$emit("update-file", this.activeTab, this.title);
      } else {
        this.title = this.title + ".sql";
        this.$emit("update-file", this.activeTab, this.title);
      }
    },
    downloadCSV() {
      if(this.files[this.activeTab].result){
           var encodedUri = encodeURI(
        [
          "data:text/csv;charset=utf-8," + this.files[this.activeTab].result,
        ].join("\n")
      );
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${this.files[this.activeTab].name.replace('.sql', '')}.csv`);
      document.body.appendChild(link);

      link.click();
      }else {
          this.$toasted.show("There is nothing to export, Run code first", {
          type: "error",
          duration: 2000,
        });
      }
   
    },
  },
  computed: {
    resultList() {
      return this.files[this.activeTab].result.split("\n");
    },
  },
  mounted() {
    this.title = this.files[this.activeTab].name;
  },
};
</script>

<style lang="scss" scoped></style>
