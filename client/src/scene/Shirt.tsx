import { useMemo } from 'react';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
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

  // Target the specific material, e.g., Material5612
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

      // If it's full texture, set it as the material's map
      if (snap.isFullTexture && fullTexture) {
        targetMaterial.map = fullTexture; // Apply the full texture map
        targetMaterial.needsUpdate = true; // Ensure the material updates
      } else {
        targetMaterial.map = null; // Reset if not using full texture
        targetMaterial.needsUpdate = true;
      }
    }
  });

  return (
    <group position={[0, 0, 0]} rotation={[-1.2, 0, 0]} scale={1.3}>
      <mesh
        castShadow
        geometry={objectNode.geometry}
        material={targetMaterial || objectNode.material}
      >
        {/* Conditionally render the logo decal */}
        {snap.isLogoTexture && logoTexture && !snap.isFullTexture && (
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
