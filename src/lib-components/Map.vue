<template>
	<div class="wf-component wf-map-container" v-observe-visibility="visibilityChanged">
		<canvas id="map"/>
		<div class="wf-map-path-text" v-show="showPathText">{{pathText}}</div>
	</div>
</template>

<script>
/* global wayfinder: true, Wayfinder3D Wayfinder2D WayfinderAPI WF_MAP_TYPE, location */
import Vue from 'vue';
var wayfinder;

export default {
	name: 'Map',
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
	},
	mounted () {
		this.load();
	},	
	methods: {
		load () {
			//if (typeof Wayfinder2D !== "undefined" || typeof Wayfinder2D !== "undefined")
			//	throw new Error("Wayfinder not loaded");
			// wayfinder = new Wayfinder3D();
			
			
			if (typeof this.$WF_MAP_TYPE !== "undefined" && this.$WF_MAP_TYPE == "2d") {
				wayfinder = new Wayfinder2D();
			}
			else {
				wayfinder = new Wayfinder3D();
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
			WayfinderAPI.LOCATION = this.api;
			wayfinder.options.assetsLocation = this.assets;
			console.log('this.project', this.project);
			if (this.project) {
				wayfinder.options.project = this.project;
			}
			
			wayfinder.open();

			var scope = this;
			var pathTextTime = wayfinder.settings.getInt('path.message.duration', 5) * 1000;
			wayfinder.events.on("data-loaded", function () {
				console.log('data-loaded', scope.loaded, scope.$store);
				if(!scope.loaded) {
					// update getters
					scope.$store.dispatch('wf/SET_CURRENT_FLOOR', wayfinder.getCurrentFloor());
					scope.$store.dispatch('wf/SET_INACTIVITY_TIME', wayfinder.settings.getInt('kiosk.max-inactivity', 30));

					scope.update(wayfinder);
					scope.$store.dispatch('wf/SET_INACTIVITY_TIME', wayfinder.settings.getInt('kiosk.max-inactivity', 30));
					scope.$emit('loaded');	
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
				this.showPathText = true;
			});

			wayfinder.events.on("floor-change", (floor) => {
				// console.log('cbOnFloorChange', floor, wayfinder.settings.getInt('path.message.duration', 1))
				if (floor) {
					this.$store.dispatch('wf/SET_CURRENT_FLOOR', floor);
					this.$emit('onTouch');
				}
				if (this.showPathText) {
					setTimeout(() => {
						this.showPathText = false;
					}, pathTextTime);
				}
			});

			wayfinder.events.on("map-click", (poi) => {
				if (poi) {
					this.$emit('poiClicked', poi, true);
					wayfinder.statistics.onClick(poi.id, "map");
				}
			});

			wayfinder.events.on("map-touch", () => {
				this.$emit('onTouch');
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
			Vue.prototype.$wayfinder.resize();
		},
	},
	data () {
		return {
			loaded: false,
			showPathText: false,
			pathText: ''
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
</style>
