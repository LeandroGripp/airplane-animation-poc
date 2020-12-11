import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import airplane from './airplane.png';

function App() {

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [angle, setAngle] = useState(0);

  const [baseSize] = useState(70);
  const [size, setSize] = useState(70);

  const [goingUp, setGoingUp] = useState(true);

  const animating = useRef(false);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onClick(e) {
      const x = e.clientX;
      const y = e.clientY;

      let newAngle = (180 / Math.PI) * (Math.atan2(posY - y, x - posX));
      console.log(`posY: ${posY} y: ${y} posX: ${posX} x: ${x}`)
      console.log(newAngle);
      newAngle -= 90;
      if (newAngle < 0) {
        newAngle += 360;
      }

      animating.current = true;
      target.current = { x: x - size / 2, y: y - size / 2 }

      setSize(2 * baseSize);
      setPosX(posX + (x - posX) / 2 - size);
      setPosY(posY + (y - posY) / 2 - size);
      setAngle(360 - newAngle);
      setGoingUp(false);
    }

    window.addEventListener('click', onClick);

    return () => window.removeEventListener('click', onClick);
  }, [posX, posY, baseSize, size]);

  function animate() {
    if (animating.current) {
      animating.current = false;
      setSize(baseSize);
      setPosX(target.current.x);
      setPosY(target.current.y);
      setGoingUp(true);
    }
  }

  return (
    <div className="App">
      <div width={size} height={size}>
        <img
          className={goingUp ? "airplane-going-up" : "airplane-going-down"}
          src={airplane}
          alt="airplane"
          width={size}
          height={size}
          style={{
            position: 'absolute',
            left: posX,
            top: posY,
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'center',
          }}
          onTransitionEnd={animate}
        />
      </div>

    </div>
  );
}

export default App;
