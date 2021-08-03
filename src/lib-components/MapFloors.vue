<template>
		<div class="map-floors-container">
			<div class="map-floors">
				<div v-for="(floor, index) in floors" :key='index' v-if="floor.showInMenu" @click="changeFloor(floor)" class="button button-floor" :class='["lang-" + language, "floor-" + floor.index, { active: floor == currentFloor, undeground: undeground(floor)}]'>
					{{floor.getName(language)}}
				</div>
			</div>
		</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: 'MapFloors',
	data () {
		return {
		}
	},
	computed: {
		...mapState(['floors', 'language', 'currentFloor']),
	},
	methods: {
		changeFloor (floor) {
			Vue.prototype.$wayfinder.showFloor(floor);
		},

		undeground (floor) {
			return floor.index < 0;
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.map-floors {		
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.map-floors .button-floor {
		border: none;
		text-overflow: ellipsis;
		position: relative;
		text-align: center;
		margin-left: auto;
		overflow: hidden;
	}
</style>
