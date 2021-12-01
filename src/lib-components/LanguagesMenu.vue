<template>
	<div class="wf-component wf-languages-menu" :class="{'wf-active': active }">
		<div class="wf-languages-title" v-if="showTitle">{{title}}</div>
		<div class="wf-list">
			<div v-for="(lang, index) in languages" :key='index' @click="changeLanguage(lang)" v-show="!(hideActive && lang.getName() == language)" :class='["wf-item", "wf-language", "wf-lang-" + lang.getName(), { "wf-active": lang.getName() == language, "wf-display": active}]'>
				<div v-if="showFlag" class="wf-lang-flag" :style="{ backgroundImage: 'url('+getFlagImage(lang.flagImage)+')'}"></div>
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
	name: 'LanguagesMenu',
	computed: {
		...mapState(['languages', 'language', 'reset'])
	},
	props: {
		showTitle: {
			type: Boolean,
			default: false
		},
		showFlag: {
			type: Boolean,
			default: true
		},
		labelType: {
			type: String,
			default: "none"
		},
		hideActive: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: "Select language"
		}
	},
	data () {
		return {
			active: false
		}
	},
	methods: {
		changeLanguage (language) {
			if (this.$listeners && this.$listeners.changeLanguage) {
				this.$emit("change", language);
			}
			else {
				this.$wayfinder.setLanguage(language.name);
			}
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
	.wf-languages-menu.active {
		height: fit-content;
		z-index: 10;
	}

	.wf-languages-menu.active .wf-languages-title {
		visibility: initial;
		opacity: 1;
	}

	.wf-languages-menu .wf-languages-title  {
		opacity: 0;
		padding-bottom: 0.5rem;
		margin: auto;
		text-align: center;
		transition: opacity 0.2s ease-in;
		overflow: hidden;
	}

	.wf-languages-menu .wf-language .wf-lang-flag {
		width: 70%;
		height: 100%;
		background-size: cover;
		background-position: 50%;
		background-repeat: no-repeat;
	}

	.wf-languages-menu .wf-language .wf-active {
		height: 3.5rem;
		margin-bottom: 1rem;
	}
	.wf-languages-menu .wf-language .wf-display {
		height: 3.5rem;
		margin-bottom: 1.5rem;
	}
</style>
