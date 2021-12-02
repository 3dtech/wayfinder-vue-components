<template>
	<div class="wf-component wf-groups-menu">
		<ul class="wf-list">
			<li class="wf-list-item" :class='{"active": current && topic.id == current.id}' v-for="topic in sortedGroups" :key='topic.id' >
				<div class="wf-item-content" v-touch:tap="onClick(topic)">
					<slot :group="topic">
						<Group :group="topic"/>
					</slot>
				</div>
				<ul v-if="topic.childGroups.length > 0 && showSubGroups" v-show="current && topic.id == current.id">
					<li v-for="subtopic in subGroups(topic.childGroups)" :key='subtopic.id'>
						<slot name="subgroup" :group="subtopic">
							<Group :group="subtopic"/>
						</slot>
					</li>
				</ul>
				<ul class="wf-list wf-sublist" v-if="topic.pois.length > 0 && showPOIs" v-show="current && topic.id == current.id">
					<li class="wf-list-item" v-for="poi in topic.pois" :key='poi.id' v-touch:tap="onPOICLick(poi)">
						<slot name="poi" :poi="poi">
							<POI :poi="poi" :showLogo="showPOILogo" :showName="showPOIName" :showPathButton="showPOIPathButton" :showDescription="showPOIDescription" :showRoomID="showPOIRoomID" :showFloor="showPOIFloor"/>
						</slot>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Group from './items/Group.vue';

export default {
	name: 'GroupsMenu',
	components: {
		Group
	},
	props: {
		parent: {
			type: Number,
			default: -1
		},
		showPOICount: {
			type: Boolean,
			default: false
		},
		az: {
			type: Boolean,
			default: false
		},
		showIcon: {
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
		},
		showPOILogo: {
			type: Boolean,
			default: false
		},
		showPOIName: {
			type: Boolean,
			default: true
		},
		showPOIPathButton: {
			type: Boolean,
			default: false
		},
		showPOIDescription: {
			type: Boolean,
			default: false
		},
		showPOIRoomID: {
			type: Boolean,
			default: false
		},
		showPOIFloor: {
			type: Boolean,
			default: false
		},
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
			let groups = this.poiGroups;

			for (let i in groups) {
				topic = groups[i];
				if(topic && topic.getShowInMenu() && topic.getName(this.language)) {
					if (this.parent > -1 && parseInt(topic.parent_id) !== this.parent) {
						arr.push(topic);
					}
					else if (this.parent === -1 && topic.parent_id === null) {
						arr.push(topic);
					}
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
	.wf-groups-menu .wf-list-item {
		list-style: none;
	}

	.wf-groups-menu .wf-list {
		margin: 0;
		padding: 0;
	}
</style>
