<template>
	<div class="wf-component wf-building-select" v-show="!(hideWhenSingleBuilding && buildingOptions.length <= 1)">
		<WFDropDown
			:options="buildingOptions"
			:value="selectedBuildingId"
			:placeholder="placeholder"
			:min-search-chars="minSearchChars"
			:debounce-ms="debounceMs"
			:no-results-text="noResultsText"
			valueKey="id"
			@select="changeBuilding"
			@clear="clearBuilding"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import WFDropDown from './components/DropDown.vue';

export default {
	name: 'BuildingSelect',
	components: {
		WFDropDown
	},
	props: {
		placeholder: {
			type: String,
			default: 'Select building'
		},
		minSearchChars: {
			type: Number,
			default: 0
		},
		debounceMs: {
			type: Number,
			default: 200
		},
		noResultsText: {
			type: String,
			default: 'No buildings found'
		},
		hideWhenSingleBuilding: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		...mapState('wf', ['buildings', 'building', 'currentBuilding', 'language']),
		buildingOptions () {
			return this.normalizedBuildings.map((building) => {
				return {
					id: this.getBuildingId(building),
					label: this.getBuildingName(building),
					raw: building
				};
			}).filter((option) => {
				return option.id !== null && option.id !== undefined && option.label;
			});
		},
		normalizedBuildings () {
			if (Array.isArray(this.buildings)) {
				return this.buildings;
			}

			if (this.buildings && typeof this.buildings === 'object') {
				return Object.keys(this.buildings).map((key) => {
					const building = this.buildings[key];

					if (building && typeof building === 'object' && building.id === undefined) {
						return Object.assign({ id: key }, building);
					}

					return building;
				});
			}

			return [];
		},
		selectedBuilding () {
			return this.building || this.currentBuilding;
		},
		selectedBuildingId () {
			return this.selectedBuilding ? this.getBuildingId(this.selectedBuilding) : null;
		},
		hasClickedListener () {
			return !!(this.$listeners && this.$listeners.clicked);
		}
	},
	methods: {
		changeBuilding (option) {
			const building = option.raw || option;

			this.$emit('selected', building);
			this.$emit('select', building);

			if (this.hasClickedListener) {
				this.$emit('clicked', building);
				return;
			}

			this.showBuilding(building);
		},
		clearBuilding () {
			this.$emit('clear');
		},
		showBuilding (building) {
			if (!this.$wayfinder || !building) {
				return;
			}

			this.$wayfinder.setCurrentBuilding(building.id);
		},
		getLiveBuilding (building) {
			const id = this.getBuildingId(building);

			if (!this.$wayfinder || typeof this.$wayfinder.getBuildings !== 'function') {
				return building;
			}

			const buildings = this.$wayfinder.getBuildings();

			if (Array.isArray(buildings)) {
				return buildings.find((item) => this.getBuildingId(item) == id) || building;
			}

			if (buildings && typeof buildings === 'object') {
				return buildings[id] || building;
			}

			return building;
		},
		getBuildingId (building) {
			if (!building || typeof building !== 'object') {
				return building;
			}

			return building.id !== undefined ? building.id : building.key;
		},
		getBuildingName (building) {
			if (!building || typeof building !== 'object') {
				return building == null ? '' : String(building);
			}

			if (typeof building.getName === 'function') {
				return building.getName(this.language) || building.name || '';
			}

			if (building.names && this.language && building.names[this.language]) {
				return building.names[this.language];
			}

			if (building.name) {
				return building.name;
			}

			return String(this.getBuildingId(building) || '');
		}
	}
};
</script>

<style scoped>
.wf-building-select {
	width: 100%;
}
</style>
