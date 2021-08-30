<template>
	<div class="map-container">
		<canvas id="map"/>
		<div class="map-path-text" v-show="showPathText">{{pathText}}</div>
		<!--div class="map-shadow"></div-->
	</div>
</template>

<script>
/* global wayfinder: true, Wayfinder3D Wayfinder2D WayfinderAPI WF_MAP_TYPE, location */
import { mapActions, mapState } from 'vuex';
import Vue from 'vue';
var wayfinder;

export default {
	name: 'Map',
	props: {
		project: String
	},
	computed: {
		...mapState(['currentFloor']),
	},

	mounted () {
		this.load();
	},	
	methods: {
		...mapActions(['updateData', 'setWayfinder']),
		load () {
			console.log('load2', typeof Wayfinder2D, typeof Wayfinder2D)
			//if (typeof Wayfinder2D !== "undefined" || typeof Wayfinder2D !== "undefined")
			//	throw new Error("Wayfinder not loaded");
			// wayfinder = new Wayfinder3D();
			
			
			if (typeof WF_MAP_TYPE !== "undefined" && WF_MAP_TYPE == "2d") {
				wayfinder = new Wayfinder2D();
			}
			else {
				wayfinder = new Wayfinder3D();
			}
			// WayfinderAPI.LOCATION = 'http://localhost:8080/api/';
			Vue.prototype.$wayfinder = wayfinder; 
			wayfinder.options.assetsLocation = "//static.3dwayfinder.com/shared/";
			wayfinder.options.project = this.project || "demo";
			wayfinder.open();

			var scope = this;
			var pathTextTime = wayfinder.settings.getInt('path.message.duration', 5) * 1000;
			wayfinder.events.on("data-loaded", function () {
				console.log('data-loaded', scope.loaded);
				if(!scope.loaded) {
					// update getters
					scope.$store.dispatch('SET_CURRENT_FLOOR', wayfinder.getCurrentFloor());
					scope.$store.dispatch('SET_INACTIVITY_TIME', wayfinder.settings.getInt('kiosk.max-inactivity', 30));

					scope.update(wayfinder);
					scope.$store.dispatch('SET_INACTIVITY_TIME', wayfinder.settings.getInt('kiosk.max-inactivity', 30));
					scope.$emit('loaded');
				}
			});

			wayfinder.events.on('language-change', () => {
				this.update(wayfinder);
			});

			wayfinder.cbOnBeforeFloorChange = (currentFloor, nextFloor, destinationFloor) => {
				this.pathText = wayfinder.translator.get("go_to_floor", [currentFloor.getName(wayfinder.getLanguage()), destinationFloor.getName(wayfinder.getLanguage()), nextFloor.getName(wayfinder.getLanguage())])
				this.showPathText = true;
			};

			wayfinder.events.on("floor-change", (floor) => {
				// console.log('cbOnFloorChange', floor, wayfinder.settings.getInt('path.message.duration', 1))
				if (floor) {
					this.$store.dispatch('SET_CURRENT_FLOOR', floor);
					this.$emit('onTouch');
				}
				if (this.showPathText) {
					setTimeout(() => {
						this.showPathText = false;
					}, pathTextTime);
				}
			};

			wayfinder.events.on("map-click", (poi) => {
				if (poi) {
					this.$emit('poiClicked', poi, true);
					wayfinder.statistics.onClick(poi.id, "map");
				}
			};

			wayfinder.events.on("map-touch", () => {
				this.$emit('onTouch');
			};

			window.addEventListener('resize', () => {
				if (wayfinder) {
					wayfinder.resize();
				}
			});
		},
		update () {
			for(var i in this.$store._wrappedGetters) {
				this.$store._wrappedGetters[i](this.$store.state);
			}
			Vue.prototype.$wayfinder.update();
			Vue.prototype.$wayfinder.resize();
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
		}
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
	.map-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.map-container canvas {
		width: 100%;
		height: 100%;
	}

	.map-container .map-path-text {
		margin-top: 50%;
		width: 20rem;
		text-align: center;
		background-color: white;
		position: absolute;
		bottom: 15%;
		margin: auto;
		left: 50%;
		margin-left: -10rem;
		padding: 0.5rem;
		font-size: 2rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.map-container .map-shadow {
		position: absolute;
		bottom: -1px;
		width: 100%;
		height: 9rem;
	}

	.currentFloor {
		color: white;
		font-size: 9rem;
		position: absolute;
		font-weight: 800;
		text-shadow: 0.1rem 0.1rem 0.3rem #666;
		text-align: center;
		width: 8rem;
		top: 0rem;
		right: 1rem;
	}
	
</style>
