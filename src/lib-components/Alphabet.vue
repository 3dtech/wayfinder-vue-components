<template>
    <ul class="wf-component wf-alphabet-menu">
        <li v-for="l in alphabet" :key="l" @click="onAZ(l)" :class="[currentChar == l ? 'wf-active':'', 'wf-char-'+l]">{{l}}</li>
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
        },
        group: {
            type: String,
            default: ""
        }
	},
	data () {
        return {
            currentChar: "",
            alphabet: [],
            poisWithChar: {},
            groupChars: [],
            groupLabel: ""
        }
    },
	computed: {//yahLogo
		...mapState('wf', ['language']),
	},
    watch: {
        pois () {
            this.makeGrouping();
            this.generate();
        },
        overrideChar () {
            if (this.overrideChar && this.overrideChar !== "") {
                this.currentChar = this.overrideChar;
            }
        },
        group () {
            this.makeGrouping();
        }
    },
	methods: {
		onAZ (letter) {
            this.currentChar = letter;
            this.$emit("clicked", letter, this.poisWithChar[letter]);
		},
        makeGrouping () {
            if (this.group) {
                this.groupChars = this.group.toLowerCase().split("");
                if (this.groupChars.length > 1) {
                    this.groupLabel = this.groupChars[0] + " - " + this.groupChars[this.groupChars.length - 1];

                }
                else {
                    this.groupLabel = this.groupChars[0];
                }
                this.generate();
            } 
        },
        generate () {
            let letters = [];
            this.poisWithChar = [];
            let poi, char;
            for(let p in this.pois) {
                poi = this.pois[p];
                if ((!this.showInMenu || poi.getShowInMenu()) && poi.getName(this.language) && poi.getName(this.language).length > 0) {
                    char = poi.getName(this.language)[0].toLowerCase();
                    
                    if(this.groupChars.indexOf(char) > -1) {
                        if(letters.indexOf(this.groupLabel) == -1) {
                            letters.push(this.groupLabel);
                            this.poisWithChar[this.groupLabel] = [];
                        }
                        this.poisWithChar[this.groupLabel].push(poi);
                    }
                    else {
                        if(letters.indexOf(char) == -1) {
                            letters.push(char);
                        }
                        
                        if(!this.poisWithChar[char]) {
                            this.poisWithChar[char] = [];
                        }
                        this.poisWithChar[char].push(poi);
                    }

                }
            }
            letters.sort();
            this.alphabet = letters;
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
