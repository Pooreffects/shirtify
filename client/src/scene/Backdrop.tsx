import { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef(null);

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={80} // Slightly more frames for smoother shadows
      alphaTest={0.9} // Higher threshold for more shadow detail
      position={[0, 4, -2]} // Adjusted position for better shadow angle
      scale={40} // Larger scale for a bigger shadow area
      rotation={[Math.PI / 2, 0, 0]} // Same rotation for ground-level shadows
    >
      {/* Main light for strong directional lighting */}
      <RandomizedLight
        castShadow
        amount={3} // Increased light sources for more variation
        radius={8}
        intensity={1.5} // Slightly reduced intensity for softer lighting
        ambient={0.8} // Lower ambient for more contrast
        position={[4, 6, 2]} // Off-center position for natural lighting
      />

      {/* Fill light for softer, indirect lighting */}
      <RandomizedLight
        castShadow
        amount={2}
        radius={6}
        intensity={0.8} // Reduced intensity for fill light
        ambient={0.6}
        position={[-4, 5, -3]} // Opposite side for balance
      />

      {/* Rim light for subtle backlighting effect */}
      <RandomizedLight
        castShadow
        amount={1}
        radius={4}
        intensity={0.4} // Low intensity for rim light
        ambient={0.4}
        position={[2, 3, -5]} // Behind and above to create subtle rim effect
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
