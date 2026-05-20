<template>
	<div class="wf-component wf-dropdown" ref="root">
		<div class="wf-dropdown-input">
			<input
				ref="input"
				:value="query"
				:placeholder="placeholder"
				@focus="openDropdown"
				@input="onInput"
				@keydown.esc="closeDropdown"
			/>
			<button type="button" class="wf-dropdown-trigger" @click.stop="onTriggerClick">
				<WFIcon :name="currentIconName"></WFIcon>
			</button>
		</div>
		<div v-if="isOpen" class="wf-dropdown-menu">
			<ul v-if="filteredOptions.length" class="wf-dropdown-list">
				<li
					v-for="option in filteredOptions"
					:key="option.key"
					class="wf-dropdown-item"
					:class="{ 'wf-disabled': option.disabled }"
					@mousedown.prevent="selectOption(option)"
				>
					{{ option.label }}
				</li>
			</ul>
			<div v-else-if="shouldShowNoResults" class="wf-dropdown-empty">
				{{ noResultsText }}
			</div>
		</div>
	</div>
</template>

<script>
import WFIcon from '../items/Icon.vue';

export default {
	name: 'DropDown',
	components: {
		WFIcon
	},
	props: {
		options: {
			type: Array,
			default: () => []
		},
		value: {
			default: null
		},
		placeholder: {
			type: String,
			default: 'Select option'
		},
		minSearchChars: {
			type: Number,
			default: 2
		},
		debounceMs: {
			type: Number,
			default: 200
		},
		labelKey: {
			type: String,
			default: 'label'
		},
		valueKey: {
			type: String,
			default: 'value'
		},
		disabledKey: {
			type: String,
			default: 'disabled'
		},
		noResultsText: {
			type: String,
			default: 'No results'
		},
		clearSearchOnSelect: {
			type: Boolean,
			default: false
		},
		dropdownIcon: {
			type: String,
			default: 'arrow-down'
		},
		clearIcon: {
			type: String,
			default: 'clear'
		}
	},
	data () {
		return {
			isOpen: false,
			query: '',
			deferredQuery: '',
			debounceTimer: null,
			internalSelectedOption: null
		};
	},
	computed: {
		normalizedOptions () {
			return this.options.map((option, index) => {
				if (option !== null && typeof option === 'object' && !Array.isArray(option)) {
					const label = option[this.labelKey];
					const value = Object.prototype.hasOwnProperty.call(option, this.valueKey) ? option[this.valueKey] : option;
					return {
						key: `${index}-${String(value)}`,
						label: label == null ? '' : String(label),
						value,
						raw: option,
						disabled: Boolean(option[this.disabledKey])
					};
				}

				return {
					key: `${index}-${String(option)}`,
					label: option == null ? '' : String(option),
					value: option,
					raw: option,
					disabled: false
				};
			});
		},
		filteredOptions () {
			const normalizedQuery = this.deferredQuery.trim().toLowerCase();

			if (!normalizedQuery.length) {
				return this.normalizedOptions;
			}

			if (normalizedQuery.length < this.safeMinSearchChars) {
				return [];
			}

			return this.normalizedOptions.filter((option) => {
				console.log('normalizedOptions', option.label, option.label.toLowerCase().indexOf(normalizedQuery), normalizedQuery)
				return option.label.toLowerCase().indexOf(normalizedQuery) !== -1;
			});
		},
		selectedOption () {
			return this.normalizedOptions.find((option) => this.isSameValue(option.value, this.value)) || null;
		},
		effectiveSelectedOption () {
			return this.selectedOption || this.internalSelectedOption;
		},
		hasSelection () {
			return !!this.effectiveSelectedOption;
		},
		currentIconName () {
			return this.hasSelection ? this.clearIcon : this.dropdownIcon;
		},
		shouldShowNoResults () {
			if (!this.query.trim().length) {
				return false;
			}

			return this.deferredQuery.trim().length >= this.safeMinSearchChars;
		},
		safeMinSearchChars () {
			return Math.max(0, this.minSearchChars);
		}
	},
	watch: {
		value: {
			immediate: true,
			handler () {
				this.syncQueryWithValue();
			}
		},
		options() {
			this.syncQueryWithValue();
		}
	},
	mounted () {
		document.addEventListener('click', this.onDocumentClick);
	},
	beforeDestroy () {
		document.removeEventListener('click', this.onDocumentClick);
		this.clearDebounceTimer();
	},
	methods: {
		onInput (event) {
			this.query = event.target.value;
			this.isOpen = true;
			this.deferQueryUpdate();
		},
		deferQueryUpdate () {
			this.clearDebounceTimer();
			this.debounceTimer = window.setTimeout(() => {
				this.deferredQuery = this.query;
			}, this.debounceMs);
		},
		clearDebounceTimer () {
			if (this.debounceTimer) {
				clearTimeout(this.debounceTimer);
				this.debounceTimer = null;
			}
		},
		onTriggerClick () {
			if (this.hasSelection) {
				this.clearSelection();
				return;
			}

			if (this.isOpen) {
				this.closeDropdown();
			}
			else {
				this.openDropdown();
				if (this.$refs.input) {
					this.$refs.input.focus();
				}
			}
		},
		openDropdown () {
			this.isOpen = true;
			this.deferredQuery = '';
		},
		closeDropdown () {
			this.isOpen = false;
			this.syncQueryWithValue();
		},
		selectOption (option) {
			if (option.disabled) {
				return;
			}

			this.internalSelectedOption = option;
			this.$emit('input', option.value);
			this.$emit('select', option.raw);
			this.$emit('selected', option.raw);

			if (this.clearSearchOnSelect) {
				this.query = '';
				this.deferredQuery = '';
			}
			else {
				this.query = option.label;
				this.deferredQuery = option.label;
			}

			this.isOpen = false;
		},
		clearSelection () {
			this.internalSelectedOption = null;
			this.query = '';
			this.deferredQuery = '';
			this.isOpen = false;
			this.$emit('input', null);
			this.$emit('clear');
		},
		syncQueryWithValue () {
			if (this.isOpen && this.query !== '') {
				return;
			}

			const selectedOption = this.effectiveSelectedOption;
			const nextQuery = selectedOption ? selectedOption.label : '';
			this.query = nextQuery;
			this.deferredQuery = nextQuery;
		},
		onDocumentClick (event) {
			if (!this.$refs.root || this.$refs.root.contains(event.target)) {
				return;
			}

			this.closeDropdown();
		},
		isSameValue (left, right) {
			return left === right;
		}
	}
};
</script>

<style scoped>
	.wf-dropdown {
		position: relative;
		width: 100%;
	}

	.wf-dropdown-input input {
		box-sizing: border-box;
		width: 100%;
		padding: 0.75rem 3rem 0.75rem 1rem;
		border: 1px solid #c7ccd4;
		border-radius: 0.375rem;
		outline: none;
	}

	.wf-dropdown-trigger {
		position: absolute;
		top: 50%;
		right: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		transform: translateY(-50%);
	}

	.wf-dropdown-trigger .wf-icon {
		width: 1rem;
		height: 1rem;
	}

	.wf-dropdown-menu {
		position: absolute;
		top: calc(100% + 0.25rem);
		left: 0;
		right: 0;
		z-index: 10;
		max-height: 16rem;
		overflow-y: auto;
		background: #fff;
		border: 1px solid #c7ccd4;
		border-radius: 0.375rem;
		box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.12);
	}

	.wf-dropdown-list {
		margin: 0;
		padding: 0.25rem 0;
		list-style: none;
	}

	.wf-dropdown-item {
		padding: 0.75rem 1rem;
		cursor: pointer;
	}

	.wf-dropdown-item:hover {
		background: #f2f5f8;
	}

	.wf-dropdown-empty {
		padding: 0.75rem 1rem;
		color: #667085;
	}

	.wf-disabled {
		cursor: default;
		opacity: 0.5;
	}
</style>
