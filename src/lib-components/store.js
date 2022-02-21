/* global wayfinder: false, WayfinderAPI */
import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		floors: [],
		pois: [],
		poiGroups: [],
		loaded: false,
		language: 'en',
		languages: [],
		shortcuts: [],
		filteredPOIs: [],
		currentFloor: null,
		building: null,
		yahLogo: '',
		banners: null,
		landscape: false,
		mobile: false,
		maxInActivity: 30,
		reset: 0,
		pages: []
	},
	getters: {
		xLanguage: (state, context) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.language = Vue.prototype.$wayfinder.getLanguage();
			}

			return state.language;
		},
		xFloors: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined' && Vue.prototype.$wayfinder.building) {
				state.floors = Object.freeze(Object.assign({}, Vue.prototype.$wayfinder.building.getSortedFloors()));
			}

			return state.floors;
		},
		xLanguages: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.languages = Object.freeze(Object.values(Vue.prototype.$wayfinder.getLanguages()).reverse());
			}

			return state.languages;
		},
		xShortcuts: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				let groups = Vue.prototype.$wayfinder.getPOIGroups();
				let shortcuts = [];
				Object.keys(groups).forEach((key) => {
					if (parseInt(groups[key].showInTopMenu)) {
						shortcuts.push(Object.freeze(groups[key]));
					}
				});

				shortcuts = shortcuts.slice(0, 6);

				shortcuts = shortcuts.sort((a, b) => {
					return -(a.order - b.order);
				});

				state.shortcuts = shortcuts;
			}

			return state.shortcuts;
		},
		xBuilding: (state) => {
			if (Vue.prototype.$wayfinder !== 'undefined') {
				let building = Object.assign({}, Vue.prototype.$wayfinder.building);
				state.building =  Object.freeze(building);
			}

			return state.building;
		},
		xYahLogo: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.yahLogo = 'url(' + WayfinderAPI.getURL("images", "get", Vue.prototype.$wayfinder.settings.getInt('kiosk.you-are-here-image', 0)) + ')';
			}
		},
		xPOIs: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.pois = Object.freeze(Vue.prototype.$wayfinder.poisArray.slice());
			}
		},
		xTopics: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.poiGroups = Object.freeze(Object.assign({}, Vue.prototype.$wayfinder.poiGroups));
			}
		},
		xBanners: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.banners = Object.assign({}, Vue.prototype.$wayfinder.getFilteredAdvertisements());
			}
		}
	},
	mutations: {
		SET_POI: (state, poi) => {
			state.currentPOI = poi;
		},
		SET_TAB: (state, tab) => {
			state.currentTab = tab;
		},
		SET_GROUP: (state, group) => {
			state.currentGroup = group;
		},
		SET_SHOW_SEARCH:  (state, visible) => {
			state.searchVisible = visible;
		},
		SET_NEW_RESET: (state) => {
			state.reset = state.reset + 1;
			state.currentPOI = false;
			state.currentGroup = false;
		},
		SET_LANDSCAPE: (state, landscape) => {
			state.landscape = landscape;
		},
		SET_MOBILE: (state, mobile) => {
			state.mobile = mobile;
		},
		SET_INACTIVITY_TIME: (state, time) => {
			state.maxInActivity = time;
		},
		SET_CURRENT_FLOOR: (state, floor) => {
			state.currentFloor = floor;
		},
		SET_FILTERED_POIS: (state, pois) => {
			state.filteredPOIs = pois;
		},
		SET_PAGES: (state, pages) => {
			state.pages = pages;
		},
		RESET: (state, pois) => {
			state.reset = Date.now();
		}
	},
	actions: {
		SET_CURRENT_POI : (context, poi) => {
			context.commit('SET_POI',  Object.freeze(poi));
		},
		SET_CURRENT_TAB : (context, tab) => {
			context.commit('SET_TAB', tab);
		},
		SET_CURRENT_GROUP : (context, group) => {
			context.commit('SET_GROUP', Object.freeze(group));
		},
		SHOW_SEARCH : (context, visible) => {
			context.commit('SET_SHOW_SEARCH', visible);
		},
		SET_RESET : (context) => {
			context.commit('SET_NEW_RESET');
		},
		SET_LANDSCAPE : (context, landscape) => {
			context.commit('SET_LANDSCAPE', landscape);
		},
		SET_INACTIVITY_TIME :  (context, time) => {
			context.commit('SET_INACTIVITY_TIME', time);
		},
		SET_MOBILE: (context, mobile) => {
			context.commit('SET_MOBILE', mobile);
		},
		SET_CURRENT_FLOOR :  (context, floor) => {
			context.commit('SET_CURRENT_FLOOR',  Object.freeze(floor));
		},
		SET_FILTERED_POIS : (context, pois) => {
			context.commit('SET_FILTERED_POIS',  Object.freeze(pois));
		},
		LOAD_PAGES : (context) => {
			console.log('LOAD_PAGES', Logistics, Vue.prototype.$wayfinder);
			context.commit('SET_PAGES',  Object.freeze(pois));
		},
		RESET (context) {
			context.commit('RESET')
		}
	}
};
