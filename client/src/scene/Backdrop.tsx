import { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef(null);
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      position={[0, 3, -1]}
      scale={30}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <RandomizedLight
        castShadow
        amount={2}
        radius={9}
        intensity={2}
        ambient={1}
        position={[0, 3, 1]}
      />
      <RandomizedLight
        castShadow
        amount={1}
        radius={5}
        intensity={0.6}
        ambient={0.5}
        position={[5, 5, 5]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
