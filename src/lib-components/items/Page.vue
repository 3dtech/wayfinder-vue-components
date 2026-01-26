<template>
	<div class="wf-page" :class="['wf-page-slug-' + (page && page.slug ? page.slug : 'none'), 'wf-page-type-' + (page ? page.type : 'none'), page ? page.classes : '']">
		<slot name="header" :page="page"></slot>
		<WFScrollableArea ref="scrollableArea" :enable="page && !!page.scrollable">
			<div v-if="page" class="wf-page-container" :class="{'wf-page-empty': page.items.length === 0}">
				<slot :page="page">
					<div class="wf-page-icon" v-if="showIcon" :class="[page.icon ? 'wf-has-icon' : '']" v-html="page.icon"></div>
					<label class="wf-page-name" v-if="showName" v-html="pageName || ''"></label>
					<WFPageContent :page="page"></WFPageContent>
				</slot>
			</div>
			<WFTabs ref="tabs" :activeTab="currentTab" v-show="currentTab">
				<slot name="tabs"></slot>
			</WFTabs>
		</WFScrollableArea>
		<slot name="footer" :page="page"></slot>
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
		PageIMAGE,
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
			console.log('currentTab', this.tab)
			return this.tab;
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
		pid: {
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
		},
		index: {
			type: Number,
			default: 0
		}
	},
	mounted () {
		this.getDefaultPage();
		this.updatePage();
	},
	watch: {
		pages () {
			this.getDefaultPage();			
			this.updatePage();
		},
		container () {
			this.getDefaultPage();
			this.updatePage();
		},
		pid () {
			let page = this.findByID(parseInt(this.pid));

			if (page) {
				this.page = page;
				this.updatePage();
			}
			else {
				console.log('Page with ID', this.pid, 'in', this.container, 'not found');
			}
		},
		slug () {
			let page = this.findBySlug(this.slug.toLowerCase());
			if (page) {
				this.page = page;
				this.updatePage();
			}
			else {
				console.log('Page with slug', this.slug, 'not found');
			}
		},
		index () {
			let page = this.findByIndex(this.index);
			if (page) {
				this.page = page;
				this.updatePage();
			}
			else {
				console.log('Page with index', this.index, 'not found');
			}
		}
	},
	methods: {
		getDefaultPage () {
			console.log('getDefaultPage', this.defaultTab)
			if (this.defaultTab) {
				this.tab = this.defaultTab;
			}
			else if (typeof this.slug === "string" && this.slug.length > 0) {
				this.page = this.findBySlug(this.slug);
			}
			else if (this.pid > -1) {
				this.page = this.findByID(this.pid);
			}
			else if (!this.page) {
				this.page = this.findByIndex(this.index);
			}
			else {
				console.log('Default page not found', this.pid, this.slug, this.index, this.container);
			}
		},
		findByID (id) {
			if (this.pages && this.pages[this.container]) {
				if (id > -1) {
					let page;
					for(let p in this.pages[this.container]) {
						page = this.pages[this.container][p];
						
						if (parseInt(page.id) == id) {
							return page
						}
					}
				}
			}

			return false;
		},
		findByIndex (index) {
			if (this.pages && this.pages[this.container]) {
				if (index > -1) {
					let page = Object.values(this.pages[this.container])[parseInt(index)];
					return page;
				}
			}

			return false;
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
		updatePage () {
			if (this.pages && this.pages[this.container]) {
				if(this.page && this.page.type == "tab") {
					this.tab = this.page.slug;
				}
				else if (this.page){
					this.tab = null;
				}
			}
		},
		itemType (item) {
			if (item && item.type) {
				return "Page"+item.type.toUpperCase();
			}

			return "";
		},
		changePageWithSlug (slug) {
			let page = this.findBySlug(slug);
			if (page) {
				this.updatePage();
				return true;
			}

			return false;
		},
		scrollToSection (index, direction, animate, animSpeed) {
			if(this.$refs.scrollableArea) {
				this.$refs.scrollableArea.scrollToSection(index, direction, animate, animSpeed);
			}
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
	.wf-page-container {
		width: 100%;
		height: 100%;
	}

	.wf-page-container .wf-page-content {
		width: 100%;
		height: 100%;
	}

	.wf-page-container.wf-page-empty {
		height: auto !important;
	}
</style>
