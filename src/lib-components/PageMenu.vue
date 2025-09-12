<template>
	<div class="wf-component wf-page-menu">
		<ul class="wf-list" :class="['wf-list-count-' + count]">
			<li class="wf-list-item" @click="onClick(page)" v-touch:tap="onClick(page)" :class='{"wf-active": active(page)}' v-for="page in sortedPages" :key='page.id'>
				<slot :page="page">
					<i v-show="showIcon" class="wf-icon" v-html="page.icon"></i>
					<label v-show="showName">{{getName(page)}}</label>
					<div v-if="showPopup" v-show="active(currentPage, page)" class="wf-page-popup">
						<Page :container="container" :pid="parseInt(page.id)" :showIcon="popUpShowIcon" :showName="popUpShowName" :scrollable="popUpScrollable" />
					</div>
				</slot>
			</li>
		</ul>
	</div>
</template>

<script>
/* global */
import { mapState } from 'vuex';
import Page from './items/Page.vue';


export default {
	name: 'PageMenu',
	components: {
		Page,
	},
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
		showPopup: {
			type: Boolean,
			default: false
		},
		popUpScrollable: {
			type: Boolean,
			default: true
		},
		popUpShowName: {
			type: Boolean,
			default: true
		},
		popUpShowIcon: {
			type: Boolean,
			default: false
		}
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
	watch: {
		currentPage () {
			console.log('currentPage changed', this.currentPage);
		},
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
        },
		findBySlug (slug) {
			if (this.pages && this.pages[this.container]) {
				if (slug.length > 0) {
					let page;
					for(let p in this.pages[this.container]) {
						page = this.pages[this.container][p];
						if (page.slug.toLowerCase() == slug) {
							return page;
						}
					}
				}
			}

			return false;
		},
		active (currentPage, page) {
			if (currentPage && page) {
				return currentPage.id == page.id;
			}
			return false;
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
