<template>
	<div class="az-menu">
		<ul class="list">
			<li class="item list-item" @click="onClick(poiitem)" v-touch:tap="onClick(poiitem)" :class='{"active": currentPOI && poiitem.id == currentPOI.id}' v-for="(poiitem) in sortedPOIs" :key='poiitem.id'>
				<slot :poi="poiitem"><POI :poi="poiitem"/></slot>
			</li>
		</ul>
	</div>
</template>

/**
				<div class="logo" :style="{'background-image': getImage()}" :class="[isImage()]" v-if="getImage()"></div>
				<div class="name" v-if="showName" v-html="poi.getName(language)"></div>
				<div class="floor" v-if="showFloor" v-html="poi.floor.getName(language)"></div>
			</li>
 */

<script>
/* global */
import { mapState } from 'vuex';
import POI from './items/POI.vue';

export default {
	name: 'FilteredMenu',
	components: {
		POI
	},
	computed: {
		...mapState(['filteredPOIs', 'language', 'currentPOI']),
		sortedPOIs () {
			let arr = this.filteredPOIs.slice().filter((poi) => {
				return (poi && poi.getShowInMenu());
			}); // Copy and filter array
			arr = arr.sort((a, b) => {
				if (a.getName(this.language) && b.getName(this.language)) {
					return a.getName(this.language).localeCompare(b.getName(this.language));
				}
				else {
					return 0;
				}
			});
			return arr;
		}
	},
	methods: {
		onClick (poi) {
			return () => {
				this.$emit('clicked', poi);
			};
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
