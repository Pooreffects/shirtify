import { useEffect } from 'react';
import { useGLTF, Decal, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF(
    '/hoodie.glb',
    'https://www.gstatic.com/draco/v1/decoders/'
  );

  useEffect(() => {
    const hoodieMaterial = materials.Hoodie as THREE.MeshStandardMaterial;

    if (hoodieMaterial) {
      // Remove all texture maps
      hoodieMaterial.map = null;
      hoodieMaterial.alphaMap = null;
      hoodieMaterial.emissiveMap = null;
      hoodieMaterial.metalness = 0;
      hoodieMaterial.roughness = 1;
      hoodieMaterial.needsUpdate = true;
    }
  }, [materials]);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    const hoodieMaterial = materials.Hoodie as THREE.MeshStandardMaterial;
    if (hoodieMaterial) {
      easing.dampC(hoodieMaterial.color, snap.color, 0.25, delta);
    }
  });

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.defaultMaterial.geometry}
        material={materials.Hoodie}
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
