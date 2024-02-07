import { useEffect } from "react";
import { useRef } from "react";

export const useUpdateEffect = (cb: () => void, dependencies: Array<any>) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      cb();
    }
  }, dependencies);
};
