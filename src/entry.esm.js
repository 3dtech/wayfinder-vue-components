
// Import vue components
import * as components from '@/lib-components/index';
import app from '@/lib-components/app';

// install function executed by Vue.use()
const install = function installWayfinderVueComponents(Vue, store, mapType, project) {
  app.init(store);
  console.log('Wayfinder install', mapType, project)
  Vue.prototype.$wayfinderApp = app;
  Vue.prototype.$WF_MAP_TYPE = mapType;
  Vue.prototype.$WF_PROJECT = project;

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
