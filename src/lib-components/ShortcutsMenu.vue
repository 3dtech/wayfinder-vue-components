<template>
	<div class="shortcuts-container">
		<div v-for="(shortcut, index) in sortedShortcuts" :key='index' class="tab-button shortcut" @click="showShortcut(shortcut)" :class='["shortcut-" + shortcut.getID()]' :style="{ backgroundImage: 'url('+getImage(shortcut.imageID)+')'}">
			{{shortcut.getName(language)}}
		</div>
		<div v-for="i in fakeButtons" :key="i" class="tab-button shortcut">
			{{i}}
		</div>
		<div class="tab-button shortcut qr" @click="toggleQR()">
			<i/><span data-translation-element="scan_qr">Map on your phone</span>
		</div>
	</div>
</template>

<script>
/* global wayfinder: false, WayfinderAPI */
import { mapState } from 'vuex';
import YAH from './YAH.vue'

export default {
	name: 'ShortcutsMenu',
	components: { YAH },
	computed: {
		...mapState(['shortcuts', 'language', 'landscape', 'mobile']),
		fakeButtons () {
			if (!this.mobile) {
				let manualItems = 3;

				return this.shortcuts.length < 6 ? new Array(6 - this.shortcuts.length - manualItems) : [];
			}

			return [];
		},
		sortedShortcuts() {
			const sortedShortcuts = this.shortcuts.sort((a,b) => {
				return 1;
			})
			return sortedShortcuts;
		}
	},
	methods: {
		showShortcut (shortcut) {
			var nearest = wayfinder.getNearestPOI(wayfinder.getKiosk(), shortcut.pois);
			if (typeof nearest === 'object' && nearest != null) {
				wayfinder.showPath(nearest.node, nearest);
			}
		},
		getImage (id) {
			return WayfinderAPI.getURL("images", "thumbnail", [id]);		
		},
		toggleQR () {
			this.$emit('toggleQR');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	@import '../theme/variables';

	.shortcuts-container {
		display: flex;
		flex-wrap: wrap-reverse;
		align-content: stretch;
		justify-content: space-between;
		margin-bottom: 0.1rem;
		flex-direction: row;

		&.map-shortcuts {
			position: absolute;
			left: 0.5rem;
			bottom: 15%;
			top: 15%;
			flex-direction: column;
			justify-content: center;

			.tab-button {
				width: @menus-col-height;
			}
		}
		
		.qr {	
			padding-top: 0;
			font-size: 1.4rem;
			align-items: center;
			justify-content: center;
			display: flex;
			flex-grow: 1;
			width: 100%;

			i {
				width: @menus-col-height;
				height: @menus-col-height;

				background-image: url("../assets/scan.png");
				background-size: auto @menus-col-height * 0.65;
				background-position: 50%;
				background-repeat: no-repeat;

			}
		}
	}
</style>
