<template>
	<div class="wf-component wf-languages-menu" :class="{'wf-active': active }">
		<ul class="wf-list" :class="['wf-list-count-' + count, (active ? 'wf-active': '')]">
			<li v-for="lang in sortedLanguages" class="wf-list-item wf-language" :key='lang.getName()' @click="changeLanguage(lang)" v-show="!(hideActive && lang.getName() == language)" :class='["wf-lang-" + lang.getName(), { "wf-active": lang.getName() == language, "wf-display": active}]'>
				<div v-if="showFlag" class="wf-lang-flag" :style="{ backgroundImage: 'url('+getFlagImage(lang.flagImage)+')'}"></div>
				<label v-if="labelType == 'code'">{{lang.getName()}}</label>
				<label v-if="labelType == 'native'">{{lang.getNativeName()}}</label>
			</li>
		</ul>
	</div>
</template>

<script>
/* global wayfinder: false, WayfinderAPI */
import { mapState } from 'vuex';

export default {
	name: 'LanguagesMenu',
	computed: {
		...mapState('wf', ['languages', 'language', 'reset']),
		count () {
			return this.languages.length;
		},
		sortedLanguages () {
			if(this.languages && this.order == "order") {
				return this.languages.slice().sort((a, b) => {
					return a.order - b.order;
				})
			}

			return this.languages;
		}
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
		},
		order: {
			type: String,
			default: "id"
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
				this.$emit("change", Object.freeze(language));
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
