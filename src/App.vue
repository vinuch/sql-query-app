<template>
  <div id="app">
    <main class="min-h-screen relative">
      <HeaderTab
        :files="files"
        :activeTab="activeTab"
        @change-tab="(idx) => (activeTab = idx)"
        @add-file="() => addFile()"
        @remove-file="(idx) => removeFile(idx)"
      />

      <div class="flex flex-wrap w-full md:h-90vh">
        <div class="w-full md:w-6/12 h-80 mb-24 md:h-full md:mb-0 border-r border-black md:pr-12">
          <div class="flex justify-between items-center">
            <input
              type="text"
              placeholder="Enter a title"
              class="my-4 w-9/12 md:w-10/12 p-2"
              :value="files[activeTab].name"
            />
            <button class="bg-black p-3 text-white text-sm">Update</button>
          </div>

          <div class="bg-white h-5/6 relative">
            <div id="editor">
              {{ files[activeTab] && files[activeTab].query }}
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <button class="btn flex items-center" @click="run">
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

        <div class="w-full md:w-6/12 h-80 mb-24 md:h-full md:mb-0 border-l border-black md:pl-12">
          <h2 class="font-bold mb-2 mt-8">Output</h2>
          <div class="bg-white h-5/6 overflow-scroll p-4">
            <table
              v-if="files[activeTab].hasRun"
              class="border-collapse border border-slate-500"
            >
              <thead>
                <tr>
                  <th
                    v-for="(item, idx) in customersList[0].split(',')"
                    :key="idx + item"
                    class="border border-slate-600 font-bold"
                  >
                    {{ item }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, idx) in customersList.slice(1)"
                  :key="idx + item"
                >
                  <td
                    v-for="(data, id) in item.split(',')"
                    :key="id + data"
                    class="border border-slate-600"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="
                  margin: auto;

                  display: block;
                "
                width="100px"
                height="100px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="32"
                  stroke-width="8"
                  stroke="#1d0e0b"
                  stroke-dasharray="50.26548245743669 50.26548245743669"
                  fill="none"
                  stroke-linecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                  ></animateTransform>
                </circle>
              </svg>
            </div>
            <p v-else>(Run the program to view its output)</p>
          </div>

          <div class="flex justify-end mt-4">
            <button class="btn">Export JSON</button>
            <button class="btn">Export CSV</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab.vue";
// import customers from "@/assets/data/customers.js";
import orders from "@/assets/data/orders.js";
export default {
  name: "App",
  data() {
    return {
      loading: false,
      // hasRun: false,
      files: [
        {
          name: "students.sql",
          query: `-- create a table 
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT NOT NULL
);
-- insert some values
INSERT INTO students VALUES (1, 'Ryan', 'M');
INSERT INTO students VALUES (2, 'Joanna', 'F');
-- fetch some values
SELECT * FROM students WHERE gender = 'F';
`,
hasRun: false
        },
        { name: "employees.sql", query: "",hasRun: false },
      ],
      activeTab: 0,
      editor: null,
    };
  },
  components: {
    HeaderTab,
  },
  methods: {
    run() {
      if (this.editor.getValue() === "") {
        this.$toasted.show("There is nothing to run", { type: "error" });
      } else {
        if(this.files[this.activeTab].query !== this.editor.getSession().getValue()){
        // this.hasRun = false;
        this.files[this.activeTab].query = this.editor.getSession().getValue();
         this.files[this.activeTab].hasRun = false;

        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.files[this.activeTab].hasRun = true;
        }, 1000);
      }
       
      }
    },
    addFile() {
      this.files.push({ name: `Untitled-${this.files.length}.sql`, query: "",hasRun: false });
      this.activeTab = this.files.length - 1;
    },
    removeFile(idx) {
      console.log(this.activeTab);
      this.files.splice(idx, 1);
      // this.files = this.files.filter((item, id) => idx !== id)
      // this.activeTab = 1;
      // this.editor.setValue(this.files[this.activeTab].query);
      this.activeTab = this.files.length - 1;
      console.log(this.activeTab);

      // this.editor.setValue(this.files[this.files.length - 1].query);
    },
  },
  watch: {
    activeTab() {
      if (this.files[this.activeTab]) {
        this.editor.setValue(this.files[this.activeTab].query);
        // this.hasRun = false;
      } else {
        console.log(this.files, this.activeTab);
      }
    },
  },
  computed: {
    customersList() {
      return orders.split("\n");
    },
  },
  mounted() {
    this.editor = window.ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/sql");

    this.editor.getSession().on("change", () => {
      
      
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #c4c4c4;
}
.btn {
  background: #f6f6f6;
  padding: 10px 20px;
  border-radius: 8px;
  margin: 12px;
}
#editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
