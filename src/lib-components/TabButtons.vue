<template>
	<div class="wf-component tab-buttons">
		<div class="item tab-map" :class="{active: (currentTab == 'map')}" v-show="mobile && !landscape" data-translation-element="map" @click="switchTab('map')"></div>
		<div class="item tab-topics" :class="{active: (currentTab == 'groups' || currentTab == 'group-pois')}" data-translation-element="topics" @click="switchTab('groups')"></div>
		<div class="item tab-az" :class="{active: currentTab == 'az'}" data-translation-element="az" @click="switchTab('az')"></div>
		<div class="item tab-search" :class="{active: currentTab == 'search'}" data-translation-element="search" @click="switchTab('search')"></div>
	</div>
</template>

<script>
/* global WayfinderAPI wayfinder */
import { mapState } from 'vuex';

export default {
	name: 'Tabs',
	computed: {
		...mapState(['currentTab', 'searchVisible', 'mobile', 'landscape', 'shortcuts', 'language'])
	},
	data () {
		return {
			toilet: false,
			toiletsIcon: false
		}
	},
	methods: {
		switchTab (tab) {
			this.$emit('switchTab', tab);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tab-buttons {
		display: flex;
		align-content: stretch;
		justify-content: space-between;
	}

	.tab-buttons .item {
			background-size: auto 30%;
			background-repeat: no-repeat;
	}
</style>
