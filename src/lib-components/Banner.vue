<template>
	<div class="wf-component wf-banner" ref="frames" v-observe-visibility="visibilityChanged">
		<div class="wf-frame" v-for="(frame, index) in frames" :key="frame.id" :class="[{ 'wf-active': index == current }, frameKeywords]">
			<div class="wf-frame-container" v-for="container in frame.containers" :key="container.id" :class="[container.containerType]" @click="onClick(frame, container)" :style="{
				left: container.left + '%',
				top: container.top + '%',
				width: container.width + '%',
				height: container.height + '%',
				backgroundImage: 'url(\'' + container.url + '\')'
			}">
				<video width="100%" height="auto" :src="container.url" v-if="isVideo(container)" muted></video>
				<div class="wf-qr" v-html="qr" v-show="container.containerType.indexOf('qr') > -1 && qr != null" :class="[container.containerType]"></div>
			</div>
			<slot :frame="frame"></slot>
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
		container: String,
		playOnBoot: {type: Boolean, default: false },
		qrURL: {type: String, default: "https://3dwayfinder.com" }
	},
	computed: {//yahLogo
		...mapState('wf', ['banners'])
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
			qrPos: "",
			displayQR: false,
			frameKeywords: [],
			last: 0,
		}
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
				if(this.playOnBoot) {
					this.$nextTick(function () {
						this.play();
					});
				}
			}
		},
		qrURL (val) {
			if (val && val !== "") {
				this.renderQR();
			}
		}
	},
	mounted () {
		this.renderQR();
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

			if (this.frames.length > 0) {
				this.next();
			}

			let frame = this.frames[this.current];

			if (this.timer != null) {
				clearTimeout(this.timer);
			}

			if(!frame) {
				return;
			}

			
			this.displayQR = frame && frame.keywords ? frame.keywords.join(",").indexOf("qr-") > -1: false;
			this.frameKeywords = frame.keywords.map(k => "keyword-" + k);

			// console.log('displayQR', this.displayQR, this.qr);
			// console.log('this.refs', this.$refs['frames']);
			if(this.$refs['frames']) {
				let _frame = this.$refs['frames'].children[this.current];
				if (_frame) {
					let video = _frame.querySelector("video");
					if (video && video.readyState) {
						setTimeout(() => {
							this.playVideo(video, frame.duration);
						}, 0);
					} else {
						this.timer = setTimeout(this.play, frame.duration);
					}
				}
				else {
					this.timer = setTimeout(this.play, frame.duration);
				}
			}
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
		},

		renderQR () {
			let url = this.qrURL;
			const QRCode = require("qrcode-svg");
			if (QRCode && url) {
				this.qr = new QRCode({content: url, container: "svg-viewbox", padding: 0}).svg();
			}
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-banner {
		position: relative; 
		width: 100%; 
		height: 100%;
	}

	.wf-banner .wf-frame {
		width: 100%;
		height: 100%;
		position: absolute;
		background-size: cover;
		background-position: 50% 50%;
		background-repeat: no-repeat;
		left: 0%; 
		top: 0%; 
		opacity: 0;
		transition: opacity 0.5s ease-in-out;
	}

	.wf-banner .wf-frame .wf-frame-container {
		background-size: cover;
		background-position: 50% 50%;
		background-repeat: no-repeat;
		position: absolute;
	}

	.wf-banner .wf-frame.wf-active {
		opacity: 1;
		transition: opacity 0.5s ease-in-out;
	}

	.wf-banner .wf-frame video {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
