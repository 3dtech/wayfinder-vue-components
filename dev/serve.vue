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
    ...mapState('wf', ['pois', 'poiGroups', 'building', 'template', 'currentFloor', 'poiAdvertisements']),
    ...mapState(['appName']),
    group () {
      if (this.poiGroups && Object.values(this.poiGroups).length > 0) {
        return Object.values(this.poiGroups)[0];
      }
      
      return null;
    }
  },
  mounted () {
    console.log('mounted', this.$wayfinderApp)
    this.$wayfinderApp.loadPages();
  },
  methods: {
    mapDataLoaded () {
      this.$store.dispatch('wf/SET_FILTERED_POIS', Object.values(this.pois));
     // this.isit = 'yes';
    },
    setGroup (group, a) {
      console.log('setGroup', group, a)
      this.currentGroup = group;
      this.$store.dispatch('wf/SET_FILTERED_POIS', group.pois);
    },
    bannerClicked () {
      console.log('bannerClicked')
    },
    reset () {
      this.$store.dispatch('wf/RESET');
    },
    log (msg) {
      console.log('log', msg);
    },
    pageMenuClicked (page) {
      console.log('page', page);

      this.pageSlug = page.slug;
      this.currentPage = page;
      if(this.$refs["pages"]) {
        let p = this.$refs["pages"].findBySlug("map");
        console.log("p", p);
      }
    },
    groupPOIClicked (poi) {
      this.$refs.map.showPOIPopup(poi);
    },
    resetScroll() {
      this.$refs.filteredScroll.reset();
    },
    showPOI (poi) {
      console.log('showPOI', poi)
      this.currentTab = 10;
      this.currentPOI = poi;
      this.$refs.map.showPOIPopup(poi);
    },
    debug () {
      console.log('wf', this.$wayfinder)
    }
  },
  data () {
    return {
      isit: "no",
      currentTab: 1,
      currentGroup: null,
      currentPOI: null,
      pageSlug: "slug",
      currentPage: null
    }
  }
});
</script>

<template>
  <WFApp id="app">
    <div class="map-container">
      <WFMap ref="map" @loaded="mapDataLoaded" :project="$WF_PROJECT" :POIPopupEnabled="true" :showPOIPathButton="true"/>
      <div class="map-footer">
        <WFYAH/>
        <WFZoomMenu/>
        <WFFloorsMenu :currentFloor="currentFloor"/>
        <WFFlagsMenu :showFlag="false" :showTitle="true" labelType="native" order="order"/>
      </div>
    </div>
    <div class="content">
      <section class="tab-serve">
        <h2 class="appName" @click="debug">{{appName}} @ <label v-if="building">{{building.name}}</label></h2>
        <div>
          Clock: <WFClock/>
                Date: <WFDate format="ddd. DD. MMM"/>
                Translatable: <WFTranslate k="go_to_floor" :params="['1th floor', '2th floor']">Vale tõlge</WFTranslate>
        </div>
        <div>
          <button @click="currentTab = 1">Browser</button>
          <button @click="currentTab = 2">Filtered</button>
          <button @click="currentTab = 3">GroupsMenu</button>
          <button @click="currentTab = 4">Search</button>
          <button @click="currentTab = 5">Banner</button>
          <button @click="currentTab = 6">AZ</button>
          <button @click="currentTab = 7">Shortcuts</button>
          <button @click="currentTab = 8">GroupPOIs</button>
          <button @click="currentTab = 9">Page</button>
          <button @click="currentTab = 10">POI</button>
          <button @click="currentTab = 11">SubGroupMenu</button>
          <button @click="reset()">Reset</button>
        </div>
          
        <WFTabs :activeTab="currentTab" animate="none">
          <WFTab name="1">
            <WFBrowser src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSppH80saUz9eIllJ_jOLbvC9XN5kJM7mMSFGNzPLXJ1mXr1_2LDIXBCCPOqhAh_hNyMN9RQ6uGekWz/pubhtml"></WFBrowser>
          </WFTab>
          <WFTab name="2">
            <WFScrollableArea ref="filteredScroll">
              <div>
              
                <WFFilteredMenu changed="isit" @clicked="showPOI">
                    <template v-slot:default="slotProps">
                      <WFPOI :poi="slotProps.poi" :showAccessibilityPathButton="true"/>
                      <div class="footer">ROOM ID: {{slotProps.poi.room_id}}</div>
                    </template>
                </WFFilteredMenu>
                <button @click="resetScroll">Reset scroll</button>
              </div>
            </WFScrollableArea>
          </WFTab>
          <WFTab name="3">
            <WFGroupsMenu @clicked="setGroup" :currentGroup="currentGroup" :showDescription="true" :showPOIs="true" :order="true" :showSubGroups="true" @poiClicked="groupPOIClicked">
              <template v-slot:poi><div>POI</div></template>
            </WFGroupsMenu>
          </WFTab>
          <WFTab name="4">
            <WFSearch @clicked="showPOI">
              <template v-slot="slotProps" >
                <strong> {{ slotProps.poi.getName("en") }}</strong>
              </template>
            </WFSearch>
          </WFTab>
          <WFTab name="5">
            <WFBanner template="default" container="screensaver" @clicked="bannerClicked" :playOnBoot="true"></WFBanner>
            <!--WFBanner template="default" container="advertisements" qrURL="https://google.com" :playOnBoot="true"></WFBanner-->
          </WFTab>
          <WFTab name="6">
             <WFAZMenu></WFAZMenu>
          </WFTab>
          <WFTab name="7">
            <WFScrollableArea>
              <div>
                <WFShortcutsMenu></WFShortcutsMenu>
                <WFAlphabet :pois="Object.values(pois)" :group="'12'"></WFAlphabet>
              </div>
            </WFScrollableArea>
          </WFTab>
          <WFTab name="8">
             <WFGroupPOIsMenu :group="group"></WFGroupPOIsMenu>
          </WFTab>
          <WFTab name="9">
            <WFPageMenu @clicked="pageMenuClicked"></WFPageMenu>
            <WFPage ref="pages" :pid="currentPage ? parseInt(currentPage.id) : -1" defaultTab="map">
              <template v-slot:tabs>
                <WFTab name="map">
                  Map
                </WFTab>
                <WFTab name="contacts">
                  Contacts
                </WFTab>
              </template>
            </WFPage>
            <WFPage container="transport" slug="empty"/>
          </WFTab>
          <WFTab name="10">
            <WFPOI :poi="currentPOI" :showLogo="true" :showDescription="true" :showAccessibilityPathButton="true" :showDistance="true" :showPath2Text="false"  :showPathTime="true" :showAds="true" :showPathStepCount="true"></WFPOI>
          </WFTab>
          <WFTab name="11">
            <WFSubGroupMenu :parent="1" :showPOIs="true" :showParentGroup="true"  :showDescription="true"></WFSubGroupMenu>
          </WFTab>
        </WFTabs>
      </section>
    </div>
  </WFApp>
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
    position: relative;
  }

  .map-footer {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
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
    height: 240px;
  }

  .wf-scrollable > div {
      padding-bottom: 3rem;
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
  .sa-scrollbar {
    width: 1em;
    background-color: lightblue;
  }

  .sa-bar {
      width: 1em;
      background-color: antiquewhite;
  }

  .wf-floors-menu {
    position: absolute;
    right: 0;
    bottom: 2rem;
  }

  .wf-yah {
    width: 4rem;
    height: 4rem;
  }

  .wf-qr {
    width: 10rem;
    height: 10rem;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -5rem;
    margin-left: -5rem;
  }

  .wf-poi-image {
    height: 5rem;
    width: 5rem;
    background-size: contain;
  }

  .wf-zoommenu {
    position: absolute;
    right: 0;
    bottom: 8rem;
  }

  .wf-poi-popup {
    box-shadow: 1px 1px 5px rgba(0, 0, 0 , 0.2);
  }

  .wf-poi-popup .wf-poi-popup-content {
    border: 1px solid #ccc
  }
</style>