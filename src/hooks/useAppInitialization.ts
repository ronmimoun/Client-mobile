import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { globalActions } from "../store/global/global.actions";
import { useSelector } from "react-redux";
import { globalSelectors } from "../store/global/global.selectors";

export const useAppInitialization = () => {
  const isConfigLoaded = useSelector(globalSelectors.isConfigLoaded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isConfigLoaded) return;

    const initThunkAsync = async () => {
      await dispatch(globalActions.globalInitThunk());
    };

    dispatch(globalActions.setIsConfigLoaded(true));
    initThunkAsync();
  }, [isConfigLoaded]);
};
