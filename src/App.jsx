import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
// OrbitControls permet de contrôler la caméra avec la souris
import './App.css';

function Box() {
  const [isHover, setIsHover] = useState(false);

  const handleOver = () => {
    setIsHover(!isHover);
  };

  return (
    <mesh onPointerOver={handleOver}>
      <boxGeometry args={[4, 3, 1]} />
      <meshStandardMaterial color={isHover ? "white" : "yellow"} />
    </mesh>
  );
}

function Model({ url }) {
  const group = useRef();
  const { scene, materials } = useGLTF(url);

  useEffect(() => {
    if (materials) {
      Object.values(materials).forEach(material => {
        material.metalness = 1;
        material.roughness = 0.5;
      });
    }
  }, [materials]);

  return <primitive ref={group} object={scene} />;
}

function App() {
  return (
    <Canvas style={{ width: '100%', height: '100vh' }} className='my-canvas'>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Model url="/models/scene.gltf" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default App;

// Box : est un composant qui retourne une boîte 3D
// mesh : un objet de la scène 3D qui peut avoir une géométrie et un matériau
// <boxGeometry args={[2, 1, 0.1]} />: Crée une géométrie de boîte avec les dimensions spécifiées (largeur, hauteur, profondeur).
// <meshStandardMaterial color="red" />: Applique un matériau standard avec une couleur rouge à la géométrie
