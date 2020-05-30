<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <div class="center" v-else-if="!records.length">
      Записей пока нет
      <div>
        <router-link to="/record">Добавить новую запись</router-link>
      </div>
    </div>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/paginationMixin";

export default {
  name: "History",
  components: {
    HistoryTable,
  },

  data: () => ({
    loading: true,
    records: [],
  }),

  mixins: [paginationMixin],

  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.setupPagination(
      this.records.map((record) => ({
        ...record,
        categoryName: categories.find((cat) => cat.id === record.categoryId)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      }))
    );

    this.loading = false;
  },
};
</script>
