<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'edit' | localizeFilter }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{
              cat.title
            }}</option>
          </select>
          <label>{{ 'selectCategory' | localizeFilter }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ 'title' | localizeFilter }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >{{ 'enterCategory' | localizeFilter }}</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{
              invalid:
                ($v.limit.$dirty && !$v.limit.required) ||
                ($v.limit.$dirty && !$v.limit.minValue)
            }"
          />
          <label for="limit">{{ 'limit' | localizeFilter }}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.required"
            class="helper-text invalid"
            >{{ 'emptyField' | localizeFilter }}</span
          >
          <span
            v-else-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            >{{ 'minValue' | localizeFilter }}
            {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'update' | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import { required, minValue } from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localizeFilter';

export default {
  data: () => ({
    select: null,
    title: '',
    limit: 10,
    current: null
  }),

  validations: {
    title: { required },
    limit: { required, minValue: minValue(10) }
  },

  props: {
    categories: {
      type: Array,
      required: true
    }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };

        await this.$store.dispatch('updateCategory', categoryData);
        this.$message(localizeFilter('categoryUpdated'));
        this.$emit('updated', categoryData);
      } catch (error) {
        console.log(error);
      }
    }
  },

  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(cat => cat.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },

  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },

  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>
