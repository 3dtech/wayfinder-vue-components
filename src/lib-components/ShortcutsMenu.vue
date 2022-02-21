<template>
	<div class="wf-component wf-shortcuts-menu">
		<ul class="wf-list" :class="['wf-list-count-' + count]">
			<li v-for="shortcut in sortedShortcuts" :key='shortcut.getID()' class="wf-list-item wf-shortcut" @click="showShortcut(shortcut)" :class='["wf-shortcut-" + shortcut.getID()]'>
				<img class="wf-icon" v-if="showIcon" :src="getImage(shortcut.imageID)"/>
				<label v-if="showLabel">{{shortcut.getName(language)}}</label>
			</li>
		</ul>
	</div>
</template>

<script>
/* global wayfinder: false, WayfinderAPI */
import { mapState } from 'vuex';
import YAH from './YAH.vue'

export default {
	name: 'ShortcutsMenu',
	components: { YAH },
	props: {
		showLabel: {
			type: Boolean,
			default: true
		},
		showPath: {
			type: Boolean,
			default: true
		},
		showIcon: {
			type: Boolean,
			default: true
		},
		highlight: {
			type: Boolean,
			default: true
		},
		dehighlightOverlay: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		...mapState('wayfinder', ['shortcuts', 'language', 'landscape', 'mobile']),
		sortedShortcuts() {
			const sortedShortcuts = this.shortcuts.sort((a,b) => {
				return 1;
			})
			return sortedShortcuts;
		},
		count () {
			return this.shortcuts.length;
		},
		hasClickedListener(){
			return !!(this.$listeners && this.$listeners.clicked);
		}
	},
	methods: {
		showShortcut (shortcut) {
			if (this.hasClickedListener) {
				this.$emit("clicked", nearest, shortcut);
			}
			else {
				var nearest = this.$wayfinder.getNearestPOI(this.$wayfinder.getKiosk(), shortcut.pois);
				if (this.showPath && typeof nearest === 'object' && nearest != null) {
					this.$wayfinder.showPath(nearest.node, nearest);
				}

				if (this.highlight) {
					this.$wayfinder.clearDisplaying();
					this.$wayfinder.setDisplaying(shortcut.pois);
				}

				if (this.dehighlightOverlay && this.$wayfinder.setDehighlightOverlay) {
					this.$wayfinder.setDehighlightOverlay(true);
				}

				this.$wayfinder.update();
			}
		},
		clear () {
			if (this.dehighlightOverlay && this.$wayfinder.setDehighlightOverlay) {
				this.$wayfinder.setDehighlightOverlay(false);
			}

			if (this.highlight) {
				this.$wayfinder.clearHighlights();
			}

			this.$wayfinder.update();
		},
		getImage (id) {
			return WayfinderAPI.getURL("images", "thumbnail", [id]);		
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.shortcuts-container {
		display: flex;
		flex-wrap: wrap-reverse;
		align-content: stretch;
		justify-content: space-between;
		margin-bottom: 0.1rem;
		flex-direction: row;
	}

	.shortcuts-container.map-shortcuts {
			position: absolute;
			left: 0.5rem;
			bottom: 15%;
			top: 15%;
			flex-direction: column;
			justify-content: center;
	}
</style>
