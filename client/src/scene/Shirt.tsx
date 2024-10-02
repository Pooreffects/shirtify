import { useMemo } from 'react';
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/drape.glb');

  // Memoized node and material references
  const objectNode = useMemo(() => nodes.Object_39, [nodes]);

  // Target a specific material, e.g., Material5612
  const targetMaterial = useMemo(
    () => materials.Material5612 as THREE.MeshStandardMaterial,
    [materials]
  );

  // Load textures for decals
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Animate material color changes based on state
  useFrame((_, delta) => {
    if (targetMaterial) {
      const targetColor = new THREE.Color(snap.color); // Ensure snap.color is a valid color format
      easing.dampC(targetMaterial.color, targetColor, 0.25, delta);
    }
  });

  return (
    <group position={[0, 0, 0]} rotation={[-1.2, 0, 0]} scale={1.3}>
      <mesh
        castShadow
        geometry={objectNode.geometry}
        material={targetMaterial || objectNode.material}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
