<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <div class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <div>
        <router-link to="/categories">Добавить новую категорию</router-link>
      </div>
    </div>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{
            cat.title
          }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{
            invalid:
              ($v.amount.$dirty && !$v.amount.required) ||
              ($v.amount.$dirty && !$v.amount.minValue),
          }"
        />
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.required"
          class="helper-text invalid"
          >Поле не должно быть пустым</span
        >
        <span
          v-else-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
          >Минимальное значение {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
          >Описание не должно быть пустым</span
        >
      </div>

      <button class="btn waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from "materialize-css";
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "Record",

  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: "outcome",
    amount: 1,
    description: "",
  }),

  validations: {
    description: { required },
    amount: { required, minValue: minValue(1) },
  },

  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (!this.canCreateRecord) {
        this.$message(
          `Недостаточно средств на счете! Нехватает: [ ${this.amount -
            this.info.bill} ] `
        );
        return;
      }

      try {
        await this.$store.dispatch("createRecord", {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
        });

        const bill =
          this.type === "income"
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;

        await this.$store.dispatch("updateInfo", { bill });
        this.$message("Запись успешно добавлена");
        this.$v.$reset();
        this.amount = 1;
        this.description = "";
      } catch (error) {
        this.$message(error);
      }
    },
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },

  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>
