import Vue from 'vue';
import Dev from './serve.vue';
import store from '../src/lib-components/store.js';
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import WayfinderVueComponents from '@/entry.esm';
Vue.use(WayfinderVueComponents);

Vue.config.productionTip = false;
var wayfinder;
var WF_MAP_TYPE = "3d";

function loadVue () {
  console.log("loadVue")
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

if(location && location.search) {
  var options = unescape(location.search.substring(1));
  if (options.indexOf("mobile=") > -1) {
    WF_MAP_TYPE = "2d";
    loadScript("//static.3dwayfinder.com/js/dist/2d/latest/Wayfinder2D.debug.js", function () {
      loadVue();
    });
  }
  else {
    load3D();
  }
}
else {
  load3D();
}

