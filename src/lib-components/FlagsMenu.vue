<template>
	<div class="wf-component wf-languages-container" :class="[(active ? 'wf-active': '')]">
		<div class="wf-languages-container-select" v-if="showTitle">Select language</div>
		<div class="wf-list" :class="['wf-list-count-' + count]">
			<div v-for="lang in languages" :key='lang.getName()' @click="changeLanguage(lang)" :class='["item", "language", "lang-" + lang.getName(), { active: lang.getName() == language, display: active}]'>
				<div v-if="showFlag" class="wf-flag" :style="{ backgroundImage: 'url('+getFlagImage(lang.flagImage)+')'}"></div>
				<label v-if="labelType == 'code'">{{lang.getName()}}</label>
				<label v-if="labelType == 'native'">{{lang.getNativeName()}}</label>
			</div>
		</div>
	</div>
</template>

<script>
/* global wayfinder: false, WayfinderAPI */
import { mapState } from 'vuex';

export default {
	name: 'FlagsMenu',
	computed: {
		...mapState('wf', ['languages', 'language', 'reset']),
		count () {
			return this.languages.length;
		}
	},
	props: {
		showTitle: {
			type: Boolean,
			default: true
		},
		showFlag: {
			type: Boolean,
			default: true
		},
		labelType: {
			type: String,
			default: "none"
		},
	},
	data () {
		return {
			active: false,
		}
	},
	methods: {
		changeLanguage (language) {
			this.$wayfinder.setLanguage(language.name);
			this.$emit("changeLanguage", language);
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

	.languages-container .language .flag {
		width: 70%;
		height: 100%;
		background-size: cover;
		background-position: 50%;
		background-repeat: no-repeat;
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
