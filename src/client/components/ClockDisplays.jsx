import React, { useState, useEffect } from "react";

const clockDisplays = ({ zone }) => {
  const [time, setTime] = useState(
    new Date(new Date().toLocaleString("en-us", { timeZone: zone }))
  );
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hoursDisplay = {
    transform: `rotateZ(${hours * 30}deg)`,
  };
  const minutesDisplay = {
    transform: `rotateZ(${minutes * 6}deg)`,
  };
  const secondsDisplay = {
    transform: `rotateZ(${seconds * 6}deg)`,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date(new Date().toLocaleString("en-us", { timeZone: zone })));
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className={"clock"}>
      <div className={"secHand"} style={secondsDisplay} />
      <div className={"minHand"} style={minutesDisplay} />
      <div className={"hourHand"} style={hoursDisplay} />
      <span className="twelve">12</span>
      <span className="one">1</span>
      <span className="two">2</span>
      <span className="three">3</span>
      <span className="four">4</span>
      <span className="five">5</span>
      <span className="six">6</span>
      <span className="seven">7</span>
      <span className="eight">8</span>
      <span className="nine">9</span>
      <span className="ten">10</span>
      <span className="eleven">11</span>
    </div>
  );
};

export default clockDisplays;
