import { useRef, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import * as THREE from 'three';

import state from '../store';

interface ICameraRigProps {
  children: ReactNode;
}

const CameraRig = ({ children }: ICameraRigProps) => {
  const group = useRef<THREE.Group>(null);
  const snap = useSnapshot(state);

  const getTargetPosition = (): [number, number, number] => {
    const isMobile = window.innerWidth <= 600;
    const isBreakpoint = window.innerWidth <= 1260;

    if (snap.intro) {
      if (isMobile) return [0, 0.2, 2.5];
      if (isBreakpoint) return [0, 0, 2];
    }
    return isMobile ? [0, 0, 2.5] : [0, 0, 2];
  };

  // Update camera position and model rotation on each frame
  useFrame((state, delta) => {
    const targetPosition = getTargetPosition();

    // Smooth camera position transition
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Smooth model rotation based on pointer movement
    if (group.current) {
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
