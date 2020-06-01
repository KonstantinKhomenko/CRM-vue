<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'create' | localizeFilter }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
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

        <button class="btn waves-light" type="submit">
          {{ 'create' | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';
import M from 'materialize-css';
import localizeFilter from '@/filters/localizeFilter';

export default {
  data: () => ({
    title: '',
    limit: 10
  }),

  validations: {
    title: { required },
    limit: { required, minValue: minValue(10) }
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        });

        this.title = '';
        this.limit = 100;
        this.$v.$reset();
        this.$message(localizeFilter('categoryCreated'));

        this.$emit('created', category);
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    M.updateTextFields();
  }
};
</script>
