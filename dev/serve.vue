<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { WayfinderVueComponentsSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  WayfinderVueComponentsSample,
  // }
});
</script>

<template>
  <div id="app">
    <div class="map-container">
      <WFMap/>
    </div>
    <div class="menu">
      <WFAZMenu/>
    </div>
  </div>
</template>
