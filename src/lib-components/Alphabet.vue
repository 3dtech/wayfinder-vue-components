<template>
    <ul class="wf-component wf-alphabet-menu">
        <li v-for="l in alphabet" :key="l" @click="onAZ(l)" :class="[currentChar == l ? 'wf-active':'']">{{l}}</li>
    </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'AlphabetMenu',
    props: {
		pois: {
			type: Array,
			default: []
		},
        overrideChar: {
			type: String,
			default: ""
		},
        showInMenu: {
            type: Boolean,
            default: true
        }
	},
	data () {
        return {
            currentChar: "",
            alphabet: [],
            poisWithChar: {}
        }
    },
	computed: {//yahLogo
		...mapState('wf', ['language']),
	},
    watch: {
        pois () {
            let letters = [];
            let poi, char;
            for(let p in this.pois) {
                poi = this.pois[p];
                if ((!this.showInMenu || poi.getShowInMenu()) && poi.getName(this.language) && poi.getName(this.language).length > 0) {
                    char = poi.getName(this.language)[0].toLowerCase();
                    if(letters.indexOf(char) == -1) {
                        letters.push(char);
                    }
                    
                    if(!this.poisWithChar[char]) {
                        this.poisWithChar[char] = [];
                    }
                    this.poisWithChar[char].push(poi);
                }
            }
            letters.sort();
            this.alphabet = letters;
        },
        overrideChar () {
            if (this.overrideChar && this.overrideChar !== "") {
                this.currentChar = this.overrideChar;
            }
        }
    },
	methods: {
		onAZ (letter) {
            this.currentChar = letter;
            this.$emit("clicked", letter, this.poisWithChar[letter]);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .wf-alphabet-menu {
        list-style: none;
        padding: 0;
        margin: 0;
    }
</style>
