<template>
	<div class="wf-component wf-az-menu">
		<ul class="wf-list" :class="['wf-list-count-' + count]">
			<li class="wf-list-item" v-touch:tap="onClick(poiitem)" :class='{"wf-active": currentPOI && poiitem.id == currentPOI.id}' v-for="poiitem in sortedPOIs" :key='poiitem.id'>
				<slot :poi="poiitem">
					<POI :poi="poiitem" :showLogo="showLogo" :showName="showName" :showPathButton="showPathButton" :showDescription="showDescription" :showRoomID="showRoomID" :showFloor="showFloor"/>
				</slot>
			</li>
		</ul>
	</div>
</template>

<script>
/* global */
import { mapState } from 'vuex';
import POI from './items/POI.vue';

export default {
	name: 'AZMenu',
	components: {
		POI
	},
	props: {
		showLogo: {
			type: Boolean,
			default: false
		},
		showName: {
			type: Boolean,
			default: true
		},
		showPathButton: {
			type: Boolean,
			default: false
		},
		showDescription: {
			type: Boolean,
			default: false
		},
		showRoomID: {
			type: Boolean,
			default: false
		},
		showFloor: {
			type: Boolean,
			default: false
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
		...mapState('wf', ['pois', 'language']),
		sortedPOIs () {
			let arr = this.pois.slice().filter((poi) => {
				return (poi && poi.getShowInMenu());
			}); // Copy and filter array
			arr = arr.sort((a, b) => {
				if (a.getName(this.language) && b.getName(this.language)) {
					return a.getName(this.language).localeCompare(b.getName(this.language));
				}
				else {
					return 0;
				}
			});

			this.count = arr.length;
			return arr;
		}
	},
	methods: {
		onClick (poi) {
			return () => {
				this.$emit('clicked', poi);
				this.$wayfinder.statistics.onClick(poi.id, "menu");
			};
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-list-item {
		list-style: none;
	}
</style>
