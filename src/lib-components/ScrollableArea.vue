<template>
	<div class="wf-component scrollable" ref="area">
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
	data: () => ({
		scroll: null,
        changed: 0,
        hasSlotContent: false,
        observer: null,
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
	beforeUpdate() {
        this.hasSlotContent = this.checkForSlotContent();
    },
    beforeDestroy: function() {
        // Clean up
        this.observer.disconnect();
    },
    created() {
        this.hasSlotContent = this.checkForSlotContent();
    },
	updated(){
		this.$nextTick(() => {
			if (this.scroll) {
				this.scroll.refresh();
			}
		});
	},
	mounted () {
		this.$nextTick(() => {
            if (!this.scroll) {
			    this.scroll = new BScroll(this.$refs.area, this.scrollOptions);
            }
		});

        let classes = ["scrollable", "bscroll-vertical-scrollbar"];

        this.observer = new MutationObserver(function(mutations) {
            let className;
            let reload = false;
            let mut;
            for (let m in mutations) {
                mut = mutations[m];
                className = mut.target.className;
                if (!(mut.type == "attributes" || classes.indexOf(className) > -1)) {
                    reload = true;
                }
            }

            if(reload) {
                this.changed++;
            }
            //
        }.bind(this));
        // Setup the observer
        this.observer.observe(
            this.$refs.area,
            { attributes: true, childList: true, characterData: true, subtree: true }
        );
	},
	watch: {
		changed: function(newVal) { // watch it
			if(newVal) {
				this.makeScroll();
			}
		},
        hasSlotContent: function(val) {
        }
	},
	methods: {
		activate () {
			this.makeScroll();
		},
        checkForSlotContent() {
            let checkForContent = (hasContent, node) => {
                return hasContent || node.tag || (node.text && node.text.trim());
            }
            return this.$slots.default && this.$slots.default.reduce(checkForContent, false);
        },
		makeScroll () {
			this.$nextTick(() => {
				this.$nextTick(() => {
					if(this.scroll) {
						this.scroll.destroy();
						this.scroll = null;
					}

					this.scroll = new BScroll(this.$refs.area, this.scrollOptions);
				});
			});
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
	.scrollable {
        overflow: hidden;
        width: 100%;
        height: 100%;
	}
</style>
