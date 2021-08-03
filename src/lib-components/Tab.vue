<template>
	<section class="tab" :class="{'tab-active': isActive}" v-if="isActive">
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
<style scoped lang="less">
	.tab {
		display: none;
		//height: 100%;

		&.tab-active {
			display: blocK;
		}
	}
</style>
