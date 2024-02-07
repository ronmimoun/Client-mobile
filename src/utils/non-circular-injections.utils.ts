import { AppStore } from "../store";

export let store: AppStore;

export const injectStore = (_store: AppStore) => {
    store = _store
}