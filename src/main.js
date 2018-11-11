/* import css */
import '~/style/reset.css';
import '~/style/globalConfig.css';
import '~/style/override.css';
import '~/style/common.css';

/* import vue */
import Vue from 'vue';
import App from '~/App.vue';
import VueCookie from 'vue-cookie/src/vue-cookie';
Vue.use(VueCookie);
// import 'bootstrap/dist/css/bootstrap.css';

/* vuex & vue-router */
import store from '~/store';
import router from '~/router/router.js';

/* notification */
import notifications from 'vue-notification';
Vue.use (notifications);

/* polyfill */
import ES6Promise from 'es6-promise';
ES6Promise.polyfill()

/* import external module */
import ExternalTb from '../external_modules/external_tb';
Vue.use(ExternalTb);

Vue.config.productionTip = false

/* form 관련 component 전체 적용 */
import * as formComponents from "~/comp/form"
Object.values(formComponents).forEach(component => {
  component.install = function install (vue) {
    vue.component(component.name, component);
  }
  Vue.use(component);
});

new Vue({
  store,
  router,
  teddyBear : TeddyBear,
  render : h => h(App)
}).$mount('#app')
