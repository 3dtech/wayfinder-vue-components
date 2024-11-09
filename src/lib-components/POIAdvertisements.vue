<template>
	<div class="wf-component wf-poi-advertisements">
		<WFPOIAdvertisement v-for="ad in ads" :key="ad.id" :ad="ad" @clicked="clicked"></WFPOIAdvertisement>
	</div>
</template>

<script>
/* global */
import { mapState } from 'vuex';

export default {
	name: 'POIAdvertisements',
	props: {
        ads: {
            type: Array,
			default: []
        },
	},
	data () {
		return {
		}
	},
	computed: {
	},
	methods: {
		clicked (ad) {
			this.$emit('clicked', ad);
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
