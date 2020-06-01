<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'amount' | localizeFilter }}</th>
        <th>{{ 'date' | localizeFilter }}</th>
        <th>{{ 'category' | localizeFilter }}</th>
        <th>{{ 'type' | localizeFilter }}</th>
        <th>{{ 'open' | localizeFilter }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, i) of records" :key="record.id">
        <td>{{ i + 1 }}</td>
        <td>{{ record.amount | currencyFilter('UAH') }}</td>
        <td>{{ record.date | dateFilter('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="viewDetails"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localizeFilter';

export default {
  name: 'HistoryTable',
  data: () => ({
    viewDetails: localizeFilter('viewDetails')
  }),

  props: {
    records: {
      type: Array,
      required: true
    }
  }
};
</script>
