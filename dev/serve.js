import Vue from 'vue';
import Dev from './serve.vue';
import store from '../src/lib-components/store.js';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import WayfinderVueComponents from '@/entry.esm';
Vue.use(WayfinderVueComponents);

import Vue2TouchEvents from 'vue2-touch-events'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)

Vue.use(Vue2TouchEvents,
  {
    tapTolerance: 20
  })

Vue.config.productionTip = false;
var wayfinder;
var WF_MAP_TYPE = "2d";

function loadVue () {
  console.log("loadVue")
  Vue.prototype.$WF_MAP_TYPE = WF_MAP_TYPE;
  new Vue({
    store,
    render: h => h(Dev)
  }).$mount('#app')
}

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


function load3D () {
  loadScript("//static.3dwayfinder.com/shared/js/minified/frak-stable.min.js", function () {
    loadScript("//static.3dwayfinder.com/js/dist/3d/latest/Wayfinder3D.debug.js", function () {
      loadVue();
    });
  });
}

function load2D () {
  loadScript("//static.3dwayfinder.com/js/dist/2d/latest/Wayfinder2D.debug.js", function () {
    loadVue();
  });
}

if(location && location.search) {
  var options = unescape(location.search.substring(1));
  if (options.indexOf("mobile=") > -1) {
    WF_MAP_TYPE = "2d";
    load2D();
  }
  else {
    load3D();
  }
}
else {
  if (WF_MAP_TYPE == "2d") {
    load2D();
  }
  else {
    load3D();
  }
}

