<template>
	<div class="wf-component topics-menu">
		<ul class="list">
			<li class="item list-item list-header" v-touch:tap="back()">{{ currentGroupName }}</li>
			<li class="item list-item" v-touch:tap="onClick(poi)" :class='{"active": currentPOI && poi.id == currentPOI.id}' v-for="poi in getPOIs" :key='poi.id' v-if="poi && poi.getShowInMenu()" v-html="poi.getName(language)"></li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'GroupPOIsMenu',
	props: {
		group: {

		}
	},
	mounted () {

	},
	computed: {
		...mapState(['currentGroup', 'currentPOI', 'language']),
		getPOIs() {
			if (this.currentGroup.pois) {
				let arr = this.currentGroup.pois.slice(0);
				return arr.sort((a, b) => {
					return a.getName(this.language).localeCompare(b.getName(this.language));
				});
			}
			else {
				return [];
			}
		},
		currentGroupName () {
			return this.currentGroup ? this.currentGroup.getName(this.language) : '';
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
	.topics-menu {
		overflow: hidden;
		user-select: none;
	}

	.topics-menu ul {
		margin: 0;
		padding: 0;
	}

	.az-menu .list-item {
		list-style: none;
		padding: 0.3rem;
		padding: 1.5rem 2rem 1.5rem 4rem;
		font-size: 120%;
	}
</style>
