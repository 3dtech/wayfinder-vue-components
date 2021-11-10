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
    setGroup (group, a) {
      console.log('setGroup', group, a)
      this.$store.dispatch('SET_FILTERED_POIS', group.pois);
    }
  },
  data () {
    return {
      isit: "no",
      currentTab: 1
    }
  }
});
</script>

<template>
  <div id="app">
    <div class="map-container">
      <WFMap @loaded="mapDataLoaded" project="961ecd72a20137844d5e2a24a2ffbd76"/>
    </div>
    <div class="content">
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
      </div>
      <div class="tab-serve">
        <div>
          <button @click="currentTab = 1">1</button>
          <button @click="currentTab = 2">2</button>
          <button @click="currentTab = 3">3</button>
        </div>
        <WFTabs :activeTab="currentTab">
          <WFTab name="1">
            Sisustus, Kodu, Ehitus 1
          </WFTab>
          <WFTab name="2">
            Elektroonika, Tehnika, Side 2
          </WFTab>
          <WFTab name="3">
            Teenused 3
          </WFTab>
        </WFTabs>
      </div>
      <WFBanner template="default" container="screensaver" :playOnBoot="true"></WFBanner>
    </div>
  </div>
</template>

<style scoped>
  .content {
    display: flex;
    flex-direction: row;
    
  }
  .scrollable {
    width: 320px !important;
    height: 240px !important;
  }
  .banner-set {
    width: 480px !important;
    height: 320px !important;
  }

  .tab-serve {
     width: 160px;
     display: flex;
     flex-direction: column;
  }

  .tab-serve .tab {
    background-color: #999;
  }

  .tab-serve .tab:nth-child(2) {
    background-color: teal;
  }

  .tab-serve .tab:nth-child(3) {
    background-color: tomato;
  }
</style>
