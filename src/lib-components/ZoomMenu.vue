<template>
    <div class="wf-component wf-zoommenu">
        <div class="item in" @click="zoomIn()">+</div>
        <div class="item out" @click="zoomOut()">-</div>
    </div>
</template>
<script>
export default {
    methods: {
		zoomIn () {
			this.$wayfinder.zoomIn();
		},
        zoomOut () {
			this.$wayfinder.zoomOut();
		},
	}
}
</script>