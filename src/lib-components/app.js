import store from './store';
let wfStore;
export default {
    init (_store) {
        _store.registerModule('wayfinder', store);
        wfStore = _store;
    },
    loadPages () {
        wfStore.dispatch('wayfinder/LOAD_PAGES');
    }
}