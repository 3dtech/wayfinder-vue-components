<template>
	<div class="wf-component wf-building-logo" v-bind:style="{'background-image': getLogo()}">
	</div>
</template>

<script>
/* global WayfinderAPI */
import { mapState } from 'vuex';

export default {
	name: 'BuildingLogo',
	
	computed: {
		...mapState(['building'])
	},
	methods: {
		getLogo () {
			if (this.building && this.building.logoID) {
				return 'url(' + WayfinderAPI.getURL("images", "get", this.building.logoID) + ')'
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-building-logo {
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 50%;
	}
</style>
