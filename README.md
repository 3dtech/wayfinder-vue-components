# wayfinder-vue-components
VueJS UI components for 3dwayfinder floor plan SDK.
Uses Vuex to make the SDK data bindable.
[Read more](https://3dwayfinder.com).

# Installation
Include 3dwayfinder SDK into your HTML head.
### Install with npm

    npm install @3dwayfinder/wayfinder-vue-components

### Add into main.js

    import Vuex from 'vuex'
    import WayfinderVueComponents from '@3dwayfinder/wayfinder-vue-components';

### Create a store or use a existing one. 3DWayfinder creates namespaced ('wf') store itself.

    const store = new Vuex.Store({
        state: {
            appName: "Wayfinder Vue Components",
            currentPOI: null,
        },
        mutations: {
            setPOI (state, poi) {
            state.currentPOI = poi;
            },
        },
        actions: {
                setPOI : (context, poi) => {
                    context.commit('setPOI',  Object.freeze(poi));
                },
        }
    })
### Set which map type is used

    const WF_MAP_TYPE = "2d"; // "3d"

### Load wayfinder and the vuex store. Notice that wayfinder is passed a little differently than usual. This is because of wayfinder needs Vuex as a dependcy.

    Vue.prototype.$WF_MAP_TYPE = WF_MAP_TYPE;
    new Vue({
        store,
        render: h => h(App),
        created () {
            Vue.use(WayfinderVueComponents, this.$store) // Create it by passing in the store you want to use
        }
    }).$mount('#app')

# Usage
You need to change the project argument from **demo** to your **project ID** (a long hash found in the admin area in Projects page)

    <script>
        import { WFMap } from '@3dwayfinder/wayfinder-vue-components'

        export default {
            name: 'app',
            components: {
                WFMap,
            },
            methods: {
                mapLoaded () {
                    console.log('mapLoaded')
                },
		        onMapPOIClick (poi) {
                    console.log('onMapPOIClick', poi)
                }
            }
        }
    </script>

    <template>
	    <div id="app">
		    <div class="map-area-container">
                <WFMap project="demo" @poiClicked="onMapPOIClick" @loaded="mapLoaded" ref="map"/>
            </div>
        </div>
    </template>

# Components

- WFMap - The map itself
- WFFloorsMenu - list of floors
- WFTabs - a tab component
- WFTab - a tab
- WFGroupsMenu - list of groups
- WFAZMenu - alphabetically ordered list of locations
- WFScrollableArea - touch and mouse friendly scrollable area
- WFPOI - info about a single location
- WFBanner - advertisement banner
- WFBuildingLogo - project logo
- WFYAH - You are here button
- WFGroupPOIsMenu - List of locations under given group
- WFFlagsMenu - language selection menu with flag icons
- WFLanguagesMenu - language selection menu
- WFShortcutsMenu - list of shortcuts (wc, atm etc)
- WFZoomMenu - Zoom in and out
- WFFilteredMenu - show a given array of locations
- WFSearch - search component with builtin keyboard
- WFAlphabet - list of used first letters
- WFPageMenu - list of content pages
- WFPage - show content of a page
- WFBrowser - show a iframe with given URL