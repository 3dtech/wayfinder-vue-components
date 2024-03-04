import store from './store';

let wfStore;
export default {
    init (_store) {
        _store.registerModule('wf', store);
        wfStore = _store;
    },
    loadPages () {
        wfStore.dispatch('wf/LOAD_PAGES');
    }
}