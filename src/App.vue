<template>
  <div id="app">
    <main class="min-h-screen">
      <HeaderTab :files="files" />

      <div class="flex w-full" style="height: 90vh">
        <div class="w-6/12 border-r border-black pr-12">
          <div class="bg-white h-5/6 relative">
            <div id="editor">
              {{
                `
                -- create a table \n
                CREATE TABLE students (\n
                  id INTEGER PRIMARY KEY,\n
                  name TEXT NOT NULL,\n
                  gender TEXT NOT NULL\n
                );\n
                -- insert some values\n
                INSERT INTO students VALUES (1, 'Ryan', 'M');\n
                INSERT INTO students VALUES (2, 'Joanna', 'F');\n
                -- fetch some values\n
                SELECT * FROM students WHERE gender = 'F';\n
                `
              }}
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

        <div class="w-6/12 border-l border-black pl-12">
          <div class="bg-white h-5/6 overflow-scroll p-4">
            <table class="border-separate border border-slate-500">
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
import customers from "@/assets/data/customers.js";
export default {
  name: "App",
  data() {
    return {
      files: [{ name: "students.sql" }],
      editor: null,
    };
  },
  components: {
    HeaderTab,
  },
  methods: {
    run() {
      console.log(this.editor.getValue());
    },
  },
  computed: {
    customersList() {
      return customers.split("\n");
    },
  },
  mounted() {
    this.editor = window.ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/sql");

    // console.log(customers.split("\n").slice(1));
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
