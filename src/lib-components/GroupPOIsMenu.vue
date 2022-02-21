<template>
	<div class="wf-component wf-group-pois-menu">
		<ul class="wf-list" :class="['wf-list-count-' + count]">
			<li class="wf-list-item wf-list-header" v-touch:tap="back()">{{ currentGroupName }}</li>
			<li class="wf-list-item" v-touch:tap="onClick(poi)" :class='{"wf-active": currentPOI && poi.id == currentPOI.id}' v-for="poi in getPOIs" :key='poi.id' v-html="poi.getName(language)"></li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'GroupPOIsMenu',
	props: {
		group: {
			type: Object,
			default: null
		},
		currentPOI: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			count: 0
		}
	},
	computed: {
		...mapState('wayfinder', ['language']),
		getPOIs() {
			if (this.group && this.group.pois) {
				let arr = this.group.pois.slice(0);
				arr = arr.filter(p => p.getShowInMenu());
				this.count = arr.length;
				return arr.sort((a, b) => {
					return a.getName(this.language).localeCompare(b.getName(this.language));
				});
			}
			else {
				this.count = 0;
				return [];
			}
		},
		currentGroupName () {
			return this.group ? this.group.getName(this.language) : '';
		}
	},
	methods: {
		onClick (poi) {
			return () => {
				this.$emit('clicked', poi);
			};
		},
		back () {
			return () => {
				this.$emit('back');
			};
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-group-pois-menu {
		overflow: hidden;
		user-select: none;
	}

	.wf-group-pois-menu .wf-list {
		margin: 0;
		padding: 0;
	}

	.wf-group-pois-menu .list-item {
		list-style: none;
		padding: 1em;
	}
</style>
