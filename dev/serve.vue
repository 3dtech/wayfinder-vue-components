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
    },
    reset () {
      this.$store.dispatch('RESET');
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
      <WFMap @loaded="mapDataLoaded" project="7a40a4f1ba5e61e8da7ae4749ef4d7c7"/>
    </div>
    <div class="content">
      <section class="tab-serve">
        <div>
          <button @click="currentTab = 1">1</button>
          <button @click="currentTab = 2">2</button>
          <button @click="currentTab = 3">3</button>
          <button @click="currentTab = 4">4</button>
        </div>
        <WFTabs :activeTab="currentTab" animate="none">
          <WFTab name="1">
            <WFBrowser src="https://tahvel.edu.ee/#/schoolBoard/36"></WFBrowser>
          </WFTab>
          <WFTab name="2">
            <WFScrollableArea>
              <WFFilteredMenu changed="isit">
                  <template v-slot:default="slotProps">
                    <WFPOI :poi="slotProps.poi" />
                    <div class="footer">ROOM ID: {{slotProps.poi.room_id}}</div>
                  </template>
              </WFFilteredMenu>
            </WFScrollableArea>
          </WFTab>
          <WFTab name="3">
            <WFGroupsMenu @clicked="setGroup" :parent="2" :showPOIs="true" :order="true">
              <template v-slot:poi><div>POI</div></template>
            </WFGroupsMenu>
          </WFTab>
          <WFTab name="4">
            <WFSearch>
            </WFSearch>
          </WFTab>
          
        </WFTabs>
      </section>
      <section>
        
      </section>
      <section>
        <WFBanner template="default" container="screensaver" :playOnBoot="true"></WFBanner>
      </section>
      <button @click="reset()">Reset</button>
    </div>
  </div>
</template>

<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #app {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .map-container {
    width: 50%;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 50%;
  }

  .content section {
    width: 100%;
    min-height: 5rem;
  }
  .wf-scrollable {
    width: 100%;
    height: 100%;
  }
  .banner-set {
    width: 480px !important;
    height: 320px !important;
  }

  .tab-serve {
     width: 160px;
     display: flex;
     flex-direction: column;
     min-height: 32rem;
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