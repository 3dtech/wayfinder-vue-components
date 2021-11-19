<template>
  <div class="wf-component wf-browser">
      <iframe :src="src"></iframe>
  </div>
</template>

<script>
export default {
    name: 'MapFloors',
	props: {
		src: {
			type: String,
			default: ""
		},
	},

}
</script>

<style>
    .wf-browser, .wf-browser iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
</style>