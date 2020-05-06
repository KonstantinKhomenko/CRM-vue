import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import dateFilter from "./filters/dateFilter";
import messagePlugin from "./utils/messagePlugin";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);

Vue.filter("dateFilter", dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyD0z8d_ZutzcaDeeBO2ogIFGeGSgiHgGqY",
  authDomain: "project-crm-vue.firebaseapp.com",
  databaseURL: "https://project-crm-vue.firebaseio.com",
  projectId: "project-crm-vue",
  storageBucket: "project-crm-vue.appspot.com",
  messagingSenderId: "605528666247",
  appId: "1:605528666247:web:3c051c67ad4f8e887a8822",
  measurementId: "G-DB85N94DFT",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
