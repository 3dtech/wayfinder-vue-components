<template>
	<div class="wf-component wf-map-container" ref="container" v-observe-visibility="visibilityChanged" v-touch:start='onTouch'>
		<canvas id="map"/>
		<div class="wf-map-path-text" v-show="(showPathText && pathTextVisible)">{{pathText}}</div>
		<div id="wf-poi-popup" class="wf-poi-popup" ref="poiPopup" v-show="POIPopupEnabled && isPOIPopupVisible()">
			<div class="wf-poi-popup-content" v-if="popupPOI">
				<slot name="poi" :poi="popupPOI">
					<POI :poi="popupPOI" :showLogo="showPOILogo" :showName="showPOIName" :showPathButton="showPOIPathButton" :showDescription="showPOIDescription" :showRoomID="showPOIRoomID" :showFloor="showPOIFloor"/>
				</slot>
			</div>
			<div class="wf-pin-down" v-if="popupPOI"></div>
		</div>
	</div>
</template>

<script>
/* global wayfinder: true, Wayfinder3D Wayfinder2D WayfinderAPI WF_MAP_TYPE, location */
import Vue from 'vue';
import { mapState } from 'vuex';

import POI from './items/POI.vue';

var wayfinder;

export default {
	name: 'Map',
	components: {
		POI,
	},
	props: {
		project: {type: String},
		api: {
			type: String,
			default: "//api.3dwayfinder.com/"
		},
		assets: {
			type: String,
			default: "//static.3dwayfinder.com/shared/"
		},	
		showPathText: {
			type: Boolean,
			default: true
		},	
		POIPopupEnabled: {
			type: Boolean,
			default: false
		},
		showPOIPopupPathButton: {
			type: Boolean,
			default: true
		},
		showPOIPopupInfoButton: {
			type: Boolean,
			default: true
		},
		showPOILogo: {
			type: Boolean,
			default: false
		},
		showPOIName: {
			type: Boolean,
			default: true
		},
		showPOIPathButton: {
			type: Boolean,
			default: false
		},
		showPOIDescription: {
			type: Boolean,
			default: false
		},
		showPOIRoomID: {
			type: Boolean,
			default: false
		},
		showPOIFloor: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		...mapState('wf', ['language']),
	},
	mounted () {
		this.load();
	},
	methods: {
		load () {		
			var _project = this.project;
			var _api = this.$WF_ENV;
			var options = decodeURI(location.search.substring(1));
			console.log('options', options)
			//override from url
			if (options.indexOf("mobile=") > -1) {
				this.$WF_MAP_TYPE = "2d";
			}
			
			if (options.indexOf("project=") > -1) {
				var params = new URLSearchParams(location.search);
				_project = params.get("project");
			}

			if (options.indexOf("api=") > -1) {
				var params = new URLSearchParams(location.search);
				_api = params.get("api");
			}

			console.log('wf.load', this.$WF_MAP_TYPE, _project)

			if (typeof this.$WF_MAP_TYPE !== "undefined" && this.$WF_MAP_TYPE == "2d") {
				wayfinder = new Wayfinder2D();
			}
			else {
				wayfinder = new Wayfinder3D();
			}

			let api = WayfinderAPI.LOCATION;
			let live_api = WayfinderAPI.LIVE_LOCATION;
			let assets = this.assets ? this.assets : "//static.3dwayfinder.com/shared/";
			console.log('_api', _api, this.$WF_ENV);
			switch (_api) {
				case "live":
					api = WayfinderAPI.LOCATION;
				break;
				case "snapshot":
					api = "../../../api/";
					assets = "../../../shared/";
				break;
				case "cdn":
					api = WayfinderAPI.CDN_LOCATION;
					assets = "https://wayfinder-cdn.com/shared/";
				break;
				case "enterprise":
					api = "../../../api/";
					assets = "../../../shared/";
					var loc = window.location;
					live_api = loc.host + "/";
				break;
				case "custom":
					api = this.$WF_API;
					live_api = api; //TODO should be /monitor/
				break;
			}
			// WayfinderAPI.LOCATION = 'http://localhost:8080/api/';
			Vue.prototype.$wayfinder = wayfinder;
			Vue.directive('wf-translate', {
				bind: function (el, binding, vnode) {
					if (wayfinder) {
						var key = typeof binding.value == "string" ? binding.value : binding.expression;
						el.setAttribute("data-translation-element", key);
						wayfinder.translator.translateElement(key, el);
					} 
				}
			});
			console.log('API', api, "env", this.$WF_ENV, "live", live_api);
			WayfinderAPI.LOCATION = api;
			WayfinderAPI.LIVE_LOCATION = live_api;
			wayfinder.options.assetsLocation = assets;

			if (this.project) {
				wayfinder.options.project = _project;
			}
			
			wayfinder.open(_project);

			var scope = this;
			var pathTextTime = wayfinder.settings.getInt('path.message.duration', 5) * 1000;
			wayfinder.events.on("data-loaded", function () {
				if(!scope.loaded) {
					// update getters
					console.log('scope.$store', scope.$store)
					scope.$store.dispatch('wf/SET_CURRENT_FLOOR', scope.$store.getters["wf/freezeFloor"](wayfinder.getCurrentFloor()) || null);
					scope.$store.dispatch('wf/SET_INACTIVITY_TIME', wayfinder.settings.getInt('kiosk.max-inactivity', 30));

					scope.update(wayfinder);
					scope.$store.dispatch('wf/SET_INACTIVITY_TIME', wayfinder.settings.getInt('kiosk.max-inactivity', 30));
					scope.$emit('loaded');
					scope.$store.dispatch('wf/LOADED', true);
				}
			});

			wayfinder.events.on("map-ready", function () {
				wayfinder.resize();
			});

			wayfinder.events.on('language-change', () => {
				this.update(wayfinder);
			});

			wayfinder.events.on("floor-change-before", (currentFloor, nextFloor, destinationFloor) => {
				this.pathText = wayfinder.translator.get("go_to_floor", [currentFloor.getName(wayfinder.getLanguage()), destinationFloor.getName(wayfinder.getLanguage()), nextFloor.getName(wayfinder.getLanguage())])
				this.pathTextVisible = true;
			});

			wayfinder.events.on("map-update", () => {
				if (this.POIPopupEnabled && this.poiPopupVisible && this.popupPOI) {
					this.showPOIPopup(this.popupPOI);
				}	
			});


			wayfinder.events.on("floor-change", (floor) => {
				// console.log('cbOnFloorChange', floor, wayfinder.settings.getInt('path.message.duration', 1))
				if (floor) {
					this.$store.dispatch('wf/SET_CURRENT_FLOOR', this.$store.getters["wf/freezeFloor"](floor));
					this.$emit('onTouch');
				}
				if (this.pathTextVisible) {
					setTimeout(() => {
						this.pathTextVisible = false;
					}, pathTextTime);
				}

				if (this.poiPopupVisible && this.popupPOI &&  this.popupPOI.floor && this.popupPOI.floor.id == floor.id) {
					this.showPOIPopup(this.popupPOI);
				}
				else {
					this.poiPopupVisible = false;
				}
			});

			wayfinder.events.on("map-click", (poi) => {
				if (poi) {
					poi = this.$store.getters["wf/freezePOI"](poi);
					this.$emit('poiClicked', poi, true);
					wayfinder.statistics.onClick(poi.id, "map");
				}
			});

			wayfinder.events.on("map-touch", () => {
				this.poiPopupVisible = false;
				this.$emit('onTouch');
			});

			wayfinder.events.on("path-start", () => {
				this.poiPopupVisible = false;
			});

			wayfinder.events.on("path-finished", () => {		
				if (this.POIPopupEnabled && this.popupPOI) {
					this.showPOIPopup(this.popupPOI);
				}
			});

			window.addEventListener('resize', () => {
				if (wayfinder) {
					wayfinder.resize();
				}
			});
		},
		update () {
			for(var i in this.$store._wrappedGetters) {
				if (i.indexOf("wf") === 0) {
					this.$store._wrappedGetters[i](this.$store.state);
				}
			}
			Vue.prototype.$wayfinder.update();
			Vue.prototype.$wayfinder.resize();
			Vue.prototype.$wayfinder.translator.translate();
		},
		reset () {
			wayfinder.restoreDefaultState();
		},
		start () {
			wayfinder.run();
			wayfinder.statistics.onSessionStart();
		},
		pause () {
			wayfinder.pause();
			wayfinder.statistics.onSessionEnd();
		},
		run () {
			wayfinder.run();
		},
		visibilityChanged (visible) {
			if (Vue.prototype.$wayfinder) {
				Vue.prototype.$wayfinder.resize();
			}
		},
		onTouch () {
			this.$wayfinder.run();
		},
		showPath (poi) {
			this.poiPopupVisible = false;
			this.$emit('showInfo', poi);
		},
		showInfo (poi) {
			this.poiPopupVisible = false;
			this.$emit('showInfo', poi);
		},
		showPOIPopup (poi, _width, _height) {
			this.popupPOI = Object.freeze(poi);
			if (this.POIPopupEnabled && this.popupPOI && this.$refs.poiPopup && poi.getNode()) {
				let width = _width || 155;
				let height = _height || 100;
				let position = this.$wayfinder.getScreenPosition(poi);	
				
				if (!position) {
		          this.poiPopupVisible = false;
		          console.log('popup no position')
		          return;
		        } 

				let offset =  (this.$wayfinder.settings.getFloat("poi.2d.icon-size", 24, poi) - 24) / 2;
				this.$refs.poiPopup.style.left = position[0] + "px";

				let mapWidth = this.$refs.container ? this.$refs.container.clientWidth : 320;

				this.$nextTick(() => {
					this.$nextTick(() => {
						this.$refs.poiPopup.style.top = position[1] - offset + "px";
						this.$refs.poiPopup.style.marginTop = -this.$refs.poiPopup.clientHeight + "px";
						this.$refs.poiPopup.style.marginLeft = -(this.$refs.poiPopup.clientWidth / 2) + "px";
						this.$refs.poiPopup.classList.remove("wf-pin-up");
						this.$refs.poiPopup.classList.remove("wf-pin-left");
						this.$refs.poiPopup.classList.remove("wf-pin-right");


						if(position[1] < height) {
							this.$refs.poiPopup.style.marginTop = (- offset * 2) + "px";
							this.$refs.poiPopup.classList.add("wf-pin-up");
						}

						if(position[0] < width / 2) {
							this.$refs.poiPopup.style.marginLeft = -position[0] + "px";
							this.$refs.poiPopup.classList.add("wf-pin-left");
						}

						if(position[0] > mapWidth - (width / 2)) {
							this.$refs.poiPopup.style.marginLeft = -width + "px";
							this.$refs.poiPopup.classList.add("wf-pin-right");
						}
					});
				});
				
				this.poiPopupVisible = true;
			}
		},
		clearPopup () {
			this.popupPOI = null;
			this.poiPopupVisible = false;
		},
		hidePOIPopup () {
			this.poiPopupVisible = false;
		},
		isPOIPopupVisible () {
			return (this.$wayfinder && this.popupPOI && this.poiPopupVisible && this.popupPOI.getNode().floor == this.$wayfinder.getCurrentFloor())
		},
	},
	data () {
		return {
			loaded: false,
			pathTextVisible: false,
			pathText: '',
			poiPopupVisible: false,
			popupPOI: null
		}
	}

};
</script>

<style scoped>
	.wf-map-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.wf-map-container canvas {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.wf-map-container .wf-map-path-text {
		width: 30ch;
		text-align: center;
		background-color: white;
		position: absolute;
		bottom: 25%;
		margin: auto;
		left: 50%;
		margin-left: -15ch;
		padding: 0.5em;
	}

	#wf-poi-popup {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 15.5rem;
        height: auto;
        background-color: #fff;
        text-align: center;
        transform-origin: bottom;
        animation-duration: 0.5s;
        animation-iteration-count: 2;
        cursor: pointer;
	}
    .wf-poi-popup-content {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		height: 100%;
	}

	.wf-poi-popup-content > label {
		flex-grow: 1;
		font-size: 1.6rem;
		margin-top: 0.6rem;
		text-align: center;
		line-height: 1.2;
		font-weight: 600;
		margin-bottom: 1.6rem;
	}
        
    .wf-pin-down {
		background-color: white ;
		width: 1rem;
		height: 1rem;
		position: absolute;
		bottom: -0.5rem;
		border-radius: 1rem 0 0 0;
		transform: rotate(45deg);
		left: 50%;
		margin-left: -0.75rem;
	}

	.wf-pin-left .wf-pin-down {
		left: 1rem;
	}

	.wf-pin-right .wf-pin-down {
		right: 1rem;
		left: auto;
	}

    
    .wf-pin-up .wf-poi-popup-content {
		margin-bottom: 0;
	}

    .wf-pin-up .wf-pin-down {
		top: -0.5rem;
		bottom: auto;
		transform: rotate(-45deg);
    }
</style>
