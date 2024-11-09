<template>
	<div class="wf-poi-advertisement" v-if="ad">
        <img :src="url" v-if="!isVideo()"/>
        <video width="100%" height="auto" v-if="isVideo()" muted crossorigin="anonymous">
            <source :src="url" :type="ad.contentType">
        </video>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: "POI",
	computed: {
		...mapState('wf', ['language']),
        url () {
            if (this.ad) {
                return WayfinderAPI.advertisements.data.url(this.ad.advertisement_id);
            }

            return "";
        }
	},
	props: {
		ad: {
			type: Object,
			default: null
		},
	},
	mounted () {

	},
	watch: {
		language () {
			
		},	
		ad () {

		}
	},
	methods: {
		clicked () {
			if (this.ad) {
				this.$emit('clicked', this.ad);
			}
		},
        isVideo () {
			return this.ad.contentType && this.ad.contentType.substr(0, 5) === 'video';
		},
		getImage () {
			if (!!this.poi.getBackgroundUrl())
				return this.poi.getBackgroundUrl();
				
			else if (!!this.poi.getIconUrl()) {
				return this.poi.getIconUrl();
			}
			else {
				return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
			}
		},
		isImage () {
			if(this.ad.getMediaUrl()) return "image-background";
			else if (this.poi.getIconUrl()) return "image-logo";
			else return "image-none";
		},
		truncate (str, len) {
			if (str && str.length > len) {
				return str.substring(0, len) + '...';
			}
			else {
				return str;
			}
		}
	},
	data: function () {
		return {
			show_path: 'Show Path',
			show_accessibility_path: "Show Accessibility Path",
			pathTime: '',
			unit: 'm',
			path2Text: null
		}
	}
};
</script>

<style scoped>
    .wf-poi-advertisement {
        width: 100%;
        min-height: 1em;
        overflow: hidden;
    }
    .wf-poi-advertisement img, .wf-poi-advertisement video {
            object-fit: contain;       
    }

</style>
