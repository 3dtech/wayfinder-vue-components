<template>
	<div class="languages-container" :class="{'active': active }">
		<div class="languages-container-select">Select language</div>
		<div v-for="(lang, index) in languages" :key='index' @click="changeLanguage(lang)" :class='["language", "lang-" + lang.getName(), { active: lang.getName() == language, display: active}]' :style="{ backgroundImage: 'url('+getFlagImage(lang.flagImage)+')'}">
		</div>
	</div>
</template>

<script>
/* global wayfinder: false, WayfinderAPI */
import { mapState } from 'vuex';

export default {
	name: 'FlagsMenu',
	computed: {
		...mapState(['languages', 'language', 'reset'])
	},
	data () {
		return {
			active: false
		}
	},
	methods: {
		changeLanguage (language) {
			if (this.active) {
				Vue.prototype.$wayfinder.setLanguage(language.name);
			}
			this.active = !this.active;
		},

		getFlagImage (id) {
			return WayfinderAPI.getURL("images", "thumbnail", [id]);		
		}
	},
	watch: {
		reset: function () {
			this.active = false;
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.languages-container.active {
		height: fit-content;
		z-index: 10;
	}

	.languages-container.active .languages-container-select {
		visibility: initial;
		opacity: 1;
	}

	.languages-container .languages-container-select {
		opacity: 0;
		padding-bottom: 0.5rem;
		margin: auto;
		text-align: center;
		transition: opacity 0.2s ease-in;
		overflow: hidden;
		height: 1.5rem;
		font-size: 1rem;
	}

	.languages-container .language {
		width: 63%;
		height: 0rem;
		margin: auto;
		margin-bottom: 0rem;
		background-size: cover;
		background-position: 50%;
		background-repeat: no-repeat;
		transition: height 0.25s ease-in;
	}

	.languages-container .language .active {
		height: 3.5rem;
		margin-bottom: 1rem;
	}
	.languages-container .language .display {
		height: 3.5rem;
		margin-bottom: 1.5rem;
	}
</style>
