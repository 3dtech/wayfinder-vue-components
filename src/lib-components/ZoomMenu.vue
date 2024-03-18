<template>
    <div class="wf-component wf-zoommenu">
        <div class="wf-item wf-zoom-in" @mousedown="start(1)" @mouseleave="stop()" @mouseup="stop()">+</div>
        <div class="wf-item wf-zoom-out" @mousedown="start(-1)" @mouseleave="stop()" @mouseup="stop()">-</div>
    </div>
</template>
<script>
let timer = null;
export default {
    data: () => ({
		direction: 0,
        zooming: false
	}),
    methods: {
		start (dir) {
            this.direction = dir;
            this.zooming = true;
            this.zoom();
		},
        stop () {
			this.direction = 0;
            this.zooming = false;
            clearTimeout(timer);
		},
        zoom () {
            if(this.direction > 0) {
                this.$wayfinder.zoomIn();
            }
            else {
                this.$wayfinder.zoomOut();
            }
            if (this.zooming) {
                timer = setTimeout(() => {
                    this.zoom();
                }, 50)
            } 
        }
	}
}
</script>