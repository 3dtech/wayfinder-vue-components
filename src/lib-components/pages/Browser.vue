<template>
  <div class="wf-component wf-browser">
        <!--webview :src="currentSRC" ref="frame" v-if="webview"></webview-->
        <iframe :src="currentSRC" ref="frame" nwdisable></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Browser',
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
		...mapState('wf', ['reset']),
        webview () {
            if ('options' in document.createElement('webview')) {
                console.log('webview exists')
                return true;
            }
            console.log('webview not exists')
            return false;
        }
	},
    data () {
		return {
			currentSRC: "",
		}
	},
    mounted () {
        this.currentSRC = this.src;
        this.$refs.frame.addEventListener("load", () => {
            console.log('frame.load', this.$refs.frame.contentWindow.document)
        });
    },
    watch: {
		reset: function(newVal) {
            if (this.resetPage) {
                this.currentSRC = this.src + "?t=" + Date.now();
            }
		},
        src: function () {
            this.currentSRC = this.src;
            console.log('src', src)
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