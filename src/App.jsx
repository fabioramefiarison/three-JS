import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import './App.css';

function Box() {
  return (
    <mesh>
      <boxGeometry args={[2, 1, 0.1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

function App() {
  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
