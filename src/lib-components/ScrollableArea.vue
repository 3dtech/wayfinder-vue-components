<template>
	<div class="wf-component wf-scrollable" ref="area">
		<slot/>
	</div>
</template>

<script>
import ScrollArea from '@3dwayfinder/scrollarea'

export default {
	name: 'ScrollableArea',
	data: () => ({
		scroll: null,
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
            if (!this.scroll) {
			    this.scroll = new ScrollArea(this.$refs.area);
            }
		});
	},
	methods: {
		activate () {
			this.makeScroll();
		},
		reset () {
			this.$nextTick(() => {
				if(this.scroll) {
					this.scroll.refresh();
				}
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
