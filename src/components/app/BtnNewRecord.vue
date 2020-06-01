<template>
  <div class="fixed-action-btn">
    <router-link
      class="btn-floating btn-large blue"
      to="/record"
      v-tooltip="msg"
      :key="msg"
    >
      <i class="large material-icons">add</i>
    </router-link>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localizeFilter';

export default {
  name: 'BtnNewRecord',
  computed: {
    msg() {
      return localizeFilter('newRecord');
    }
  }
};
</script>
