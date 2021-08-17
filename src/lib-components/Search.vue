<template>
	<div class="search" :class='{"search-visible": searchVisible}'>
		<div class="tab-button close" v-if="showCloseButton" @click="close($event)" data-translation-element="close">Close</div>
		<div class="search-container">
			<div class="results">
				<ul class="list">
					<li class="list-item" @click="onClick(poi)" :class='{"active": poi.id == currentPOI}' v-for="(poi, index) in results" :key='index' v-if="poi && poi.getShowInMenu()" v-html="poi.getName(language)"></li>
				</ul>
			</div>
			<div class="search-input-container" v-if="showOutputField">
				<input id="search-input" ref='searchInput'/>
			</div>
			<div id="keyboard-container" class="keyboard" v-if="showKeyboard">
			</div>
		</div>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';
import OSK from 'on-screen-js-keyboard';

export default {
	name: 'Search',
	components: {
		OSK
	},
	computed: {
		...mapState(['language', 'searchVisible', 'reset', 'mobile'])
	},
	props: {
		showCloseButton: {
			type: Boolean,
			default: false
		},
		showOutputField: {
			type: Boolean,
			default: true
		},
		showKeyboard: {
			type: Boolean,
			default: true
		}
	},
	data () {
		return {
			results: [],
			poi: {},
			currentPOI: false,
			keyboard: false
		}
	},
	mounted () {
		this.keyboard = new OSK('search-input', 'keyboard-container');
		this.keyboard.on('change', (keyword) => {
			this.results = Object.freeze(Object.assign({}, wayfinder.search.search(keyword)));
			if (keyword.length > 1) {
				if (this.results.length > 0) {
					wayfinder.statistics.onSearch(keyword, "successful");
				}
				else {
					wayfinder.statistics.onSearch(keyword, "unsuccessful");
				}
			}
		});
		this.keyboard.addLayout('en', {
			"name": "English",
			"keyboard":"US International",
			"local_name": "English",
			"lang": "en",
			"keys": {
				"default": [
					["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", {"key": "Delete", "action": ["backspace"], "cls": "key2x"}],
					["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
					["a", "s", "d", "f", "g", "h", "j", "k", "l"],
					["z", "x", "c", "v", "b", "n", "m"],
					[{"key": " ", "cls": "key_spacebar"}]
				]
			}
		});

		this.keyboard.changeLayout(this.language);
	},
	watch: {
		searchVisible (current) {
			if (current) {
				this.$refs.searchInput.focus();
			}
		},
		reset () {
			this.resetValues();
		},
		language (lang) {
			if (this.keyboard) {
				this.keyboard.changeLayout(lang);
			}
		}
	},
	methods: {
		onClick (poi) {
			this.$emit('clicked', poi);
			this.$store.dispatch('SHOW_SEARCH', false);
			this.resetValues();
		},
		close () {
			this.$store.dispatch('SHOW_SEARCH', false);
			this.$emit('close');
			this.resetValues();
		},
		resetValues () {
			this.results = [];
			this.keyboard.changeLayout(this.language);
			this.keyboard.clearValue();
			this.$refs.searchInput.value = '';
		},
		setOutput (output) {
			this.keyboard.setOutput(output);
		}
	}
};
</script>

<style scoped>
	.search .close {
			position: absolute;
			top: 0rem;
			right: 0.5rem;
			width: 10rem;
			background-color: rgba(255, 255, 255, 0.7);
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' enable-background='new 0 0 20 20' viewBox='0 0 20 20' y='0px' x='0px' id='Cross' version='1.1'%3E%3Cmetadata id='metadata9'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs7'%3E%3ClinearGradient spreadMethod='pad' gradientUnits='userSpaceOnUse' y2='29.3118' x2='11.0536' y1='16.0077' x1='24.5509' id='paint1_linear' gradientTransform='translate(-6.9097825,12.894087)'%3E%3Cstop id='stop16' stop-color='%23FF4C54' /%3E%3Cstop id='stop18' stop-color='%23BE3F45' offset='1' /%3E%3C/linearGradient%3E%3ClinearGradient gradientUnits='userSpaceOnUse' y2='34.9828' x2='34.294201' y1='14.605' x1='13.6189' id='paint0_linear'%3E%3Cstop id='stop11' stop-color='%23FF4C54' /%3E%3Cstop id='stop13' stop-color='%23BE3F45' offset='1' /%3E%3C/linearGradient%3E%3ClinearGradient gradientTransform='matrix(1.9229845,0,0,1.9229845,-9.2288833,-9.2308069)' gradientUnits='userSpaceOnUse' y2='14.322534' x2='6.3946652' y1='7.6276183' x1='12.290775' id='linearGradient4161' xlink:href='%23paint0_linear' /%3E%3C/defs%3E%3Cpath style='fill:url(%23linearGradient4161);fill-opacity:1' id='path3' d='m 18.362098,19.32359 c -0.90188,0.90188 -2.363348,0.90188 -3.263305,0 l -5.097832,-5.826643 -5.0978311,5.82472 c -0.9018797,0.90188 -2.3633479,0.90188 -3.2633047,0 -0.90187984,-0.90188 -0.90187984,-2.363347 0,-3.263304 L 6.9434164,10.000961 1.6379022,3.9397144 c -0.90187974,-0.9018798 -0.90187974,-2.361425 0,-3.26330476 0.9018798,-0.9018797 2.3614249,-0.9018797 3.2633048,0 l 5.099754,5.82856596 5.097832,-5.82856596 c 0.90188,-0.9018797 2.361425,-0.9018797 3.263305,0 0.901879,0.90187976 0.901879,2.36334796 0,3.26330476 l -5.30359,6.0612466 5.30359,6.057402 c 0.901879,0.90188 0.901879,2.363347 0,3.265227 z' /%3E%3C/svg%3E");
	}
	
	.search .results {
		overflow: hidden;
	}

	.search .search-container {
		width: 54rem;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 100%;
		padding: 1rem;
	}

	.search	.search-input-container input {
		margin: auto;
		display: block;
		padding: 1rem;
		font-size: 2rem;
		font-weight: 600;
		width: 100%;
		border: 1px solid black;
		outline: none;
		background-repeat: no-repeat;
	}

	.search	.keyboard {
		user-select: none;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
	}

	.search	.keyboard .keyboard-row {
		margin: auto;
		display: flex;
	}

	.search	.keyboard .keyboard-key {
		text-align: center;
		width: 4rem;
		height: 4rem;
		font-size: 1.8rem;
		line-height: 4rem;
		overflow: hidden;
		user-select: none;
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.search	.keyboard .keyboard-key:last-child {
		margin-right: 0;
	}

	.search	.keyboard .keyboard-key:active {
		background-color: blue;
	}

	.search	.keyboard .keyboard-key2x {
		width: 8rem;
	}

	.search	.keyboard .keyboard-key3x {
		width: 12rem;
	}

	.search	.keyboard .keyboard-key_spacebar {
		width: 24rem;
	}
</style>
