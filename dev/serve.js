import Vue from 'vue';
import Vuex from 'vuex';


import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import WayfinderVueComponents from '@/entry.esm';
import { loadWayfinder } from '@/entry.esm';
import Vue2TouchEvents from 'vue2-touch-events'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(Vuex);
Vue.use(VueObserveVisibility)
Vue.use(Vue2TouchEvents,
  {
    tapTolerance: 20
  })

Vue.config.productionTip = false;
const WF_MAP_TYPE = "2d";
const WF_API = "dev";
const WF_PROJECT = "33ba7f9724740d846d41315f57bb37e4";


/* global WF_MAP_TYPE WayfinderAPI wayfinder*/
const store = new Vuex.Store({
  state: {
    count: 0,
    appName: "Wayfinder Vue Components",
    currentPOI: false,
		currentTab: 'groups',
    currentGroup: false,
  },
  mutations: {
    showCount(state) {
      console.log(state.count)
    }
  }
})

loadWayfinder(WF_MAP_TYPE, WF_API, loadVue);

function loadVue () {
  new Vue({
    store,
    render: h => h(Dev),
    created () {
      Vue.use(WayfinderVueComponents, this.$store, WF_MAP_TYPE, WF_PROJECT) // Create it by passing in the store you want to use
    }
  }).$mount('#app')
}