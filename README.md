# wayfinder-vue-components
WF_MAP_TYPE = "2d"; // "3d"
Vue.prototype.$WF_MAP_TYPE = WF_MAP_TYPE;
new Vue({
    store,
    render: h => h(Dev),
    created () {
        Vue.use(WayfinderVueComponents, this.$store) // Create it by passing in the store you want to use
    }
}).$mount('#app')