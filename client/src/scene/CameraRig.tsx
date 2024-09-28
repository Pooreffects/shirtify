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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine the target position for the camera
  const getTargetPosition = (): [number, number, number] => {
    if (snap.intro) {
      return [0, 0, 5]; // Fixed position when intro is true
    }

    // Adjust target position based on mobile/breakpoint states
    if (isMobile) {
      return [0, 0, 5]; // Keep it close for mobile
    }
    if (isBreakpoint) {
      return [0, 0, 7]; // Further away for larger screens
    }
    return [0, 0, 10]; // Default position for larger screens
  };

  // Helper for easing camera position
  const easeCameraPosition = (camera: THREE.Camera, delta: number) => {
    const targetPosition = getTargetPosition();
    easing.damp3(camera.position, targetPosition, 0.25, delta);
  };

  // Float effect when intro is true
  const floatModel = () => {
    if (group.current) {
      const time = performance.now() * 0.001; // Get elapsed time
      const floatAmount = Math.sin(time) * 0.05; // Calculate floating effect
      group.current.position.y = floatAmount; // Apply floating effect
    }
  };

  // Simplified dynamic focus effect based on mouse position
  const applyDynamicFocus = (pointer: { x: number; y: number }) => {
    if (group.current) {
      // Adjust model rotation to follow pointer
      const rotationX = (-pointer.y * Math.PI) / 10; // Y-axis rotation based on pointer Y position
      const rotationY = (-pointer.x * Math.PI) / 10; // X-axis rotation based on pointer X position

      // Correct rotation direction
      group.current.rotation.set(rotationX, -rotationY, 0); // Set the rotation of the group
    }
  };

  useFrame((state, delta) => {
    easeCameraPosition(state.camera, delta); // Always ease camera position
    if (snap.intro) {
      floatModel(); // Float effect when intro is true
    } else {
      applyDynamicFocus(state.pointer); // Apply dynamic focus effect when intro is false
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
