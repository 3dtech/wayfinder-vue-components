<template>
	<div class="wf-component tabs" ref="tabs" :class="['tabs-'+ activeTab, 'tabs-index-'+ activeTabIndex, 'tabs-animate-'+ animate]">
		<div class="tabs-content">
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
		transform: translateX(0) translateY(0);
	}

	.tabs.tabs-animate-vertical .tabs-content {
		flex-direction: column;
	}

	.tab {
		opacity: 0;
		transition: opacity 0.3s ease-out 0.5s;
	}


	.tab.active {
		opacity: 1;
		transition: opacity 0.3s ease-in;
	}

	.tabs.tabs-animate-horisontal .tabs-content, .tabs.tabs-animate-vertical .tabs-content {
		transition: transform 0.5s ease-in-out 0.2s;
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

	.tabs.tabs-animate-vertical.tabs-index-1 .tabs-content {
		transform: translateX(0) translateY(-100%) !important;
	}
	.tabs.tabs-animate-vertical.tabs-index-2 .tabs-content {
		transform: translateX(0) translateY(-200%) !important;
	}
	.tabs.tabs-animate-vertical.tabs-index-3 .tabs-content {
		transform: translateX(0) translateY(-300%) !important;
	}
	.tabs.tabs-animate-vertical.tabs-index-4 .tabs-content {
		transform: translateX(0) translateY(-400%) !important;
	}
	.tabs.tabs-animate-vertical.tabs-index-5 .tabs-content {
		transform: translateX(0) translateY(-500%) !important;
	}
</style>
