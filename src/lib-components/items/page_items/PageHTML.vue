<template>
	<div class="wf-page-item wf-page-html" v-if="item">
        <div v-html="value" :class="item.classes"></div>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';
function parse(input) {
	var value = input;
	value = value.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
	value = value.replaceAll("&nbsp;", " ");
	value = value.replaceAll("&amp;", "&");

	return value;
}
export default {
	name: "page-html",
	computed: {
		...mapState('wf', ['language']),
		value () {
			if (this.item && this.item.value && this.item.value[this.language]) {
				return parse(this.item.value[this.language]);
			}

			return "";
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
