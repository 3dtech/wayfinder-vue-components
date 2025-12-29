<template>
		<div class="wf-component wf-floors-menu">
			<ul class="wf-list" v-show="!(hideWhenSingleFloor && floors.length <= 1)" :class="['wf-list-count-' + count]">
				<li v-for="floor in filteredFloors" :key='floor.id' @click="changeFloor(floor)" class="wf-list-item" :class='["wf-lang-" + language, "wf-floor-" + floor.index, { "wf-active": currentFloor && floor.id == currentFloor.id}]'>
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
	data () {
		return {
			count: 0
		}
	},
	computed: {
		...mapState('wf', ['floors', 'language']),
		filteredFloors () {
			let arr = []; // Copy arr for sorting
			let floor;
			let floors = this.floors;
			
			for (let i in floors) {
				floor = floors[i];
				if(floor && floor.showInMenu && floor.getName(this.language)) {
					arr.push(floor);
				}
			}
			this.count = arr.length;
			return arr;
		},
		hasClickedListener(){
			return !!(this.$listeners && this.$listeners.clicked);
		}
	},
	methods: {
		changeFloor (floor) {
			if (this.hasClickedListener) {
				this.$emit("clicked", floor);
			}
			else {
				this.$wayfinder.showFloor(floor);
			}
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-floors-menu .wf-list-item {
		text-overflow: ellipsis;
		list-style: none;
	}
</style>
