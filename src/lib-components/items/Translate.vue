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
      if (this.$wayfinder) {
        this.update();
      }
    },
    k () {
      this.update();
    },
    params () {
      this.update();
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.update();
    });    
  },
  methods: {
    update () {
      if (this.$wayfinder && this.k && this.k.length > 0 && this.$wayfinder.translator.exists(this.k)) {
        this.value = this.$wayfinder.translator.get(this.k, this.params);
        this.translated = true;
      }
    } 
  }
}
</script>

<style>

</style>