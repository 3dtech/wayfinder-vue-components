<template>
		<div class="wf-component wf-map-floors-menu" :class="{'wf-single-floor': hideWhenSingleFloor && floors.length === 0}">
			<ul class="wf-list" v-show="!(hideWhenSingleFloor && floors.length === 0)">
				<li v-for="floor in filteredFloors" :key='floor.id' @click="changeFloor(floor)" class="wf-list-item" :class='["wf-lang-" + language, "wf-floor-" + floor.index, { active: floor == currentFloor}]'>
					<label class="wf-title">{{floor.getName(language)}}</label>
					<label class="wf-count" v-if="showPOICount">{{floor.pois.length}}</label>
				</li>
			</ul>
		</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: 'MapFloors',
	props: {
		showPOICount: {
			type: Boolean,
			default: false
		},
		currentFloor: {
			type: Object,
			default: null
		},
		hideWhenSingleFloor: {
			type: Boolean,
			default: true
		},
	},
	computed: {
		...mapState(['floors', 'language']),
		filteredFloors () {
			let arr = []; // Copy arr for sorting
			let floor;
			let floors = this.floors;

			for (let i in floors) {
				floor = floors[i];
				if(floor && floor.getShowInMenu() && floor.getName(this.language)) {
					arr.push(floor);
				}
			}
			
			return arr;
		}
	},
	methods: {
		changeFloor (floor) {
			this.$emit("clicked", floor);
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-map-floors-menu .wf-list {		
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.wf-map-floors-menu .wf-list .wf-list-item {
		text-overflow: ellipsis;
		position: relative;
		text-align: center;
		margin-left: auto;
		overflow: hidden;
	}
</style>
