<template>
	<div class="wf-component wf-tabs" ref="tabs" :class="['wf-tabs-'+ activeTab, 'wf-tabs-index-'+ activeTabIndex, 'wf-tabs-animate-'+ animate]">
		<div class="wf-tabs-content" ref="slide">
			<slot/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Tabs',
	props: {
		activeTab: '',
		animate: { type: String, default: "none" }
	},
	data: () => ({
		tabs: [],
		activeTabIndex: 0,
		currentTab: null,
	}),
	created() {
		this.tabs = this.$children;
	},
	mounted () {
		if (this.$props.activeTab) {
			this.activate(this.$props.activeTab);
		}
		else {
			console.log('no active tab')
		}
	},
	watch: {
		activeTab: function() { // watch it
			this.activate();
		}
	},
	methods: {
		activate () {
			//console.log('tabs.activate', this.activeTab, this.$props.activeTab)
			this.currentTab = null;
			for (var tab in this.tabs) {
				if (this.tabs[tab].name == this.$props.activeTab) {
					this.tabs[tab].isActive = true;
					this.$emit('tabChanged', this.tabs[tab]);
					this.currentTab = this.tabs[tab];
					this.activeTabIndex = tab;
					if (this.animate === "vertical") {
						this.$refs.slide.style.transform = "translateX(0) translateY(-" + tab * 100 + "%)";
					}
					else {
						this.$refs.slide.style.transform = "translateY(0) translateX(-" + tab * 100 + "%)";
					}
				}
				else {
					this.tabs[tab].isActive = false;
				}
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-tabs {
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.wf-tabs-content {
		height: 100%;
		width: auto;
		display: flex;
		flex-direction: row;
		margin-left: 0;
		transform: translateX(0) translateY(0);
	}

	.wf-tabs.wf-tabs-animate-vertical .wf-tabs-content {
		flex-direction: column;
	}

	.wf-tab {
		opacity: 0;
		transition: opacity 0.3s ease-out 0.5s;
	}

	.wf-tabs-animate-none .wf-tab {
		transition: none !important;
	}


	.wf-tab.wf-active {
		opacity: 1;
		transition: opacity 0.3s ease-in;
	}

	.wf-tabs.wf-tabs-animate-horizontal .wf-tabs-content, .wf-tabs.wf-tabs-animate-vertical .wf-tabs-content {
		transition: transform 0.5s ease-in-out 0.2s;
	}
</style>
