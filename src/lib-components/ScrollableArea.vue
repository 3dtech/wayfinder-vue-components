<template>
	<div class="wf-component wf-scrollable" ref="area">
		<slot/>
	</div>
</template>

<script>
import ScrollArea from '@3dwayfinder/scrollarea'

export default {
	name: 'ScrollableArea',
	props: {
		enable: {
			type: Boolean,
			default: true
		},
	},
	data: () => ({
		scroll: null
	}),
	updated(){
		this.$nextTick(() => {
			if (this.scroll) {
				this.scroll.resize();
			}
		});
	},
	mounted () {
		this.$nextTick(() => {
            if (!this.scroll && this.$refs.area) {
			    this.scroll = new ScrollArea(this.$refs.area);
            }
		});
	},
	methods: {
		activate () {
			if (this.enable) {
				this.makeScroll();
			}
		},
		reset () {
			this.$nextTick(() => {
				if(this.enable && this.scroll) {
					this.scroll.reset();
				}
			});
		},
		resize () {
			this.$nextTick(() => {
				if(this.enable && this.scroll) {
					this.scroll.resize();
				}
			});
		},
		scrollToSection (index, direction, animate, animSpeed) {
			if(this.scroll) {
				this.scroll.scrollToSection(index, direction, animate, animSpeed);
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
