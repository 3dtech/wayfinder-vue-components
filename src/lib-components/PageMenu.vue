<template>
	<div class="wf-component wf-page-menu">
		<ul class="wf-list" :class="['wf-list-count-' + count]">
			<li class="wf-list-item" @click="onClick(page)" v-touch:tap="onClick(page)" :class='{"wf-active": currentPage && page.id == currentPage.id}' v-for="page in sortedPages" :key='page.id'>
				<i v-show="showIcon" class="wf-icon" v-html="page.icon"></i>
                <label v-show="showName">{{getName(page)}}</label>
			</li>
		</ul>
	</div>
</template>

<script>
/* global */
import { mapState } from 'vuex';

export default {
	name: 'PageMenu',
	props: {
        container: {
            type: String,
			default: "default"
        },
		showIcon: {
			type: Boolean,
			default: false
		},
		showName: {
			type: Boolean,
			default: true
		},
		currentPage: {
			type: Object,
			default: null
		},
		sortAZ: {
			type: Boolean,
			default: false
		},
	},
	data () {
		return {
			count: 0
		}
	},
	computed: {
		...mapState('wf', ['pages', 'language']),
		sortedPages () {
            let arr = [];
            if (this.pages && typeof this.pages == "object" && this.pages[this.container]) {
                arr = Object.values(this.pages[this.container]).filter((page) => {
                    return (page && parseInt(page.visible));
                }); // Copy and filter array
				if (this.sortAZ) {
					arr = arr.sort((a, b) => {
						if (this.getName(a) && this.getName(b)) {
							return this.getName(a).localeCompare(this.getName(b));
						}
						else {
							return 0;
						}
					});
				}
				else {
					arr = arr.sort((a, b) => {
						return parseInt(a.order) - parseInt(b.order);
					});
				}
            }

			this.count = arr.length;
			return arr;
		}
	},
	methods: {
		onClick (page) {
			return () => {
				this.$emit('clicked', page);
			};
		},
        getName (page) {
            if (page) {
                return page["name"][this.language];
            }
            return "";
        }
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-list-item {
		list-style: none;
	}
</style>
