import store from './store';

export default {
    init (_store) {
        console.log('init', _store, store)
        _store.registerModule('wayfinder', store)
    },
    loadPages () {
        console.log('loadPages')
    }
}