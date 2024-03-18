<template>
	<div class="wf-page" v-if="page">
		<div class="wf-page-icon" :class="[page.icon ? 'wf-has-icon' : '']" v-html="page.icon"></div>
        <label class="wf-page-name" v-if="showName" v-html="pageName || ''"></label>
        <div class="wf-page-content">
			<div v-if="page.type == 'collection'">
				<component v-for="(item, index) in page.items" :key="item.id" :class="['wf-page-item-' + index ]" :is="itemType(item)" :item="item"></component> 
			</div>
			<div v-if="page.type !== 'collection'" class="wf-page-single">
				<component :is="itemType(page)" :item="page"></component> 
            </div>
        </div>
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
		playAll: {
			type: Boolean,
			default: false
		},
		duration: {
			type: Number,
			default: 30
		}
	},
	mounted () {
		this.updatePage();
	},
	watch: {
		pages () {
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
			}
		},
		itemType (item) {
			console.log('item', item);
			if (item && item.type) {
				return "Page"+item.type.toUpperCase();
			}

			return "";
		}
	},
	data: function () {
		return {
			currentIndex: 1,
			page: null
		}
	}
};
</script>

<style scoped>


</style>
