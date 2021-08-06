<template>
	<div class="az-menu">
		<ul class="list">
			<li class="item list-item" @click="onClick(poi)" v-touch:tap="onClick(poi)" :class='{"active": currentPOI && poi.id == currentPOI.id}' v-for="(poi, index) in sortedPOIs" :key='index' v-if="poi && poi.getShowInMenu()">
				<div class="logo" :style="{'background-image': getImage()}" :class="[isImage()]" v-if="getImage()"></div>
				<div class="name" v-if="showName" v-html="poi.getName(language)"></div>
				<div class="floor" v-if="showFloor" v-html="poi.floor.getName(language)"></div>
			</li>
		</ul>
	</div>
</template>

<script>
/* global */
import { mapState } from 'vuex';

export default {
	name: 'FilteredMenu',
	props: {
		showFloor: {
			type: Boolean,
			default: false
		},
		showLogo: {
			type: Boolean,
			default: false
		},
		showName: {
			type: Boolean,
			default: true
		}
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
		getImage () {
			console.log()
			if (this.currentPOI && this.currentPOI.getIconUrl()) {
				return 'url("' + this.currentPOI.getIconUrl() + '")';
			}
			else {
				return false;
			}
		},
		isImage () {
			if(this.currentPOI && this.currentPOI.getBackgroundUrl()) return "image-background";
			else if (this.currentPOI && this.currentPOI.getIconUrl()) return "image-logo";
			else return "image-none";
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
