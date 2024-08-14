<template>
	<div class="wf-component wf-banner" ref="frames" v-observe-visibility="visibilityChanged">
		<div class="wf-frame" v-for="(frame, index) in displayedFrames" :key="frame.id" :class="[{ 'wf-active': index == current }, frameKeywords]">
			<div class="wf-frame-container" v-for="container in frame.containers" :key="container.id" :class="[container.containerType]" @click="onClick(frame, container)" :style="{
				left: container.left + '%',
				top: container.top + '%',
				width: container.width + '%',
				height: container.height + '%',
			}">
				<img :src="container.url" v-if="!isVideo(container)"/>
				<video width="100%" height="auto" v-if="isVideo(container)" muted crossorigin="anonymous">
					<source :src="container.url" :type="container.type">
				</video>
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
		...mapState('wf', ['banners']),
		orderedFrames () {
			return Object.values(this.loadedFrames).sort((a, b) => {
				return a.index > b.index
			});
		}
	},
	data () {
		return {
			frames: [],
			loadedFrames: {},
			displayedFrames: [],
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
			let _template = 'template-' + this.template.toLowerCase();
			if (this.template && this.container && this.banners[_template] && this.banners[_template][this.container]) {
				this.frames = this.banners[_template][this.container].filter((frame) => {
					let enabled = frame.enabled;
					
					if (enabled && frame.from_date) {
						enabled = enabled && (new Date(frame.from_date)).getTime() <= now;
					}

					if (enabled && frame.to_date) {
						enabled = enabled && (new Date(frame.to_date)).getTime() >= now;
					}

					frame.loaded = false;
					frame.loadCount = 0;

					return enabled;
				});

				this.frames.forEach((f, i) => {
					if(!this.loadedFrames[f.id]) {
						this.preloadFrame(i, f);
					}
					else {
						console.log('frame allready loaded', f.id);
					}
				});

				this.$emit('hasbanners', (this.frames.length > 0), this.template, this.container);
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
		preloadFrame (index, frame) {
			frame.index = index;
			for(let c in frame.containers) {
				frame.containers[c].url = this.getUrl(frame.containers[c]);
				frame.containers[c].loadFailed = 0;
				this.fetchMedia(index, frame.containers[c])
			}
		},
		loadFailed (frameIndex, container) {
			let scope = this;
			console.log('loadFailed', container)
			container.loadFailed++;
			if (container.loadFailed <= 30) {
				setTimeout(function () {
					scope.fetchMedia(frameIndex, container);
				}, Math.max(10000, container.loadFailed * 10000));
			}
			else {
				console.log('skipping container', frameIndex, container);
			}
			
		},
		fetchMedia (frameIndex, container) {
			if(container && container.advertisement_id > 0) {
				let scope = this;
				if(container.type.indexOf("image") == 0) {
					let img = new Image();
					img.src = container.url;
					img.onload = function () {
						scope.loaded(frameIndex, container);
					}

					img.onerror = function () {
						scope.loadFailed(frameIndex, container);
					}
				}
				else if(container.type.indexOf("video") == 0) {
					var video;
					try {
						video = new Video();
					} catch(e) {
						video = document.createElement('video');
					}
					video.src = container.url;
					video.onloadeddata = function () {
						scope.loaded(frameIndex, container);
					}

					video.onerror = function () {
						scope.loadFailed(frameIndex, container);
					}

					video.load();
				}
			}
			else {
				console.log('skipping container', container);
			}
		},
		loaded (frameIndex) {
			let frame = this.frames[frameIndex];
			
			if (frame) {
				frame.loadCount++;
				if (frame.loadCount >= frame.containers.length) {
					this.$set(this.loadedFrames, frame.id, frame);
					this.displayedFrames = Object.values(this.loadedFrames).sort((a, b) => a.index > b.index);

					if(!this.timer && this.playOnBoot) {
						this.play();
					}
				}
			}
		},
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
			if (this.current >= this.displayedFrames.length) {
				return;
			}

			if (this.displayedFrames.length > 0) {
				this.next();
			}

			let frame = this.displayedFrames[this.current];

			if (this.timer != null) {
				clearTimeout(this.timer);
			}

			if(!frame) {
				return;
			}
			
			this.displayQR = frame && frame.keywords ? frame.keywords.join(",").indexOf("qr-") > -1: false;
			this.frameKeywords = frame.keywords.filter(k => typeof k === "string" && k.length > 0).map(k => "wf-keyword-" + k);

			// console.log('displayQR', this.displayQR, this.qr);
			// console.log('this.refs', this.$refs['frames']);
			if(this.$refs['frames']) {
				let _frame = this.$refs['frames'].children[this.current];
				if (_frame) {
					let video = _frame.querySelector("video");
					if (video && video.readyState) {
						setTimeout(() => {
							this.playVideo(video, frame.duration);
						}, 10);
					} else {
						if(video) {
							console.log('video not ready. try again', video.readyState)
							// maybe we should remove it?
							setTimeout(() =>{
								console.log('play next instead')
								this.play();
							}, 100);
						}
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
				console.warn("Video playback failed", err);
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
			if (this.current < this.displayedFrames.length - 1) {
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
		position: absolute;
	}

	.wf-banner .wf-frame .wf-frame-container img {
		object-fit: cover;
		width: 100%;
		height: 100%;
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
