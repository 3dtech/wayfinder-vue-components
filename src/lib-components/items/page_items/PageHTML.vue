<template>
	<div class="wf-page-item" v-if="item">
        <div v-html="item.value[language]"></div>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: "page-html",
	computed: {
		...mapState('wf', ['language']),
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
