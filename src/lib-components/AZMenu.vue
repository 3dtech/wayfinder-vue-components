<template>
	<div class="az-menu">
		<ul class="list">
			<li class="item list-item" @click="onClick(poiitem)" v-touch:tap="onClick(poiitem)" :class='{"active": currentPOI && poiitem.id == currentPOI.id}' v-for="poiitem in sortedPOIs" :key='poiitem.id'>
				<slot :poi="poiitem"><POI :poi="poiitem" :showLogo="showLogo" :showName="showName" :showPathButton="showPathButton" :showDescription="showDescription" :showRoomID="showRoomID" :showFloor="showFloor"/></slot>
			</li>
		</ul>
	</div>
</template>

<script>
/* global */
import { mapState } from 'vuex';

export default {
	name: 'AZMenu',
	mounted () {

	},
	data () {
		return {
			height: '100rem',
		}
	},
	computed: {
		...mapState(['pois', 'language', 'currentPOI']),
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
			return arr;
		}
	},
	updated () {
		var _height = 0;
		var _poi;
		for(var f in this.floors) {
			_height += 2.5;
			for (var p in this.floors[f].pois) {
				_poi = this.floors[f].pois[p];
				if (_poi && _poi.showInMenu) {
					_height += 2;
				}
			}
		}

		this.height = _height + 'rem';
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

</style>
