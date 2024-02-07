import { useEffect } from "react";

export const useScrollToBottom = () => {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleScrollToBottom();
  }, []);

  return handleScrollToBottom;
};
