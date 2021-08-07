<template>
		<div class="map-floors-container">
			<div class="map-floors">
				<div v-for="(floor, index) in floors" :key='index' v-if="floor.showInMenu" @click="changeFloor(floor)" class="item" :class='["lang-" + language, "floor-" + floor.index, { active: floor == currentFloor}]'>
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
		}
	},
	computed: {
		...mapState(['floors', 'language', 'currentFloor']),
	},
	methods: {
		changeFloor (floor) {
			this.$emit("floorChange", floor);
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
