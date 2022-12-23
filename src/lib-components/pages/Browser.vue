<template>
  <div class="wf-component wf-browser">
      <iframe :src="currentSRC" nwdisable nwfaketop></iframe>
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
        resetPage: {
			type: Boolean,
			default: false
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
            if (this.resetPage) {
                this.currentSRC = this.src + "?t=" + Date.now();
            }
		},
        src: function () {
            this.currentSRC = this.src;
        }
	},
}
</script>

<style>
    .wf-browser, .wf-browser iframe, .wf-browser webview {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>