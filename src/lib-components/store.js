/* global wayfinder: false, WayfinderAPI */
import Vue from 'vue';

function clone(obj) {
	return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}

function freezeGroup(g, skip) {
	g = clone(g);
	Object.defineProperty(g, 'parent', { configurable: false });
	Object.defineProperty(g, 'color', { configurable: false });
	Object.defineProperty(g, 'desciptions', { configurable: false });
	Object.defineProperty(g, 'childGroups', { configurable: false });
	Object.defineProperty(g, 'names', { configurable: false });

	if (skip) {
		delete g.pois;
	}
	else if (g.pois) {
		g.pois = g.pois.map(p => freezePOI(p, true));
	}
	

	return g;
}

function freezeNode(n, skip) {
	n = clone(n);
	delete n.floor;
	delete n.pois;

	if (skip) {
		delete n.neighbours;
	}
	else if (n.neighbours) {
		n.neighbours = n.neighbours.map((n) => freezeNode(n, true));
	}

	Object.defineProperty(n, 'neighbours', { configurable: false });

	return n;
}
var freezeProps = ["floor", "groupNames", "settings", "names", "descriptions", "advertisements", "meshNode", "submesh", "canvasBoard", "poiComponent", "wayfinder", "engine", "open", "attributes"]
function freezePOI(p, skip) {
	p = clone(p);
	for(let f in freezeProps) {
		if(typeof p[freezeProps[f]] !== "undefined") {
			Object.defineProperty(p, freezeProps[f], { configurable: false });
		}
	}

	p.node = freezeNode(p.node);

	if (skip) {
		delete p.groups;
	}
	else if (p.groups) {
		p.groups = p.groups.map((g) => freezeGroup(g, true));
	}
	
	p.wayfinder = undefined;
	p.engine = undefined;
	p.poiComponent = undefined;
	p.object = undefined;
	p.submesh = undefined;
	p.meshNode = undefined;
	p.floor = freezeFloor(p.floor, true);

	return p;
}

function freezeFloor(f, skip) {
	let _f = clone(f);
	
	delete _f.nodes;
	delete _f.node3D;

	Object.defineProperty(_f, 'names', { configurable: false });

	if (skip) {
		delete _f.pois;
	}
	else if(_f.pois){
		_f.pois = _f.pois.map(p => freezePOI(p));
	}

	return _f;
}
export default {
	namespaced: true,
	state: {
		floors: [],
		pois: [],
		poiGroups: [],
		loaded: false,
		language: '',
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
		poiAdvertisements: [],
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
				state.floors = Object.freeze(Vue.prototype.$wayfinder.building.getSortedFloors().map(f => freezeFloor(f)));
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
					g = freezeGroup(groups[key]);
					g.pois = g.pois.map(p => freezePOI(p));
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
				//console.log('building', building)
				building.currentFloor = freezeFloor(building.currentFloor);
				building.description = Object.freeze(building.description);
				building.link = Object.freeze(building.link);
				building.location = Object.freeze(building.location);
				
				let _floors = {};
				Object.keys(building.floors).forEach(function(key, index) { 
					_floors[key] = freezeFloor(building.floors[key]);
				});

				building.floors = _floors;
				building.sortedFloors = Object.freeze(building.sortedFloors.map(f => freezeFloor(f)));
				//console.log('building', clone(building))
				state.building = clone(building);
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
					return freezePOI(p);
				}));
			}
		},
		xTopics: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				let groups = Vue.prototype.$wayfinder.poiGroups;
				let _groups = [];
				let group;
				for(let g in groups) {
					group = freezeGroup(groups[g]);
					group.pois = groups[g].pois.map(p => freezePOI(p));
					_groups.push(group);
				}		
				state.poiGroups = Object.freeze(_groups);
			}
		},
		xBanners: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined') {
				state.banners = Object.assign({}, Object.freeze(Vue.prototype.$wayfinder.getFilteredAdvertisements()));
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
		},
		xPOIAdvertisements: (state) => {
			if (typeof Vue.prototype.$wayfinder !== 'undefined' && Array.isArray(Vue.prototype.$wayfinder.poiAdvertisements)) {
				state.poiAdvertisements = Object.freeze(Vue.prototype.$wayfinder.poiAdvertisements.map(p => {
					return Object.freeze(p);
				}));
			}
		},
		freezePOI: (state) => (p) => {
			return freezePOI(p);
		},
		freezeGroup: (state) => (p) => {
			return freezeGroup(p);
		},
		freezeFloor: (state) => (f) => {
			return freezeFloor(f);
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
		},
		LOADED: (state, val) => {
			state.loaded = val;
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

		},
		LOADED : (context, val) => {
			context.commit('LOADED', val);
		}
	}
};
