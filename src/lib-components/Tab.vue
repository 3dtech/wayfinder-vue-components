<template>
	<section class="tab" :class="{'active': isActive}" v-if="isActive">
        	<slot/>
    	</section>
</template>

<script>
export default {
	name: 'Tab',
	props: {
		name: ''
	},
	data: () => ({
        isActive: false,
        isVisible: true,
    }),
	created() {

    },
	methods: {
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tab {
		display: none;
	}
	.tab.active {
		display: blocK;
	}
</style>
