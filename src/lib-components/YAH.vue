<template>
	<button class="wf-component wf-yah-logo" :style="{'background-image': yahLogo}" @click="onClicked()" data-translation-element="yah">
		YAH
	</button>
</template>

<script>
/* global wayfinder */
import { mapState } from 'vuex';

export default {
	name: 'YAH',
	
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
	.wf-yah-logo {
		background-repeat: no-repeat;
		text-align: center;
		border: none;
		outline: none;
	}
</style>
