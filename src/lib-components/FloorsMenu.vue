<template>
		<div class="wf-component map-floors-container">
			<div class="map-floors list">
				<div v-for="floor in floors" :key='floor.id' v-if="floor.showInMenu" @click="changeFloor(floor)" class="item list-item" :class='["lang-" + language, "floor-" + floor.index, { active: floor == currentFloor}]'>
					<label class="title">{{floor.getName(language)}}</label>
					<label class="count" v-if="showPOICount">{{floor.pois.length}}</label>
				</div>
			</div>
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
	},
	computed: {
		...mapState(['floors', 'language']),
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
	.map-floors {		
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.map-floors .item {
		border: none;
		text-overflow: ellipsis;
		position: relative;
		text-align: center;
		margin-left: auto;
		overflow: hidden;
	}
</style>
