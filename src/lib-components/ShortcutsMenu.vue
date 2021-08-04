<template>
	<div class="shortcuts-container">
		<div v-for="(shortcut, index) in sortedShortcuts" :key='index' class="item shortcut" @click="showShortcut(shortcut)" :class='["shortcut-" + shortcut.getID()]' :style="{ backgroundImage: 'url('+getImage(shortcut.imageID)+')'}">
			<label v-if="showLabel">{{shortcut.getName(language)}}</label>
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
	props: {
		showLabel: {
			type: Boolean,
			default: true
		},
	},
	computed: {
		...mapState(['shortcuts', 'language', 'landscape', 'mobile']),
		sortedShortcuts() {
			const sortedShortcuts = this.shortcuts.sort((a,b) => {
				return 1;
			})
			return sortedShortcuts;
		}
	},
	methods: {
		showShortcut (shortcut) {
			var nearest = Vue.prototype.$wayfinder.getNearestPOI(Vue.prototype.$wayfinder.getKiosk(), shortcut.pois);
			if (typeof nearest === 'object' && nearest != null) {
				Vue.prototype.$wayfinder.showPath(nearest.node, nearest);
			}
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
