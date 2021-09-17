<template>
	<div class="topics-menu">
		<ul class="list">
			<li class="item list-item" v-touch:tap="onClick(topic)" :class='{"active": currentGroup && topic.id == currentGroup.id}' v-for="(topic, index) in sortedGroups" :key='index' v-if="topic && topic.getShowInMenu()" >
				<label class="name" v-html="topic.getName(language)"></label>
				<label class="count" v-if="showPOICount">{{topic.pois.length}}</label>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'GroupsMenu',
	props: {
		showPOICount: {
			type: Boolean,
			default: false
		},
		az: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {

		}
	},
	computed: {
		...mapState(['poiGroups', 'currentGroup', 'language']),
		sortedGroups () {
			let arr = []; // Copy arr for sorting
			for (let i in this.poiGroups) {
				arr.push(this.poiGroups[i]);
			}
			if (this.az) {
				return arr.sort((a, b) => {
					if (a && a.getName(this.language) && b && b.getName(this.language)) {
						return a.getName(this.language).localeCompare(b.getName(this.language), this.language, {sensitivity: 'accent'});
					}
					else {
						return 0;
					}
				});
			}
			else {
				return arr;
			}
		}
	},
	methods: {
		onClick (group) {
			return () => {
				this.$emit('clicked', group);
			};
		},
		reset () {
			this.$store.dispatch('SET_CURRENT_GROUP', false);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.az-menu {
		overflow: hidden;
		user-select: none;
	}

	.az-menu .list-item {
		list-style: none;
	}

	.az-menu ul {
		margin: 0;
		padding: 0;
	}
</style>
