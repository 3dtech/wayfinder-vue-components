<template>
  <div class="wf-clock">
    <div><span class="wf-clock-hours">{{ hours }}</span><span class="wf-clock-sp">:</span><span class="wf-clock-minutes">{{ minutes }}</span></div>
  </div>
</template>

<script>
export default {
    name: "Clock",
    data() {
        return {
            time: new Date()
        }
    },
    mounted() {
        setTimeout(this.addTime, 500);
    },
    computed: {
        hours() {
            return (this.time.getHours() < 10 ? "0" : "") + this.time.getHours() 
        },
        minutes() {
            return (this.time.getMinutes() < 10 ? "0" : "") + this.time.getMinutes()
        },
        seconds() {
            return (this.time.getSeconds() < 10 ? "0" : "") + this.time.getSeconds()
        },
    },
    methods: {
        addTime() {
            this.time = new Date()
            setTimeout(this.addTime, 500);
        }
    }
}
</script>

<style>

</style>