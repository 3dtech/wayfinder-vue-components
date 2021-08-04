<template>
    <div class="wf-zoommenu">
        <div class="item in" @click="zoomIn()">+</div>
        <div class="item out" @click="zoomOut()">-</div>
    </div>
</template>
<script>
export default {
    methods: {
		zoomIn () {
			Vue.prototype.$wayfinder.zoomIn();
		},
        zoomOut () {
			Vue.prototype.$wayfinder.zoomOut();
		},
	}
}
</script>