<template>
	<div class="wf-page-item wf-page-url" v-if="item">
		<iframe v-if="item.value" :src="item.value[language]" nwdisable nwfaketop></iframe>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: "page-url",
	computed: {
		...mapState('wf', ['language', 'reset']),
	},
	props: {
		item: {
			type: Object,
			default: null
		},
		resetPage: {
			type: Boolean,
			default: false
		},
	},
	watch: {
		reset: function(newVal) {
            if (this.resetPage) {
                this.currentSRC = this.src + "?t=" + Date.now();
            }
		}
	},
};
</script>

<style scoped>
	.wf-page-url, .wf-page-url iframe, .wf-page-url webview {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
