<template>
	<div class="wf-page" v-if="page">
        <label class="wf-page-name" v-if="showName" v-html="pageName || ''"></label>
        <div class="wf-page-content">
            <div v-for="(item, index) in page.items" :key="item.id" :class="['wf-page-item-' + index ]">
				<component :is="itemType(item)" :item="item"></component> 
            </div>
        </div>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';
import PageHTML from './page_items/PageHTML.vue';

export default {
	name: "Page",
	components: {
		PageHTML
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
			} 
			
		}
	},
	methods: {
		updatePage () {
			if (this.pages) {
				
				if (this.pages[this.container] && this.pages[this.container][this.currentIndex]) {
					this.page = this.pages[this.container][this.currentIndex];
					console.log('updatePage', this.page, this.container, this.currentIndex)
				}
			}
		},
		itemType (item) {
			if (this.page) {
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
