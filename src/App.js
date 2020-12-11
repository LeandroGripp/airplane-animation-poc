import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import airplane from './airplane.png';

function App() {

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [angle, setAngle] = useState(0);

  const [baseSize] = useState(() => {
    let proposedWidth = window.innerWidth / 20;
    if (proposedWidth < 50) proposedWidth = 50;
    return proposedWidth;
  });
  const [size] = useState(() => {
    let proposedWidth = window.innerWidth / 20;
    if (proposedWidth < 50) proposedWidth = 50;
    return proposedWidth;
  });


  const [flying, setFlying] = useState(true);

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



      setFlying(true);

      setAngle(360 - newAngle);

      setPosX(x - size / 2);
      setPosY(y - size / 2);

    }

    window.addEventListener('click', onClick);

    return () => window.removeEventListener('click', onClick);
  }, [posX, posY, baseSize, size, flying]);

  return (
    <div className="App">
      <div className="plane-container" style={{
        position: 'absolute',
        left: posX,
        top: posY,
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'center',
        width: size,
        height: size
      }}>
        <img
          className={"plane" + (flying ? " flying" : "")}
          src={airplane}
          alt="airplane"
          width={size}
          height={size}
          onAnimationEnd={(e) => { setFlying(false) }}
        />
      </div>

    </div>
  );
}

export default App;
