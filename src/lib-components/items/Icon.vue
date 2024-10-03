<template>
    <svg class="wf-icon" :class='["wf-icon-"+ this.name]' viewbox="0 0 32 32">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
//import Icons from '../assets/icons.svg';
export default {
    props: ["name", "width", "height"],
    computed: {
		iconName () {
            return "#icon-" + this.name;
        }
    }
}
</script>
<style scoped>
    svg {
        min-height: 1rem;
        width: auto;
        display: inline-block;
    }
</style>