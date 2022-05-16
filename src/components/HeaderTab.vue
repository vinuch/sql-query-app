<template>
  <div>
    <div v-for="(file, idx) in files" :key="idx" class="tab active">
      <span>{{ file.name }}</span>
      <button class="ml-4 text-lg">x</button>
    </div> 
  </div>
</template>

<script>
export default {
  name: "HeaderTab",
  props: ["files"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.tab {
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
}
.tab.active {
  background: #e8e3e3;
}
</style>
