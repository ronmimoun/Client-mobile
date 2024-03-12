import { useEffect } from "react";

export const useScrollToBottom = () => {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToElementBottom = (
    containerRef: React.RefObject<HTMLDivElement>
  ) => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScrollToBottom();
  }, []);

  return {
    handleScrollToBottom,
    scrollToElementBottom,
  };
};
