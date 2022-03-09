<template>
	<div class="wf-poi" v-if="poi">
		<div class="wf-poi-image" v-if="showLogo" :style="{'background-image': getImage()}" :class="[isImage()]"></div>
		<div class="wf-poi-name" v-if="showName" v-html="poi.getName(language) || 'POI'"></div>
		<div class="wf-show-path" v-if="showPathButton" v-touch:tap="showPath">
			<button>
				<label data-translation-element="show_path">{{show_path}}</label> <i></i>
			</button>
		</div>
		<div class="wf-poi-description" v-if="showDescription" v-html="poi.getDescription(language) || ''"></div>
		<div class="wf-poi-room_id" v-if="showRoomID" v-html="poi.room_id || ''"></div>
		<div class="wf-poi-floor" v-if="showFloor && poi.getFloor()" v-html="poi.getFloor().getName(language) || ''"></div>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	name: "POI",
	computed: {
		...mapState('wf', ['language']),
		hasShowPathListener(){
			return !!(this.$listeners && this.$listeners.showPath);
		}
	},
	props: {
		poi: {
			type: Object,
			default: null
		},
		showLogo: {
			type: Boolean,
			default: false
		},
		showName: {
			type: Boolean,
			default: true
		},
		showPathButton: {
			type: Boolean,
			default: false
		},
		showDescription: {
			type: Boolean,
			default: false
		},
		showRoomID: {
			type: Boolean,
			default: false
		},
		showFloor: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		language () {
			if (this.$wayfinder) {
				this.show_path = this.$wayfinder.translator.get('show_path');
			}
		}
	},
	methods: {
		showPath () {
			if (this.poi) {
				if (this.hasShowPathListener) {
					this.$emit('showPath', this.poi);
				}
				else {
					this.$wayfinder.showPath(this.poi.getNode(), this.poi);
				}
			}
		},
		open (type) {
			if (type && this.poi[type]) {
				if (type === 'shop_email') {
					window.open('mailto:' + this.poi[type], '_system')
				}
				else if (type === 'shop_phone') {
					window.open('tel:' + this.poi[type], '_system')
				}
				else {
					window.open(this.poi[type], '_system')
				}
			}
		},
		getImage () {
			if (this.poi.getBackgroundUrl())
				return 'url("' + this.poi.getBackgroundUrl() + '")';
				
			else if (this.poi.getIconUrl()) {
				return 'url("' + this.poi.getIconUrl() + '")';
			}
			else {
				return false;
			}
		},
		isImage () {
			if(this.poi.getBackgroundUrl()) return "image-background";
			else if (this.poi.getIconUrl()) return "image-logo";
			else return "image-none";
		},
		truncate (str, len) {
			if (str && str.length > len) {
				return str.substring(0, len) + '...';
			}
			else {
				return str;
			}
		}
	},
	data: function () {
		return {
			show_path: 'Show Path'
		}
	}
};
</script>

<style scoped>
	.layout-view {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	
	.poi-info {
		padding: 1rem;
		
	}

	.poi-info h2 {
		text-align: center;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.poi-body {
		box-shadow: 0px -2px 1px 0 rgba(0, 0, 0, 0.05);
		padding: 1rem;
		flex-grow: 1;
	}

	.poi-image {
		height: 14rem;
		width: 100%;
		background-position: 50% 50%;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.poi-image.image-background {
		background-size: cover;
	}
	
	.show-path {
		bottom: 1rem;
		right: 1rem;
		text-transform: uppercase;
		z-index: 10;
		line-height: 2.8rem;
		margin-bottom: 1.5rem;		
	}

	.show-path button {
		height: 3rem;
		font-size: 1.2rem;
		line-height: 2.8rem;
		padding-left: 2.5rem;
		padding-right: 2.5rem;
		margin: auto;
		border: 0;
		display: block;
	}
	
	.poi-description {
		line-height: 1.2;
	}

	.poi-contact .address {
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.poi-contact .address span {
		padding-top: 4px;
		vertical-align: top;
		display: inline-block;
	}

	.poi-contact .address a {
		text-decoration: none;
		display: block;
		line-height: 1.5;
	}

	.poi-contact .address .icon:before {
		mix-blend-mode: initial;
		color: white;
	}

</style>
