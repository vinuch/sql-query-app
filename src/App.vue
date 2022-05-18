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
      />
    </main>
  </div>
</template>

<script>
import HeaderTab from "@/components/HeaderTab.vue";
import FileView from "@/components/FileView.vue";
// import customers from "@/assets/data/customers.js";
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
          hasRun: false,
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
    run() {
      if (this.editor.getValue() === "") {
        this.$toasted.show("There is nothing to run", { type: "error" });
      } else {
        if (
          this.files[this.activeTab].query !==
          this.editor.getSession().getValue()
        ) {
          // this.hasRun = false;
          this.files[this.activeTab].query = this.editor
            .getSession()
            .getValue();
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
      this.files.push({
        name: `Untitled-${this.files.length}.sql`,
        query: "",
        hasRun: false,
      });
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
  mounted() {
    this.editor = window.ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/sql");
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
