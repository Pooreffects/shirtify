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

  useFrame((_, delta) => {
    if (targetMaterial) {
      const targetColor = new THREE.Color(snap.color);
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
            debug
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={0.7}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && logoTexture && (
          <Decal
            position={[-0.02, -0.17, 0]}
            rotation={[0, 0, 0]}
            scale={[0.25, 0.1, 0.4]}
            map={logoTexture}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
