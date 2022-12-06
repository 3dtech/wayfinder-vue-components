<template>
  <div class="wf-component wf-browser">
      <iframe :src="currentSRC"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'MapFloors',
	props: {
		src: {
			type: String,
			default: ""
		},
	},
    computed: {
		...mapState('wf', ['reset'])
	},
    data () {
		return {
			currentSRC: "",
		}
	},
    mounted () {
        this.currentSRC = this.src;
    },
    watch: {
		reset: function(newVal) {
            this.currentSRC = this.src + "?t=" + Date.now();
		},
        src: function () {
            this.currentSRC = this.src;
        }
	},
}
</script>

<style>
    .wf-browser, .wf-browser iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>