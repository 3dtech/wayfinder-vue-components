<template>
	<button class="wf-component wf-yah" @click="onClicked()">
		<i class="wf-icon" :style="{'background-image': yahLogo}"/>
		<label v-if="showLabel" data-translation-element="yah">YAH</label>
	</button>
</template>

<script>
/* global wayfinder */
import { mapState } from 'vuex';

export default {
	name: 'YAH',
	props: {
		showLabel: {
			type: Boolean,
			default: true
		},
	},
	computed: {//yahLogo
		...mapState('wf', ['yahLogo', 'language'])
	},
	methods: {
		onClicked () {
			this.$wayfinder.showKiosk();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.wf-yah {
		text-align: center;
		border: none;
		outline: none;
	}

	.wf-icon {
		width: 100%;
		height: 100%;
		display: block;
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: contain;
		background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOTQiIGhlaWdodD0iMTI4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogPG1ldGFkYXRhPgogIDxyZGY6UkRGPgogICA8Y2M6V29yayByZGY6YWJvdXQ9IiI+CiAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgIDxkYzp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiLz4KICAgIDxkYzp0aXRsZS8+CiAgIDwvY2M6V29yaz4KICA8L3JkZjpSREY+CiA8L21ldGFkYXRhPgogPHBhdGggZD0ibTQ2Ljk3NyAxMjYuNjRjLTAuMjgzMDMtMC42ODc1LTYuMTYzMS02LjQzNzctMTAuMzc0LTExLjY2My0yNC45NDctMzMuMTIyLTUyLjc2MS02My44OTgtMjAuMjgzLTEwMS4zIDE0LjM4MS0xMy44OTQgMzIuMTEzLTE0LjY4NiA1MC4zNDMtOC4yMTAxIDUxLjMzIDI5LjcwMiAxNC4xNjYgNzguMTU1LTEwLjIzNSAxMTAuMDFsLTkuNDUwMSAxMS4xNjN6bTE1LjQ0LTUwLjc3MWMzNC4yMzctMjQuNDg1IDcuNzY4LTcxLjYzMy0yOS44NDgtNTUuOTU5LTEwLjk4NCA1Ljg1NjktMTYuNDM0IDE2LjA0OC0xNi42MjUgMjguMDY4LTAuNTI0NSAxMS42OTMgNS42ODU0IDIxLjQ3MSAxNS41MjYgMjcuNDYxIDcuMDU1NSAzLjg0MDEgMTAuMTU3IDQuNTMzNyAxOC4xNDYgNC4wNTc3IDUuMTc3Ni0wLjMwODUyIDguMTYxMS0xLjE1MzggMTIuODAxLTMuNjI3MXoiIGZpbGw9IiNjNjQyNDIiIGZpbGwtb3BhY2l0eT0iLjk4ODI0Ii8+CiA8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguODc4MjkgMCAwIDEuMDUxOSAuNTU0NzQgLTYuOTk1MykiIGQ9Im00MS42ODIgODkuODkxYTUxLjIyMyA0MS43NTQgMCAxIDEgMS4yNzY2IDAuMjA4MDkiIGZpbGw9IiNjNjQyNDIiIGZpbGwtb3BhY2l0eT0iLjk4ODI0Ii8+CiA8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSguNjQ1MzUpIiBkPSJtNDMuNjMxIDY5LjEyOWEyNi4wMTEgMjAuOTkxIDAgMSAxIDAuNjQ4MjYgMC4xMDQ2MSIgZmlsbC1vcGFjaXR5PSIwIiBvcGFjaXR5PSIuMzQwMTYiLz4KIDxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKC42NDUzNSkiIGQ9Im0zMS44OTIgMTE0LjI4YTE2LjY1NiAxMS43NSAwIDEgMSAwLjQxNTExIDAuMDU4NiIgZmlsbC1vcGFjaXR5PSIwIi8+CiA8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguOTcwMiAwIDAgMS4wMjcyIC00LjA1ODggLTUuNzUwNCkiIGQ9Im00NS41MjEgODQuODI0YTM0LjQ1MyAzMy41NCAwIDEgMSAwLjg1ODY2IDAuMTY3MTYiIGZpbGw9IiNiNzJjMmMiLz4KIDxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KC42NDYzIDAgMCAuNjE2ODEgNS4xMjYxIDQuOTAxNCkiIGQ9Im01Ny4wNzkgMTA0LjYxYTM0LjIwMyAzNi42MjMgMCAxIDEgMC44NTI0NCAwLjE4MjUyIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo=");
	}
</style>
