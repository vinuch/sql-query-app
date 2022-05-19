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
      <FileView
        :files="files"
        :activeTab="activeTab"
        :run="run"
        :editor="editor"
        :loading="loading"
        @update-file="(idx, title) => updateFile(idx, title)"
      />
    </main>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab.vue";
import FileView from "@/components/FileView.vue";
import data from "@/assets/data";
export default {
  name: "App",
  data() {
    return {
      resultOptions: [],
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
SELECT * FROM customers WHERE gender = 'F';
`,
          hasRun: false,
          result: "",
        },
        { name: "employees.sql", query: "", hasRun: false },
      ],
      activeTab: 0,
      editor: null,
    };
  },
  components: {
    HeaderTab,
    FileView,
  },
  methods: {
    updateFile(idx, title) {
      this.files[idx].name = title;
    },
    run() {
      if (this.editor.getValue() === "") {
        this.files[this.activeTab].hasRun = false;
        this.$toasted.show("There is nothing to run", {
          type: "error",
          duration: 2000,
        });
      } else {
  
        this.files[this.activeTab].query = this.editor.getSession().getValue();
        this.files[this.activeTab].hasRun = false;

        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.files[this.activeTab].hasRun = true;
          this.files[this.activeTab].result =
            this.resultOptions[
              Math.floor(Math.random() * this.resultOptions.length)
            ];
        }, 500);
      }
    },
    addFile() {
      this.files.push({
        name: `Untitled-${this.files.length}.sql`,
        query: "",
        hasRun: false,
      });
      this.activeTab = this.files.length - 1;
    },
    removeFile(idx) {
      this.files.splice(idx, 1);
      this.activeTab = this.files.length - 1;
    },
  },
  watch: {
    activeTab() {
      if (this.files[this.activeTab]) {
        this.editor.setValue(this.files[this.activeTab].query);
      }
    },
  },
  mounted() {
    this.editor = window.ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/sql");
    // this.resultOptions = [orders, customers, employees]
    let { orders, customers, employees } = data;
    this.resultOptions = [orders, customers, employees];

    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage =
        "It looks like you have been editing something. " +
        "If you leave before saving, your changes will be lost.";

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
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
