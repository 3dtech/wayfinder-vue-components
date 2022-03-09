import Vue from 'vue';
import Vuex from 'vuex';


import Dev from './serve.vue';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import WayfinderVueComponents from '@/entry.esm';

import Vue2TouchEvents from 'vue2-touch-events'
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(Vuex);
Vue.use(VueObserveVisibility)
Vue.use(Vue2TouchEvents,
  {
    tapTolerance: 20
  })

Vue.config.productionTip = false;
var wayfinder;
const WF_MAP_TYPE = "2d";
const host = "//static.3dwayfinder.com";
//const host = "../../../"

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

function loadScript(url, callback) {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  
  var x = document.getElementsByTagName('head')[0];
  x.appendChild(s);
  if (typeof callback == "function") {
    s.onload = callback;
    s.src = url;
  }
}

function loadVue () {
  console.log("loadVue")
  Vue.prototype.$WF_MAP_TYPE = WF_MAP_TYPE;
  new Vue({
    store,
    render: h => h(Dev),
    created () {
      Vue.use(WayfinderVueComponents, this.$store) // Create it by passing in the store you want to use
    }
  }).$mount('#app')
}

function load3D () {
  loadScript(host + "/shared/js/minified/frak-stable.min.js", function () {
    loadScript(host + "/js/dist/3d/latest/Wayfinder3D.debug.js", function () {
      loadVue();
    });
  });
}

function load2D () {
	loadScript(host + "/js/dist/2d/latest/Wayfinder2D.debug.js", function () {
  	loadVue();
	});
}

if(location && location.search) {
	var options = decodeURI(location.search.substring(1));
	if (options.indexOf("mobile=") > -1) {
		Vue.prototype.$WF_MAP_TYPE = "2d";
		load2D();
	} else if (WF_MAP_TYPE == "2d") {
		load2D();
	}
  else {
    load3D();
  }
} else {
  console.log('WF_MAP_TYPE', WF_MAP_TYPE);
	if (typeof WF_MAP_TYPE == "undefined" ||  WF_MAP_TYPE == "3d") {
		load3D();
	} else {
		load2D();
	}
}