<template>
  <div class="wf-route-chooser">
    <div>
        <WFDropDown @select="startSelected" :options="options" valueKey="key"/>
    </div>
    <div>
        <WFDropDown @select="endSelected" :options="options" valueKey="key"/>
    </div>
    <div>
        <div class="wf-checkbox wf-accessibility" @click="toggleAccessibility">
            <input type="checkbox" v-model="accessibilityRoutesOnly" @click.stop />
            <WFTranslate k="widget-route-chooser-accessibility">Show accessible routes only</WFTranslate>
        </div>
    </div>
    <div>
        <button @click="showPath" class="wf-button">
            <WFTranslate k="widget-route-chooser-show-path" :disabled="this.poiA == null || this.poiB == null">Show Route</WFTranslate>
        </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WFDropDown from './components/DropDown.vue';
import { WFTranslate } from '.';

export default {
    name: 'RouteChooser',
	components: {
		WFDropDown
	},
	computed: {
		...mapState('wf', ['languages', 'language', 'reset', 'pois']),
    },
    props: {
		showTitle: {
            type: Boolean,
			default: false
        }
    },
    data () {
		return {
			active: false,
            poiA: null,
            poiB: null,
            accessibilityRoutesOnly: false,
            options: [{
                key: 1,
                label: "No options"
            }]
		}
	},
    methods: {
		startSelected (option) {
            console.log('startSelected', option)
            this.poiA = option.raw;
        },
		endSelected (option) {
            console.log('endSelected', option)
            this.poiB = option.raw;
        },
        showPath () {
            if (this.poiA && this.poiB) {
                this.$emit('showPath', this.poiA, this.poiB);
            }
        },
        toggleAccessibility () {
            this.accessibilityRoutesOnly = !this.accessibilityRoutesOnly;
        }
    },
    watch: {
		pois: function () {
            console.log('pois', this.pois);
			if (this.pois && Array.isArray(this.pois)) {
                this.options = this.pois.map((p) => {
                    return {
                        key: p.id,
                        label: p.getName(this.language),
                        raw: p
                    }
                })
            }
		}
	},
};
</script>

<style scoped>

</style>
