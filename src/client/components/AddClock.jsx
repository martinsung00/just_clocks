import React, { useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { BsPlus } from "react-icons/bs";

const AddClock = ({ x = 0, y = 0, rotation = 0, scale = 1, time = 150 }) => {
  const [isClicked, setIsClicked] = useState(false);
  const trigger = () => {
    setIsClicked(true);
  };

  const style = useSpring({
    display: "inline-block",
    width: "30%",
    height: "30%",
    leftMargin: "34.5%",
    topMargin: "50%",
    backfaceVisibility: "hidden",
    transform: isClicked
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    config: {
      tension: 200,
      friction: 10,
    },
  });

  useEffect(() => {
    if (!isClicked) return;

    const timeoutId = window.setTimeout(() => {
      setIsClicked(false);
    }, time);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isClicked, time]);

  return (
    <animated.span onMouseEnter={trigger} style={style}>
      <BsPlus />
    </animated.span>
  );
};

export default AddClock;
