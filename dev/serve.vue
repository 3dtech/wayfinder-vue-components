<script>
import Vue from 'vue';
import { mapState } from 'vuex';
// Uncomment import and local "components" registration if library is not registered globally.
// import { WayfinderVueComponentsSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  WayfinderVueComponentsSample,
  // }
  computed: {
  ...mapState(['pois']),
  },
  methods: {
    mapDataLoaded () {
      console.log("mapDataLoaded", this.pois)
      this.$store.dispatch('SET_FILTERED_POIS', Object.values(this.pois));
    },
    setGroup (group) {
      this.$store.dispatch('SET_FILTERED_POIS', group.pois);
    }
  }
});
</script>

<template>
  <div id="app">
    <div class="map-container">
      <WFMap @loaded="mapDataLoaded"/>
    </div>
    <div class="menu">
      <WFGroupsMenu @clicked="setGroup"/>
      <WFFilteredMenu/>
    </div>
  </div>
</template>
