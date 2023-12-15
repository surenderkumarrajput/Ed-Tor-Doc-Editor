import { useEffect, useState } from "react";

type PropType = {
  threshold: number;
};

function useScrollTop({ threshold = 10 }: PropType) {
  const [isScrolled, setisScrolled] = useState(false);
  const HandleScroll = () => {
    setisScrolled(window.scrollY > threshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", HandleScroll);
    return () => {
      window.removeEventListener("scroll", HandleScroll);
    };
  }, [threshold]);
  return isScrolled;
}

export default useScrollTop;
