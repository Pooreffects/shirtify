import { useRef, ReactNode, useEffect, useState } from 'react';
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

  // Store screen width in state and update on resize
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isBreakpoint, setIsBreakpoint] = useState(window.innerWidth <= 1460);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      setIsBreakpoint(window.innerWidth <= 1260);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getTargetPosition = (): [number, number, number] => {
    if (snap.intro) {
      if (isMobile) return [0, -5, 0]; // Ensure Y-axis is 0 to face the hoodie
      if (isBreakpoint) return [0, -5, 0]; // Slightly above for larger screens
    }
    return isMobile ? [0, 0, 2.5] : [0, 0.1, 2.5]; // Keep it at eye level
  };

  useFrame((state, delta) => {
    const targetPosition = getTargetPosition();

    // Smoothly adjust the camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Smoothly rotate the model based on pointer position
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
