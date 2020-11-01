/* eslint-disable consistent-return */
import { useEffect, useRef } from "react";

export default (callback, delay) => {
  const savedCallBack = useRef();
  useEffect(() => {
    savedCallBack.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallBack.current();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
};
