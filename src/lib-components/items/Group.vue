<template>
	<div class="wf-group" v-if="group" :class="[hasImage()]">
		<label class="wf-name" v-html="group.getName(language)"></label>
        <label class="wf-poi-count" v-if="showPOICount">{{group.pois.length}}</label>
        <img class="wf-group-icon" v-if="showIcon" :src="group.getIconUrl()"/>
		<span class="wf-description" v-if="showDescription" v-html="group.getDescription(language)"></span>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: "Group",
	computed: {
		...mapState('wf', ['language'])
	},
	props: {
		group: {
			type: Object,
			default: null
		},
		showIcon: {
			type: Boolean,
			default: false
		},
		showPOICount: {
			type: Boolean,
			default: false
		},
		showDescription: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		language () {
			if (this.$wayfinder) {
				this.show_path = this.$wayfinder.translator.get('show_path');
			}
		}
	},
	methods: {
		hasImage () {
			if (this.group.getIconUrl()) return "wf-has-icon";
			else return "wf-icon-none";
		}
	}
};
</script>

<style scoped>

</style>
