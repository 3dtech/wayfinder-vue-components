<template>
	<div class="wf-component wf-groups-menu">
		<ul class="wf-list" :class="['wf-list-count-' + count]">
			<slot name="prepend"/>
			<li class="wf-list-item wf-list-header" v-if="showParentGroup" :v-touch:tap="back()">{{ currentGroupName }}</li>
			<li class="wf-list-item" :class='{"active": current && topic.id == current.id}' v-for="topic in sortedGroups" :key='topic.id' >
				<div class="wf-item-content" v-touch:tap="onClick(topic)">
					<slot :group="topic">
						<Group :group="topic" :showIcon="showIcon" :showPOICount="showPOICount"/>
					</slot>
				</div>
				<ul v-show="current && topic.id == current.id && subGroups(topic.childGroups).length > 0" v-if="showSubGroups">
					<SubGroupMenu :parent="parseInt(topic.id)" :showPOICount="showPOICount" :az="az" :order="order" :showIcon="showIcon" :showPOIs="showPOIs" :sortPOIs="sortPOIs" @clicked="onSubGroupClick" @poiClicked="onSubPOICLick"/>
				</ul>
				<ul class="wf-list wf-sublist" v-if="topic.pois.length > 0 && showPOIs" v-show="current && topic.id == current.id">
					<li class="wf-list-item" v-for="poi in sortedPOIs(topic.pois)" :key='poi.id' v-touch:tap="onPOICLick(poi)">
						<slot name="poi" :poi="poi">
							<POI :poi="poi" :showLogo="showPOILogo" :showName="showPOIName" :showPathButton="showPOIPathButton" :showDescription="showPOIDescription" :showRoomID="showPOIRoomID" :showFloor="showPOIFloor"/>
						</slot>
					</li>
				</ul>
			</li>
			<slot name="append"/>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import Group from './items/Group.vue';
import POI from './items/POI.vue';

import SubGroupMenu from './SubGroupMenu.vue';

export default {
	name: 'GroupsMenu',
	components: {
		Group,
		POI,
		SubGroupMenu
	},
	props: {
		currentGroup: {
			type: Object,
			default: null
		},
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
		order: {
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
		openGroup: {
			type: Boolean,
			default: true
		},
		sortPOIs: {
			type: Boolean,
			default: true
		},
		showParentGroup: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		currentGroup () {
			this.current = this.currentGroup;
		}
	},
	data () {
		return {
			count: 0,
			current: null,
			parentGroup: null
		}
	},
	computed: {
		...mapState('wf', ['poiGroups', 'language']),
		sortedGroups () {
			let arr = []; // Copy arr for sorting
			let topic;
			let groups = this.poiGroups;

			for (let i in groups) {
				topic = groups[i];
				if(topic.id == this.parent) {
					this.parentGroup = topic;
				}
				if(topic && topic.getShowInMenu() && topic.getName(this.language)) {
					if (this.parent > -1 && parseInt(topic.parent_id) == this.parent) {
						arr.push(topic);
					}
					else if (this.parent === -1 && (topic.parent_id === null || topic.parent_id == 0)) {
						arr.push(topic);
					}
				}
			}
			if (this.az) {
				arr = arr.sort((a, b) => {
					if (a && a.getName(this.language) && b && b.getName(this.language)) {
						return a.getName(this.language).localeCompare(b.getName(this.language), this.language, {sensitivity: 'accent'});
					}
					else {
						return 0;
					}
				});
			}
			else if (this.order) {
				arr = arr.sort((a, b) => {
					if (a && b) {
						return a.order - b.order;
					}
					return 0;
				});
			}
			
			this.count = arr.length;
			return arr;
		},
		currentGroupName () {
			return this.parentGroup ? this.parentGroup.getName(this.language) : '';
		}
	},
	methods: {
		onClick (group) {
			return () => {
				if (this.current == group) {
					this.current = null;
					return;
				}
				else {
					this.current = Object.freeze(group);
				}
				//emit only if this is a leaf
				if(!(this.current && this.showSubGroups && group.childGroups && group.childGroups.length > 0)){
					this.$emit('clicked', group);
				}  
			};
		},
		onPOICLick (poi) {
			return () => {
				this.$emit('poiClicked', poi);
			};
		},
		onSubGroupClick (group) {
			this.$emit('subGroupClicked', group);
		},
		onSubPOICLick (poi) {
			this.$emit('poiClicked', poi);
		},
		reset () {
			this.current = null;
		},
		back () {
			return () => {
				this.$emit('back');
			};
		},
		subGroups (subGroups) {
			if (subGroups) {
				let groups = [];
				let _g;
				for(let g in subGroups) {
					_g = parseInt(subGroups[g]);
					if(this.poiGroups[_g] && this.poiGroups[_g].getShowInMenu()) {
						groups.push(this.poiGroups[_g]);
					}
				}
				
				return groups;
			}
			else {
				return [];
			} 
		},
		sortedPOIs (pois) {
			let arr = pois.slice().filter((poi) => {
				return (poi && poi.getShowInMenu());
			}); // Copy and filter array

			if (!this.sortPOIs) return arr;

			arr = arr.sort((a, b) => {
				if (a.getName(this.language) && b.getName(this.language)) {
					return a.getName(this.language).localeCompare(b.getName(this.language));
				}
				else {
					return 0;
				}
			});
			return arr;
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
