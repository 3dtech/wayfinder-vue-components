<template>
	<div class="wf-component wf-menu">
		<ul class="wf-list" :class="['wf-list-count-' + count]">
			<li
				v-for="menuItem in sortedMenus"
				:key="menuItem.id"
				class="wf-list-item"
				v-touch:tap="onClick(menuItem)"
				:class='{"wf-active": activeId == menuItem.id}'
			>
				<slot :page="menuItem" :menu="menuItem">
					<i v-show="showIcon" class="wf-icon" v-html="menuItem.icon"></i>
					<label v-show="showName">{{getName(menuItem)}}</label>
				</slot>
			</li>
		</ul>
	</div>
</template>

<script>
/* global */
import { mapState } from 'vuex';

export default {
	name: 'Menu',
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
			count: 0,
			activeId: -1
		}
	},
	computed: {
		...mapState('wf', ['menus', 'language']),
		sortedMenus () {
            let arr = [];
			
            if (this.menus && typeof this.menus == "object" && this.menus[this.container] && this.menus[this.container].items) {
                arr = Object.values(this.menus[this.container].items);
				
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
			console.log("sortedMenus", this.container, this.menus[this.container], arr)
			this.count = arr.length;
			return arr;
		}
	},
	watch: {
		container: {
			immediate: true,
			handler () {
				
			},
		}
	},
	methods: {
		onClick (menu) {
			return () => {
				this.$emit('clicked', menu);
			};
		},
        getName (item) {
            if (item && item.name) {
                return item.name[this.language] || ""; 
            }
            return "";
        },
		findBySlug (slug) {
			if (this.menus && this.menus[this.container]) {
				if (slug.length > 0) {
					let menu;
					for(let p in this.menus[this.container]) {
						menu = this.menus[this.container][p];
						if (menu.slug.toLowerCase() == slug) {
							return menu;
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
