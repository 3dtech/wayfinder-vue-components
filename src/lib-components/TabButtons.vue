<template>
	<div class="tab-buttons">
		<div class="tab-button tab-map" :class="{active: (currentTab == 'map')}" v-show="mobile && !landscape" data-translation-element="map" @click="switchTab('map')"></div>
		<div class="tab-button tab-topics" :class="{active: (currentTab == 'groups' || currentTab == 'group-pois')}" data-translation-element="topics" @click="switchTab('groups')"></div>
		<div class="tab-button tab-az" :class="{active: currentTab == 'az'}" data-translation-element="az" @click="switchTab('az')"></div>
		<div class="tab-button tab-search" :class="{active: currentTab == 'search'}" data-translation-element="search" @click="switchTab('search')"></div>
	</div>
</template>

<script>
/* global WayfinderAPI wayfinder */
import { mapState } from 'vuex';

export default {
	name: 'Tabs',
	computed: {
		...mapState(['currentTab', 'searchVisible', 'mobile', 'landscape', 'shortcuts', 'language'])
	},
	data () {
		return {
			toilet: false,
			toiletsIcon: false
		}
	},
	methods: {
		switchTab (tab) {
			this.$emit('switchTab', tab);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../theme/variables';
.tab-buttons {
	display: flex;
	align-content: stretch;
	justify-content: space-between;

	.tab-button {
		background-size: auto 30%;
		background-repeat: no-repeat;
		background-color: @main-background;

		&.active, &:active {
			background-color: @tertiary-color;
		}
	}

	.tab-topics {
		background-image: url("data:image/svg+xml,%3Csvg width='50' height='33' viewBox='0 0 50 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.253906' y='0.746338' width='49.378' height='5.06879' fill='url(%23paint0_linear)'/%3E%3Crect x='0.253906' y='14.263' width='49.378' height='5.06879' fill='url(%23paint1_linear)'/%3E%3Crect x='0.253906' y='27.78' width='49.378' height='5.06879' fill='url(%23paint2_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='24.9429' y1='0.746338' x2='24.9429' y2='5.81513' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFDD65'/%3E%3Cstop offset='1' stop-color='%23FF9900'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='24.9429' y1='14.263' x2='24.9429' y2='19.3318' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFDD65'/%3E%3Cstop offset='1' stop-color='%23FF9900'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear' x1='24.9429' y1='27.78' x2='24.9429' y2='32.8488' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FFDD65'/%3E%3Cstop offset='1' stop-color='%23FF9900'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
	}

	.tab-az {
		background-image: url("data:image/svg+xml,%3Csvg width='48' height='33' viewBox='0 0 48 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='4.32889' cy='4.56804' rx='3.78299' ry='3.82171' fill='url(%23paint0_linear)'/%3E%3Cellipse cx='4.3284' cy='16.7976' rx='3.78299' ry='3.82171' fill='url(%23paint1_linear)'/%3E%3Cellipse cx='4.3284' cy='29.0271' rx='3.78299' ry='3.82171' fill='url(%23paint2_linear)'/%3E%3Crect x='10.3813' y='2.27499' width='37.0733' height='4.58605' fill='url(%23paint3_linear)'/%3E%3Crect x='10.3813' y='14.5045' width='37.0733' height='4.58605' fill='url(%23paint4_linear)'/%3E%3Crect x='10.3813' y='26.734' width='37.0733' height='4.58605' fill='url(%23paint5_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='4.32889' y1='0.746338' x2='4.32889' y2='8.38975' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='4.3284' y1='12.9759' x2='4.3284' y2='20.6193' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear' x1='4.3284' y1='25.2054' x2='4.3284' y2='32.8488' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint3_linear' x1='28.918' y1='2.27499' x2='28.918' y2='6.86104' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint4_linear' x1='28.918' y1='14.5045' x2='28.918' y2='19.0905' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint5_linear' x1='28.918' y1='26.734' x2='28.918' y2='31.32' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2399EFC4'/%3E%3Cstop offset='1' stop-color='%2328B586'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
	}

	.tab-search {
		background-image: url("data:image/svg+xml,%3Csvg width='38' height='38' viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.4163 24.9709C19.2339 24.9709 24.7607 19.4431 24.7607 12.624C24.7607 5.80493 19.2339 0.276855 12.4163 0.276855C5.59863 0.276855 0.0717773 5.80493 0.0717773 12.624C0.0717773 19.4431 5.59863 24.9709 12.4163 24.9709ZM12.4163 22.5017C17.8706 22.5017 22.292 18.0793 22.292 12.624C22.292 7.1687 17.8706 2.74634 12.4163 2.74634C6.96216 2.74634 2.54077 7.1687 2.54077 12.624C2.54077 18.0793 6.96216 22.5017 12.4163 22.5017Z' fill='url(%23paint0_linear)'/%3E%3Cpath d='M19.8228 23.5245L23.3143 20.0322L35.5347 32.2551C36.4989 33.2195 36.4989 34.7831 35.5347 35.7474C34.5706 36.7118 33.0073 36.7118 32.0432 35.7474L19.8228 23.5245Z' fill='url(%23paint1_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' x1='12.4163' y1='0.276855' x2='12.4163' y2='24.971' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23D67FFE'/%3E%3Cstop offset='1' stop-color='%23AC92F7'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='21.5685' y1='21.7783' x2='35.5376' y2='35.7445' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23D67FFE'/%3E%3Cstop offset='1' stop-color='%23AC92F7'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A");
	}

	.tab-map {
		// background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6b3NiPSJodHRwOi8vd3d3Lm9wZW5zd2F0Y2hib29rLm9yZy91cmkvMjAwOS9vc2IiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjMyIiB4Mj0iNDczLjc3IiB5MT0iNDQ5LjMzIiB5Mj0iNjUuODE0IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEuMTQzOCAwIDAgMS4xNDM4IC0zNi43NyAtMzYuODY4KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICA8c3RvcCBzdG9wLWNvbG9yPSIjODBkMGU5IiBvZmZzZXQ9IjAiLz4KICAgPHN0b3Agc3RvcC1jb2xvcj0iIzE5OWZmZiIgb2Zmc2V0PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KIDwvZGVmcz4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbCgkuc3Qwe2ZpbGw6IzIzMUYyMDt9Cl1dPjwvc3R5bGU+CiA8cGF0aCBjbGFzcz0ic3QwIiBkPSJtNTA0LjE2IDExOS4zOC0xMTkuNzYtODAuNDEzYy01LjI2MTctMy41NDU5LTExLjg5Ni0zLjU0NTktMTcuMjcyIDBsLTExMS4wNyA3NC41NzktMTExLjA3LTc0LjU3OWMtNS4yNjE3LTMuNTQ1OS0xMi4wMS0zLjU0NTktMTcuMjcyIDBsLTExOS43NiA4MC40MTNjLTUuMDMyOSAzLjMxNzItOC4xMjEzIDkuNDk0LTguMTIxMyAxNi4wMTR2MzIxLjQyYzAgNi43NDg3IDMuMjAyOCAxMi45MjYgOC40NjQ1IDE2LjM1NyA1LjI2MTcgMy4zMTcyIDExLjc4MiAzLjIwMjggMTYuOTI5LTAuMjI4NzdsMTExLjA3LTc0LjU3OSAxMTEuMDcgNzQuNTc5YzUuMzc2MSAzLjU0NTkgMTEuODk2IDMuNTQ1OSAxNy4yNzIgMGwxMTEuMTgtNzQuNTc5IDExMS4wNyA3NC41NzljMi42MzA4IDEuNzE1OCA1LjYwNDkgMi43NDUyIDguNTc4OSAyLjc0NTIgMi44NTk2IDAgNS43MTkyLTAuODAwNjkgOC4yMzU3LTIuNDAyMSA1LjI2MTctMy4zMTcyIDguNDY0NS05LjYwODMgOC40NjQ1LTE2LjM1N3YtMzIxLjQyYzAuMTE0MzgtNi42MzQzLTIuOTc0LTEyLjgxMS04LjAwNy0xNi4xMjh6bS0zODYuNTEgMjQ3Ljc2LTgxLjIxMyA1Ni41MDZ2LTI3Ni40N2w4MS4yMTMtNTYuNTA2em0zNi42MDMtMC40NTc1NHYtMjc2LjU4bDgzLjUwMSA1Ni4wNDl2Mjc2LjQ3em0xMjAuMSA1NS45MzQtMC4xMTQzOS0yNzYuNDcgODMuNTAxLTU2LjA0OSAwLjExNDM4IDI3Ni40N3ptMjAxLjMyIDAtODEuMjEzLTU1LjM2Mi0wLjExNDM4LTI3Ni43IDgxLjIxMyA1NS40Nzd2Mjc2LjU4eiIgZmlsbD0idXJsKCNhKSIgc3Ryb2tlLXdpZHRoPSIxLjE0MzgiLz4KPC9zdmc+Cg==");
		background-image: url('data:image/png;base64,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');
		background-size: auto 40%;
		background-position: 50% 1.85rem;
	}
}
</style>
