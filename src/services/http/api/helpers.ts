import store from "../../../store";
import { globalActions } from "../../../store/global/global.actions";
import { RequestLoaderOptions } from "../../../types/request/RequestOptions";

export const handleLoader = (
  loaderOptions?: RequestLoaderOptions,
  isIncrement: boolean = true
) => {
  if (loaderOptions?.ignore) return;

  if (isIncrement) {
    store.dispatch(globalActions.incrementLoaderCount());
  } else {
    store.dispatch(globalActions.decrementLoaderCount());
  }
};
