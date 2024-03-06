<template>
  <label class="wf-translatable" :class="{'wf-translated': translated}">
    <slot v-if="value == ''"></slot>
    {{ value }}
  </label>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Translate",
  props: {
    k: {
      type: String,
      default: ""
    },
    params: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    ...mapState('wf', ['language']),
  },
  data () {
    return {
      translated: false,
      value: ""
    }
  },
  watch: {
    language () {
      console.log('trans.language')
      if (this.$wayfinder) {
        this.update();
      }
    },
    k () {
      console.log('trans.key')
      this.update();
    },
  },
  mounted () {
    console.log('trans.mounted')
    this.update();
  },
  methods: {
    update () {
      console.log('trans.updated', this.$wayfinder, this.k)
      if (this.$wayfinder && this.k && this.k.length > 0 && this.$wayfinder.translator.exists(this.k)) {
        console.log('trans.update', this.k, this.params, this.$wayfinder.translator.get(this.k, this.params))
        this.value = this.$wayfinder.translator.get(this.k, this.params);
      }
    } 
  }
}
</script>

<style>

</style>