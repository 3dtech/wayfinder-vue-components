<template>
	<div class="scrollable" ref="area">
		<slot/>
	</div>
</template>

<script>
import BScroll from 'wf-better-scroll'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

export default {
	name: 'ScrollableArea',
	props: {
		activeTab: ''
	},
	data: () => ({
		scroll: null,
		scrollOptions: {
			scrollbar: {
                fade: false,
                interactive: true
            },
			click: true,
			mouseWheel: {
				speed: 20,
				invert: false
			}
		}
	}),
	created() {
	},
	updated(){
		this.$nextTick(() => {
			if (this.scroll && this.currentTab != null) {
				this.scroll.refresh();
			}
		});
	},
	mounted () {
		this.$nextTick(() => {
			if (this.currentTab != null) {
				this.scroll = new BScroll(this.$refs.area, this.scrollOptions);
			}
		});
	},
	watch: {
		activeTab: function(newVal) { // watch it
			if(newVal) {
				this.activate(newVal);
			}
		}
	},
	methods: {
		activate () {
			this.makeScroll();
		},
		makeScroll () {
			this.$nextTick(() => {
				this.$nextTick(() => {
					if(this.scroll) {
						this.scroll.destroy();
						this.scroll = null;
					}

					if (this.currentTab != null) {
						this.scroll = new BScroll(this.$refs.area, this.scrollOptions);
					}
				});
			});
		},
		move () {
			//console.log('move');
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.scrollable {
		overflow: hidden;
	}
</style>
