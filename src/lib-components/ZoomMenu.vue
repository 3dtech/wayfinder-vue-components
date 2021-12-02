<template>
    <div class="wf-component wf-zoommenu">
        <div class="wf-item wf-zoom-in" @click="zoomIn()">+</div>
        <div class="wf-item wf-zoom-out" @click="zoomOut()">-</div>
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