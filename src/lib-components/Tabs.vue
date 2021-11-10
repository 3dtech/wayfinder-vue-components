<template>
	<div class="tabs" ref="tabs" :class="['tabs-'+ activeTab, 'tabs-index-'+ activeTabIndex]">
		<div class="tabs-content">
			<slot/>
		</div>
	</div>
</template>

<script>
import BScroll from 'wf-better-scroll'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

export default {
	name: 'Tabs',
	props: {
		activeTab: ''
	},
	data: () => ({
		tabs: [],
		activeTabIndex: 0,
		currentTab: null,
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
		this.tabs = this.$children;
	},
	updated(){
		this.$nextTick(() => {
			if (this.scroll && this.currentTab != null) {
				this.scroll.refresh();
			}
		});
	},
	mounted () {
		if (this.$props.activeTab) {
			this.activate(this.$props.activeTab);
		}
		else {
			console.log('no active tab')
		}
		this.$nextTick(() => {
			if (this.currentTab != null) {
				this.scroll = new BScroll(this.$refs.tabs, this.scrollOptions);
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
			this.currentTab = null;
			for (var tab in this.tabs) {
				console.log('tab', tab);
				if (this.tabs[tab].name == this.$props.activeTab) {
					this.tabs[tab].isActive = true;
					this.$emit('tabChanged', this.tabs[tab]);
					this.currentTab = this.tabs[tab];
					this.activeTabIndex = tab;
				}
				else {
					this.tabs[tab].isActive = false;
				}
			}
			if(this.$props.activeTab !== "search") {
				this.makeScroll();
			}
		},
		makeScroll () {
			this.$nextTick(() => {
				this.$nextTick(() => {
					if(this.scroll) {
						this.scroll.destroy();
						this.scroll = null;
					}

					if (this.currentTab != null) {
						this.scroll = new BScroll(this.$refs.tabs, this.scrollOptions);
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
	.tabs {
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.tabs-content {
		height: 100%;
		width: auto;
		display: flex;
		flex-direction: row;
		margin-left: 0;
		transform: translateX(0);
		transition: transform 0.5s ease-in-out;
	}

	.tabs-index-1 .tabs-content {
		transform: translateX(-100%);
	}
	.tabs-index-2 .tabs-content {
		transform: translateX(-200%);
	}
	.tabs-index-3 .tabs-content {
		transform: translateX(-300%);
	}
	.tabs-index-4 .tabs-content {
		transform: translateX(-400%);
	}
	.tabs-index-5 .tabs-content {
		transform: translateX(-500%);
	}
</style>
