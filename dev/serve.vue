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
     // this.isit = 'yes';
    },
    setGroup (group) {
      this.$store.dispatch('SET_FILTERED_POIS', group.pois);
    }
  },
  data () {
    return {
      isit: "no"
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
      <WFScrollableArea>
        <WFFilteredMenu changed="isit">
            <template v-slot:default="slotProps">
              <WFPOI :poi="slotProps.poi" />
              <div class="footer">ROOM ID: {{slotProps.poi.room_id}}</div>
            </template>
        </WFFilteredMenu>
      </WFScrollableArea>
      {{isit}}
    </div>
  </div>
</template>

<style scoped>
  .scrollable {
    width: 320px !important;
    height: 240px !important;

    
  } 
</style>
