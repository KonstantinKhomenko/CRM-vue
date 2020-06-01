<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="orange"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localizeFilter';

export default {
  props: ['value'],
  data: () => ({
    links: [
      { title: localizeFilter('menu_Bill'), url: '/', exact: true },
      { title: localizeFilter('menu_History'), url: '/history' },
      { title: localizeFilter('menu_Planning'), url: '/planning' },
      { title: localizeFilter('menu_NewRecord'), url: '/record' },
      { title: localizeFilter('menu_Categories'), url: '/categories' }
    ]
  })
};
</script>

<style lang="scss" scoped>
.sidenav {
  a {
    &:hover {
      background-color: #fff06a;
    }
  }
}
</style>
