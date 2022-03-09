
// Import vue components
import * as components from '@/lib-components/index';
import app from '@/lib-components/app';

// install function executed by Vue.use()
const install = function installWayfinderVueComponents(Vue, store) {
  app.init(store);
  Vue.prototype.$wayfinderApp = app;

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';
