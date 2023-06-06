/* global wayfinder: false, WayfinderAPI */
import Vue from 'vue';

function clone(obj) {
	return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}
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
		portrait: false,
		mobile: false,
		maxInActivity: 30,
		reset: 0,
		pages: {},
		template: {

		}
	},
	getters: {
		xLanguage: (state, context) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.language = Object.freeze(Vue.prototype.$wayfinder.getLanguage());
			}

			return state.language;
		},
		xFloors: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined' && Vue.prototype.$wayfinder.building) {
				let _f;
				state.floors = Object.freeze(Vue.prototype.$wayfinder.building.getSortedFloors().map(f => {
					_f = clone(f);
					_f.pois = _f.pois.slice();
					delete _f.nodes;
					delete _f.node3D;
					return _f;
				}));
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
				let g;
				Object.keys(groups).forEach(key => {
				  if (parseInt(groups[key].showInTopMenu)) {
					g = clone(groups[key]);
					g.pois = g.pois.map(p => Object.freeze(clone(p)));
					Object.defineProperty(g, 'parent', { configurable: false });
					shortcuts.push(Object.freeze(g));
				  }
				});

				shortcuts = shortcuts.sort((a, b) => {
					return -(a.order - b.order);
				});

				state.shortcuts = shortcuts;
			}

			return state.shortcuts;
		},
		xBuilding: (state) => {
			if (Vue.prototype.$wayfinder !== 'undefined') {
				let building = clone(Vue.prototype.$wayfinder.building);
				Object.defineProperty(building, 'floors', { configurable: false });
				Object.defineProperty(building, 'currentFloor', { configurable: false });
				Object.defineProperty(building, 'sortedFloors', { configurable: false });
				state.building = Object.freeze(building);
			}

			return state.building;
		},
		xYahLogo: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.yahLogo = 'url(' + WayfinderAPI.getURL("images", "get", Vue.prototype.$wayfinder.settings.getInt('kiosk.you-are-here-image', 0)) + ')';
			}
		},
		xPOIs: state => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.pois = Object.freeze(Vue.prototype.$wayfinder.poisArray.map(p => {
					let _p = clone(p)
					Object.defineProperty(_p, 'floor', { configurable: false });
					Object.defineProperty(_p, 'groups', { configurable: false });
					Object.defineProperty(_p, 'node', { configurable: false });
					delete _p.object;
					delete _p.meshNode;
					delete _p.submesh;
					delete _p.wayfinder;
					delete _p.engine;
					delete _p.canvasBoard;
					return _p;
				  }));
			}
		},
		xTopics: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				let groups = clone(Vue.prototype.$wayfinder.poiGroups);
				for(let g in groups) {
				  groups[g].pois = groups[g].pois.map(p => Object.freeze(clone(p)));
				  Object.defineProperty(groups[g], 'parent', { configurable: false });
				}
				state.poiGroups =  Object.freeze(groups);
			}
		},
		xBanners: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.banners = Object.assign({}, Vue.prototype.$wayfinder.getFilteredAdvertisements());
			}
		},
		xTemplateSettings: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				const wfSettings = Vue.prototype.$wayfinder.settings;
				let setting;
				function camelize(str) {
					let strs = str.split(".");
					str = strs[strs.length - 1];
					str = str.replaceAll("-", " ");
					return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
						return index === 0 ? word.toLowerCase() : word.toUpperCase();
					}).replace(/\s+/g, '');
				}

				for(let s in wfSettings.data) {
					if(s.indexOf("template.default") === 0) {
						setting = wfSettings.data[s];
						state.template[camelize(s)] = wfSettings.get(s);
					}
				}
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
			state.currentGroup = Object.freeze(group);
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
		SET_PORTRAIT: (state, portrait) => {
			state.portrait = portrait;
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
		SET_PORTRAIT : (context, portrait) => {
			context.commit('SET_PORTRAIT', portrait);
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
			pois = pois.map(p => {
				return Object.freeze(p);
			});
			context.commit('SET_FILTERED_POIS',  pois);
		},
		LOAD_PAGES : (context) => {
			Logistics.getJSON(WayfinderAPI.getURL("pages", "getAll", []), null, function (data){
				if (data && data.data) {
					context.commit('SET_PAGES',  Object.freeze(data.data));
				}
			});		
		},
		SET_TEMPLATE_SETTINGS: (context) => {

		}
	}
};
