<template>
	<div class="wf-component topics-menu">
		<h2 v-if="current">{{current.getName("et")}}</h2>
		<ul class="list">
			<li class="item list-item" :class='{"active": current && topic.id == current.id}' v-for="topic in sortedGroups" :key='topic.id' >
				<div class="item-content" v-touch:tap="onClick(topic)">
					<label class="name" v-html="topic.getName(language)"></label>
					<label class="count" v-if="showPOICount">{{topic.pois.length}}</label>
				</div>
				<ul v-if="topic.childGroups.length > 0 && showSubGroups" v-show="current && topic.id == current.id">
					<li v-for="subtopic in subGroups(topic.childGroups)" :key='subtopic.id'>
						<label class="name" v-html="subtopic.getName(language)"></label>
						<label class="count" v-if="showPOICount">{{subtopic.pois.length}}</label>
					</li>
				</ul>
				<ul class="list sublist" v-if="topic.pois.length > 0 && showPOIs" v-show="current && topic.id == current.id">
					<li class="item list-item" v-for="poi in topic.pois" :key='poi.id' v-touch:tap="onPOICLick(poi)">
						<label class="name" v-html="poi.getName(language)"></label>
					</li>
				</ul>
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
		},
		showSubGroups: {
			type: Boolean,
			default: true
		},
		showPOIs: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			current: null
		}
	},
	computed: {
		...mapState(['poiGroups', 'currentGroup', 'language']),
		sortedGroups () {
			let arr = []; // Copy arr for sorting
			let topic;
			for (let i in this.poiGroups) {
				topic = this.poiGroups[i];
				if(topic && topic.getShowInMenu() && topic.getName(this.language)) {
					arr.push(topic);
				}
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
	watch: {
		currentGroup: function () {
			this.current = this.currentGroup;
		}
	},
	methods: {
		onClick (group) {
			return () => {
				if (this.current == group) {
					this.current = null;
				}
				else  {
					this.current = group;
				}
				
				this.$emit('clicked', group);
			};
		},
		onPOICLick (poi) {
			return () => {
				this.$emit('poiClicked', poi);
			};
		},
		reset () {
			this.$store.dispatch('SET_CURRENT_GROUP', null);
		},

		subGroups (subGroups) {
			if (subGroups) {
				let groups = [];
				for(let g in subGroups) {
					if(this.poiGroups[g]) {
						groups.push(this.poiGroups[g]);
					}
				}
				
				return groups;
			}
			else {
				return [];
			}
			 
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
