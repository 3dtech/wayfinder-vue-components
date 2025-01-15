<template>
	<div class="wf-page-content" v-if="page">
		<component v-for="(item, index) in page.items" :key="item.id" :class="['wf-page-item-' + index ]" :is="itemType(item)" :item="item"></component> 
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';
import PageHTML from './page_items/PageHTML.vue';
import PageURL from './page_items/PageUrl.vue';
import PageIMAGE from './page_items/PageImage.vue';

export default {
	name: "Page",
	components: {
		PageHTML,
		PageURL,
		PageIMAGE,
	},
	computed: {
		...mapState('wf', ['language']),
		isSingle () {
			if (this.page && ['collection', 'tab'].indexOf(this.page.type) > -1) return false;

			return true;
		}
	},
	props: {
		page: {
			type: Object,
			default: null
		},
	},
	mounted () {},
	watch: {
		page () {},
	},
	methods: {
		itemType (item) {
			if (item && item.type) {
				return "Page"+item.type.toUpperCase();
			}

			return "";
		},
	}
};
</script>

<style scoped>

</style>
