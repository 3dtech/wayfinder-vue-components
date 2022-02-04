<template>
	<section class="wf-component wf-tab" :class="{'wf-active': isActive}">
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
	.wf-tab {
		overflow: hidden;
		flex-grow: 1;
		flex-shrink: 0;
		width: 100%;
	}

</style>
