<template>
	<button class="yah-logo" :style="{'background-image': yahLogo}" @click="onClicked()" data-translation-element="yah">
		YAH
	</button>
</template>

<script>
/* global wayfinder */
import { mapState } from 'vuex';

export default {
	name: 'BuildingLogo',
	
	computed: {//yahLogo
		...mapState(['yahLogo', 'language'])
	},
	methods: {
		onClicked () {
			this.$wayfinder.showKiosk();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.yah-logo {
		background-repeat: no-repeat;
		font-weight: 600;
		text-align: center;
		margin-right: 0.5rem;
		text-transform: uppercase;
		border: none;
		outline: none;
	}
</style>
