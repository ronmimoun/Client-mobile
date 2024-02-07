import { useSelector } from "react-redux";
import { globalSelectors } from "../../../store/global/global.selectors";
import { Preloader } from "../../ui/Preloader/Preloader";

export const GlobalLoader = () => {
  const isLoading = useSelector(globalSelectors.isLoading);

  return isLoading ? <Preloader /> : <></>;
};
