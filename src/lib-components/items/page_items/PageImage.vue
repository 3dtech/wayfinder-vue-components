<template>
	<div class="wf-page-item wf-page-image" v-if="item">
        <img :src="src"/>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: "page-image",
	computed: {
		...mapState('wf', ['language']),
		src () {
			return WayfinderAPI.getURL("images", "get", this.item.value[this.language]);
		}
	},
	props: {
		item: {
			type: Object,
			default: null
		}
	}
};
</script>

<style scoped>


</style>
