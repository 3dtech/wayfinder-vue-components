<template>
	<div class="banner-set" ref="frames" v-observe-visibility="visibilityChanged">
		<div class="frame" v-for="(frame, index) in frames" :key="frame.id" :class="[{ active: index == current }, frameKeywords]">
			<div class="container" v-for="container in frame.containers" :key="container.id" @click="onClick(frame, container)" :style="{
				left: container.left + '%',
				top: container.top + '%',
				width: container.width + '%',
				height: container.height + '%',
				backgroundImage: 'url(\'' + container.url + '\')'
			}">
				<div class="qr" v-show="displayQR" v-html="qr"></div>
				<video width="100%" height="auto" :src="container.url" v-if="isVideo(container)" muted></video>'
			</div>
		</div>
	</div>
</template>

<script>
/* global WayfinderAPI wayfinder */
import { mapState } from 'vuex';

export default {
	name: 'Banner',
	props: {
		template: String,
		container: String
	},
	computed: {//yahLogo
		...mapState(['banners'])
	},
	data () {
		return {
			frames: [],
			current: -1,
			timer: null,
			fadeDuration: 500,
			backgroundColor: "#fff",
			visible: false,
			qr: null,
			displayQR: false,
			frameKeywords: [],
			last: 0
		}
	},
	mounted () {
		this.renderQR();
	},
	watch: {
		banners () {
			let now = Date.now();
			
			if (this.template && this.container && this.banners['template-' + this.template] && this.banners['template-' + this.template][this.container]) {
				this.frames = this.banners['template-' + this.template][this.container].filter((frame) => {
					let enabled = frame.enabled;
					
					if (enabled && frame.from_date) {
						enabled = enabled && (new Date(frame.from_date)).getTime() <= now;
					}

					if (enabled && frame.to_date) {
						enabled = enabled && (new Date(frame.to_date)).getTime() >= now;
					}

					if(enabled) {
						for(let c in frame.containers) {
							frame.containers[c].url = this.getUrl(frame.containers[c]);
						}
					}
					return enabled;
				});

				this.$emit('hasbanners', (this.frames.length > 0));
			}
		}
	},
	methods: {
		visibilityChanged (visible) {
			this.visible = visible;
			if (visible) {
				this.play();
			}
			else {
				this.stop();
			}
		},
		play () {
			if (this.current >= this.frames.length) {
				return;
			}

			if (this.frames.length > 1) {
				this.next();
			}

			let frame = this.frames[this.current];

			if (this.timer != null) {
				clearTimeout(this.timer);
			}

			
			this.displayQR = frame && frame.keywords ? frame.keywords.join(",").indexOf("qr-") > -1: false;
			this.frameKeywords = frame.keywords.map(k => "keyword-" + k);

			//console.log('displayQR', this.displayQR, this.qr);

			if(this.$refs['frames']) {
				let video = this.$refs['frames'].querySelector('video');
				if (video && video.readyState) {
					setTimeout(() => {
						this.playVideo(video, frame.duration);
					}, 0);
				} else {
					this.timer = setTimeout(this.play, frame.duration);
				}
			}
		},

		renderQR () {
			let kiosk = wayfinder.getKiosk() || 47;
			let rotations = {
				422: 180,
				380: 180,
				420: 180
			};

			let rot = rotations[kiosk] || 0;
			let url = "https://clients.3dwayfinder.com/Horisont/?mobile=1&kiosk={kiosk}&map2DRotation={rot}";
			url = url.replace('{kiosk}', kiosk);
			url = url.replace('{rot}', rot);
			const QRCode = require("qrcode-svg");
			this.qr = new QRCode({content: url, container: "svg-viewbox", padding: 0}).svg();
		},

		playVideo (video, duration) {
			video.pause();
			video.currentTime = 0;
			var playPromise = video.play();
			playPromise.catch((err) => {
				clearTimeout(this.timer);
				setTimeout(() => {
					this.playVideo(video, duration);
				}, 300);
			});
			this.timer = setTimeout(this.play, duration);
		},

		stop () {
			if (this.timer) {
				clearTimeout(this.timer);
			}
		},

		next () {
			if (this.current < this.frames.length - 1) {
				this.current++;
			}
			else {
				this.current = 0;
			}
		},

		onClick (frame, container) {
			this.$emit('clicked', frame, container);
		},

		isImage (container) {
			return !(container.type && container.type.substr(0, 5) === 'video');
		},

		isVideo (container) {
			return container.type && container.type.substr(0, 5) === 'video';
		},

		getUrl (container) {
			return WayfinderAPI.advertisements.data.url(container.advertisement_id);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.banner-set {
		position: relative; 
		width: 100%; 
		height: 100%;

		.frame {
			width: 100%;
			height: 100%;
			position: absolute;
			background-size: cover;
			background-position: 50% 50%;
			background-repeat: no-repeat;
			left: 0%; 
			top: 0%; 
			width: 100%; 
			height: 100%;
			opacity: 0;
			transition: opacity 0.5s ease-in-out;

			.qr {
				width: 25%;
				height: auto;
				position: absolute;
				bottom: 27.5%;
				left: 35%;
				border: 10px solid white;
           	}

           	&.keyword-qr-1 .qr {
           		width: 30%;
			}

           	&.keyword-qr-2 .qr {
           		width: 30%;
				bottom: 3% !important;
			}

			&.keyword-qr-3 .qr {
				right: 10% !important;
				left: auto !important;
				bottom: 7.5% !important;
			}

			&.keyword-qr-4 .qr {
				left: 8.5% !important;
				bottom: 7.5% !important;
			}

			.container {
				background-size: cover;
				background-position: 50% 50%;
				background-repeat: no-repeat;
			}

			&.active {
				opacity: 1;
				transition: opacity 0.5s ease-in-out;
			}

			video {
				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
</style>
