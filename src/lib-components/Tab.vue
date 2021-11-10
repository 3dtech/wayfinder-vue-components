<template>
	<section class="tab" :class="{'active': isActive}">
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
		width: 100%;
		height: 100%;
		overflow: hidden;
		flex-grow: 1;
		flex-shrink: 0;
	}

</style>
