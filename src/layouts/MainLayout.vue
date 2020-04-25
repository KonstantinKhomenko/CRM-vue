<template>
  <div class="app-main-layout">
    <Navbar @openSidebar="isOpen = !isOpen" />

    <Sidebar v-model="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <BtnNewRecord />
  </div>
</template>

<script>
import Navbar from "../components/app/Navbar";
import Sidebar from "../components/app/Sidebar";
import BtnNewRecord from "../components/app/BtnNewRecord";

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar,
    BtnNewRecord,
  },
  data: () => ({
    isOpen: true,
  }),
};
</script>
