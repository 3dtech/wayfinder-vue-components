<template>
	<div class="layout-view" v-if="currentPOI">
		<div class="poi-header">
			<div class="poi-image" :style="{'background-image': getImage()}" :class="[isImage()]" v-if="getImage()"></div>
			<div class="poi-info">
				<h2 v-html="currentPOI.getName(language) || ''"></h2>
				<div class="show-path" v-touch:tap="showPath">
					<button class="button secondary round button-small">
						<span data-translation-element="show_path">{{show_path}}</span> <i class="icon icon-pin"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="poi-body">
			<div class="poi-description" v-html="currentPOI.getDescription(language) || ''"></div>
		</div>
	</div>
</template>

<script>
/* global wayfinder: false */
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['currentPOI', 'language'])
	},
	mounted () {
		if (wayfinder) {
			this.show_path = wayfinder.translator.get('show_path');
		}
	},
	watch: {
		language () {
			if (wayfinder) {
				this.show_path = wayfinder.translator.get('show_path');
			}
		}
	},
	methods: {
		update (id) {
			/* global wayfinder window */
			if (wayfinder.pois[id]) {
				this.poi = Object.freeze(wayfinder.pois[id]);
				this.language = wayfinder.getLanguage()
				this.$emit('titleChanged', this.poi.getName(wayfinder.getLanguage()))
				this.description = this.poi.getDescription(wayfinder.getLanguage()) ? this.poi.getDescription(wayfinder.getLanguage()) : '';
				if (this.poi.shop_logo) {
					var scope = this;
					window.requestAnimationFrame(function () {
						scope.$app.getImage(scope.poi.shop_logo).then(function (image) {
							scope.logo = image.url
						})
					});
				}
			}
		},
		showPath () {
			if (this.currentPOI) {
				this.$emit('showPath', this.currentPOI);
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
			if (this.currentPOI.getBackgroundUrl())
				return 'url("' + this.currentPOI.getBackgroundUrl() + '")';
				
			else if (this.currentPOI.getIconUrl()) {
				return 'url("' + this.currentPOI.getIconUrl() + '")';
			}
			else {
				return false;
			}
		},
		isImage () {
			if(this.currentPOI.getBackgroundUrl()) return "image-background";
			else if (this.currentPOI.getIconUrl()) return "image-logo";
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
			poi: {},
			description: '',
			logo: '',
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
