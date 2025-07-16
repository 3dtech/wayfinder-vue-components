<template>
	<div class="wf-component wf-group-pois-menu">
		<ul class="wf-list" :class="['wf-list-count-' + count]">
			<li class="wf-list-item wf-list-header" v-touch:tap="back()">{{ currentGroupName }}</li>
			<li class="wf-list-item" v-touch:tap="onClick(poi)" :class='{"wf-active": currentPOI && poi.id == currentPOI.id}' v-for="poi in getPOIs" :key='poi.id'>
				<slot :poi="poi">
					<POI :poi="poi" :showLogo="showPOILogo" :showName="showPOIName" :showPathButton="showPOIPathButton" :showDescription="showPOIDescription" :showRoomID="showPOIRoomID" :showFloor="showPOIFloor"/>
				</slot>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import POI from './items/POI.vue';
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
		},
		az: {
			type: Boolean,
			default: false
		},
		order: {
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
		sortPOIs: {
			type: Boolean,
			default: true
		},
		showDescription: {
			type: Boolean,
			default: false
		}
	},
	components: {
		POI
	},
	data () {
		return {
			count: 0
		}
	},
	computed: {
		...mapState('wf', ['language']),
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
