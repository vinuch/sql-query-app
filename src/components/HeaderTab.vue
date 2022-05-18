<template>
  <div class="flex flex-nowrap overflow-x-scroll sticky">
    <div
      v-for="(file, idx) in files"
      :key="idx"
      :class="`tab ${activeTab === idx ? 'active' : ''}`"
     @click.self="$emit('change-tab', idx)"
    >
      <span @click.self="$emit('change-tab', idx)">{{ file.name }}</span>
      <button class="ml-4 text-lg" @click.self="removeFile(idx)">x</button>
    </div>
    <div class="tab border-4 border-white text-lg hover:bg-white" @click="addFile">+</div>
  </div>
</template>

<script>
export default {
  name: "HeaderTab",
  props: ["files", "activeTab"],
  data() {
    return {};
  },
  methods: {
      addFile() {
          this.$emit('add-file');
      },
      removeFile(idx) {
          this.$emit('remove-file', idx);
      },
  }
};
</script>

<style scoped>
.tab {
  display: inline-flex;
  min-width: 180px;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tab:hover {
  background: #d2cdcd;
}
.tab.active {
  background: #e8e3e3;
}
</style>
