<template>
	<div class="wf-page">
		<div class="wf-page-container" v-if="page">
			<div class="wf-page-icon" v-if="showIcon" :class="[page.icon ? 'wf-has-icon' : '']" v-html="page.icon"></div>
			<label class="wf-page-name" v-if="showName" v-html="pageName || ''"></label>
			<div class="wf-page-content">
				<div v-if="page.type == 'collection'">
					<component v-for="(item, index) in page.items" :key="item.id" :class="['wf-page-item-' + index ]" :is="itemType(item)" :item="item"></component> 
				</div>
				<div v-if="isSingle" class="wf-page-single">
					<component :is="itemType(page)" :item="page"></component> 
				</div>
			</div>
		</div>
		<WFTabs ref="tabs" :activeTab="currentTab">
			<slot name="tabs"></slot>
		</WFTabs>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';
import PageHTML from './page_items/PageHTML.vue';
import PageURL from './page_items/PageUrl.vue';
import PageIMAGE from './page_items/PageImage.vue';

export default {
	name: "Page",
	components: {
		PageHTML,
		PageURL,
		PageIMAGE
	},
	computed: {
		...mapState('wf', ['language', 'pages']),
        pageName () {
            if (this.page && this.page.name) {
                return this.page.name[this.language];
            }
            else return "";
        },
		currentTab () {
			return this.tab !== null ? this.tab : this.defaultTab;
		},
		isSingle () {
			if (this.page && ['collection', 'tab'].indexOf(this.page.type) > -1) return false;

			return true;
		}
	},
	props: {
		container: {
			type: String,
			default: "default"
		},
		index: {
			type: Number,
			default: -1
		},
		slug: {
			type: String,
			default: null
		},
		showName: {
			type: Boolean,
			default: true
		},
		showIcon: {
			type: Boolean,
			default: false
		},
		playAll: {
			type: Boolean,
			default: false
		},
		duration: {
			type: Number,
			default: 30
		},
		defaultTab: {
			type: String,
			default: null
		}
	},
	mounted () {
		this.updatePage();
	},
	watch: {
		pages () {
			this.updatePage();
		},
		container () {
			this.updatePage();
		},
		index () {
			if (this.index >= 1) {
				this.currentIndex = this.index;
				this.updatePage();
			}
		},
		slug () {
			this.updatePage();
		}
	},
	methods: {
		updatePage () {
			if (this.pages && this.pages[this.container]) {
				console.log('updatePage1', this.page, this.container, this.currentIndex, this.slug )
				if (this.slug != null){
					let page;
					for(let p in this.pages[this.container]) {
						page = this.pages[this.container][p];
						if (page.slug.toLowerCase() == this.slug.toLowerCase()) {
							console.log('updatePage2', this.page, this.container, this.currentIndex, this.slug )
							this.page = page;
							break;
						}
					}
				}
				else if (this.currentIndex > -1 && this.pages[this.container][this.currentIndex]) {
					this.page = this.pages[this.container][this.currentIndex];
				}

				if(this.page && this.page.type == "tab") {
					this.tab = this.page.slug;
				}
				else {
					this.tab = null;
				}
			}
		},
		itemType (item) {
			if (item && item.type) {
				return "Page"+item.type.toUpperCase();
			}

			return "";
		}
	},
	data: function () {
		return {
			currentIndex: 1,
			page: null,
			tab: null
		}
	}
};
</script>

<style scoped>


</style>
