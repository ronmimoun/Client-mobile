import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { globalActions } from "../store/global/global.actions";
import { useSelector } from "react-redux";
import { globalSelectors } from "../store/global/global.selectors";
import { userSelectors } from "../store/user/user.selectors";

export const useAppInitialization = () => {
  const isConfigLoaded = useSelector(globalSelectors.isConfigLoaded);
  const currentUser = useSelector(userSelectors.currentUser());
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isConfigLoaded || !currentUser) return;

    const initThunkAsync = async () => {
      await dispatch(globalActions.globalInitThunk());
    };

    dispatch(globalActions.setIsConfigLoaded(true));
    initThunkAsync();
  }, [isConfigLoaded, currentUser]);
};
