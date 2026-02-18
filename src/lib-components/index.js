/* eslint-disable import/prefer-default-export */

const urls = {
  assets: {
    live: "https://wayfinder-cdn.com/shared/",
    cdn: "https://wayfinder-cdn.com/shared/",
    dev: "//static.3dwayfinder.com/shared/",
    enterprise: "../../../shared/",
    snapshot: "../../../shared/"
  },
  js: {
    live: "https://wayfinder-cdn.com/",
    cdn: "https://wayfinder-cdn.com/",
    dev: "//static.3dwayfinder.com",
    enterprise: "../../../",
    snapshot: "../../../",
    local: "./"
  }
}

function getURL(_env, type) {
  return urls[type][_env];
}

/* global WF_MAP_TYPE WayfinderAPI wayfinder*/

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

function load3D (env, version, callback) {
  loadScript(getURL(env, "js") + `/js/dist/3d/${version}/frak2.debug.js`, function () {
    loadScript(getURL(env, "js") + `/js/dist/3d/${version}/Wayfinder3D.debug.js`, function () {
      callback();
    });
  });
}
  
function load2D (env, version, callback) {
    loadScript(getURL(env, "js") + `/js/dist/2d/${version}/Wayfinder2D.debug.js`, function () {
        callback();
    });
}

function loadWayfinder (type, env, version, callback) {
    if (typeof version == "function") {
        callback = version;
        version = "dev";
    }

    if(location && location.search) {
        var options = decodeURI(location.search.substring(1));
        if (options.indexOf("mobile=") > -1) {
          load2D(env, version, callback);
        } else if (type == "2d") {
          load2D(env, callback);
        }
        else {
          load3D(env, version, callback);
        }
    } else {
        if (typeof type == "undefined" ||  type == "2d") {
          load2D(env, version, callback);
        }
        else {
          load3D(env, version, callback);
        }
    }
}

export { default as WFApp } from './App.vue';
export { default as WFMap } from './Map.vue';
export { default as WFAZMenu } from './AZMenu.vue';
export { default as WFFlagsMenu } from './FlagsMenu.vue';
export { default as WFLanguagesMenu } from './LanguagesMenu.vue';
export { default as WFGroupsMenu } from './GroupsMenu.vue';
export { default as WFSubGroupMenu } from './SubGroupMenu.vue';
export { default as WFGroupPOIsMenu } from './GroupPOIsMenu.vue';
export { default as WFBuildingLogo } from './BuildingLogo.vue';
export { default as WFShortcutsMenu } from './ShortcutsMenu.vue';
export { default as WFZoomMenu } from './ZoomMenu.vue';
export { default as WFFloorsMenu } from './FloorsMenu.vue';
export { default as WFFilteredMenu } from './FilteredMenu.vue';
export { default as WFPOIAdvertisements } from './POIAdvertisements.vue';

export { default as WFSearch } from './Search.vue';

export { default as WFLoading } from './Loading.vue';
export { default as WFClock } from './Clock.vue';
export { default as WFDate } from './Date.vue';

export { default as WFTabs } from './Tabs.vue';
export { default as WFTab } from './Tab.vue';
export { default as WFTabButtons } from './TabButtons.vue';
export { default as WFScrollableArea } from './ScrollableArea.vue';
export { default as WFBanner } from './Banner.vue';
export { default as WFPageMenu } from './PageMenu.vue';
export { default as WFAlphabet } from './Alphabet.vue';

export { default as WFPOI } from './items/POI.vue';
export { default as WFPOIAdvertisement } from './items/POIAdvertisement.vue';
export { default as WFGroup } from './items/Group.vue';
export { default as WFPage } from './items/Page.vue';
export { default as WFPageContent } from './items/PageContent.vue';
export { default as WFTranslate } from './items/Translate.vue';
export { default as WFYAH } from './YAH.vue';
export { default as WFIcon } from './items/Icon.vue';

export { default as WFBrowser } from './pages/Browser.vue';
export { default as WFPath2Text } from './Path2Text.vue';

export { loadWayfinder };