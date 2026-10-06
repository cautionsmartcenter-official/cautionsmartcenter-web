import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface ThreeCarCanvasProps {
  vehicleId: string;
  accentColor: string;
  autoRotate: boolean;
  filmType: string;
  onAngleChange?: (angle: number) => void;
}

export const ThreeCarCanvas: React.FC<ThreeCarCanvasProps> = ({
  vehicleId,
  accentColor,
  autoRotate,
  onAngleChange,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Interaction refs (smooth 60fps)
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });
  const rotVelocity = useRef({ x: 0, y: 0, z: 0 });
  const targetRotation = useRef({ x: 0.15, y: 0.75, z: 0 });
  const currentRotation = useRef({ x: 0.15, y: 0.75, z: 0 });
  const targetZoom = useRef(5.4);
  const currentZoom = useRef(5.4);

  // Car mesh references to update paint dynamically without reload
  const carBodyMeshes = useRef<THREE.Mesh[]>([]);
  const carCaliperMeshes = useRef<THREE.Mesh[]>([]);

  // Update car paint materials on vehicleId / accentColor change
  useEffect(() => {
    let bodyColor = new THREE.Color(0xc89758); // Rose Gold (Maybach)
    let roughness = 0.08;
    let metalness = 0.92;
    let clearcoat = 1.0;
    let clearcoatRoughness = 0.03;

    if (vehicleId === 'lamborghini-viola') {
      bodyColor = new THREE.Color(0x7311d4); // Viola Pasifae Metallic
      roughness = 0.09;
      metalness = 0.96;
      clearcoat = 1.0;
      clearcoatRoughness = 0.03;
    } else if (vehicleId === 'bmw-x7-matte') {
      bodyColor = new THREE.Color(0x566270); // Frozen Pure Grey Satin Matte
      roughness = 0.42;
      metalness = 0.65;
      clearcoat = 0.22;
      clearcoatRoughness = 0.35;
    }

    carBodyMeshes.current.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
        mesh.material.color = bodyColor;
        mesh.material.roughness = roughness;
        mesh.material.metalness = metalness;
        mesh.material.clearcoat = clearcoat;
        mesh.material.clearcoatRoughness = clearcoatRoughness;
        mesh.material.needsUpdate = true;
      }
    });

    const caliperColor = new THREE.Color(accentColor);
    carCaliperMeshes.current.forEach((mesh) => {
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.color = caliperColor;
        mesh.material.needsUpdate = true;
      }
    });
  }, [vehicleId, accentColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.35, currentZoom.current);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting (Tailored for high-gloss PPS reflections)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Studio Light (Front Upper)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(6, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.00015;
    scene.add(keyLight);

    // Dynamic Accent Rim Light (Back Left)
    const rimLight = new THREE.DirectionalLight(new THREE.Color(accentColor), 4.2);
    rimLight.position.set(-7, 6, -7);
    scene.add(rimLight);

    // Soft Studio Fill Light
    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 2.0);
    fillLight.position.set(0, -1, 7);
    scene.add(fillLight);

    // Top Overhead Softbox Ring Light
    const overheadLight = new THREE.PointLight(0xffffff, 3.0, 20);
    overheadLight.position.set(0, 6, 0);
    scene.add(overheadLight);

    // 5. Studio Floor with Mirror Grid & Vignette
    const floorGroup = new THREE.Group();

    // Dark circular podium
    const podiumGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.12, 64);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x08090d,
      roughness: 0.2,
      metalness: 0.8,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -0.06;
    podium.receiveShadow = true;
    floorGroup.add(podium);

    // Glowing PPS Edge Ring
    const ringGeo = new THREE.RingGeometry(4.15, 4.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.002;
    floorGroup.add(ring);

    // Floor Radar Distance Guides
    [1.8, 2.8, 3.8].forEach((r) => {
      const guideGeo = new THREE.RingGeometry(r - 0.012, r + 0.012, 64);
      const guideMat = new THREE.MeshBasicMaterial({
        color: 0x334155,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const guideRing = new THREE.Mesh(guideGeo, guideMat);
      guideRing.rotation.x = -Math.PI / 2;
      guideRing.position.y = 0.001;
      floorGroup.add(guideRing);
    });

    scene.add(floorGroup);

    // 6. Car Pivot Group (Rotates only when user drags, background stays fixed!)
    const carPivot = new THREE.Group();
    carPivot.position.y = 0.0;
    scene.add(carPivot);

    // 7. Load Real 3D Supercar Model with Draco Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    carBodyMeshes.current = [];
    carCaliperMeshes.current = [];

    // Model path per vehicle
    let modelPath = '/models/maybach.glb';
    if (vehicleId === 'lamborghini-viola') {
      modelPath = '/models/lamborghini.glb';
    } else if (vehicleId === 'bmw-x7-matte') {
      modelPath = '/models/bmw_x7.glb';
    }

    gltfLoader.load(
      modelPath,
      (gltf) => {
        const carModel = gltf.scene;

        // Determine colors based on vehicleId
        let bodyColor = new THREE.Color(0xc89758); // Rose Gold (Maybach)
        let roughness = 0.08;
        let metalness = 0.92;
        let clearcoat = 1.0;
        let clearcoatRoughness = 0.03;

        if (vehicleId === 'lamborghini-viola') {
          bodyColor = new THREE.Color(0x7311d4); // Viola Pasifae Metallic
          roughness = 0.09;
          metalness = 0.96;
        } else if (vehicleId === 'bmw-x7-matte') {
          bodyColor = new THREE.Color(0x566270); // Frozen Pure Grey Satin
          roughness = 0.42;
          metalness = 0.65;
          clearcoat = 0.22;
          clearcoatRoughness = 0.35;
        }

        const bodyMaterial = new THREE.MeshPhysicalMaterial({
          color: bodyColor,
          metalness: metalness,
          roughness: roughness,
          clearcoat: clearcoat,
          clearcoatRoughness: clearcoatRoughness,
          reflectivity: 0.95,
        });

        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x07090e,
          metalness: 0.1,
          roughness: 0.03,
          transmission: 0.88,
          transparent: true,
          opacity: 0.85,
        });

        const chromeMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.98,
          roughness: 0.06,
        });

        const carbonMaterial = new THREE.MeshStandardMaterial({
          color: 0x111114,
          metalness: 0.85,
          roughness: 0.28,
        });

        const caliperMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(accentColor),
          metalness: 0.8,
          roughness: 0.2,
        });

        // Material overrides per model & vehicleId
        carModel.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const matName = (child.material?.name || '').toLowerCase();
            const meshName = (child.name || '').toLowerCase();

            // 1. Car Paint Body
            if (
              matName.includes('body') ||
              matName.includes('paint') ||
              matName.includes('car_body') ||
              matName.includes('whitecar') ||
              meshName.includes('body') ||
              meshName.includes('bumper') ||
              meshName.includes('hood') ||
              meshName.includes('boot') ||
              meshName.includes('door')
            ) {
              child.material = bodyMaterial;
              carBodyMeshes.current.push(child);
            }
            // 2. Glass / Windows
            else if (
              matName.includes('glass') ||
              matName.includes('windscreen') ||
              matName.includes('window') ||
              meshName.includes('glass')
            ) {
              child.material = glassMaterial;
            }
            // 3. Wheels / Chrome Rims
            else if (
              matName.includes('alloy') ||
              matName.includes('rim') ||
              matName.includes('chrome') ||
              meshName.includes('rim')
            ) {
              child.material = chromeMaterial;
            }
            // 4. Brake Caliper
            else if (
              matName.includes('caliper') ||
              matName.includes('break') ||
              meshName.includes('caliper')
            ) {
              child.material = caliperMaterial;
              carCaliperMeshes.current.push(child);
            }
            // 5. Carbon aero
            else if (matName.includes('carbon') || meshName.includes('carbon')) {
              child.material = carbonMaterial;
            }
          }
        });

        // Auto-scale model to fit showroom podium nicely (approx ~4.2m length)
        const box = new THREE.Box3().setFromObject(carModel);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const desiredLength = 4.2;
          const scaleFactor = desiredLength / Math.max(size.z, size.x);
          carModel.scale.setScalar(scaleFactor);
        }

        // Recompute bounds after scale and center on floor
        const scaledBox = new THREE.Box3().setFromObject(carModel);
        const center = scaledBox.getCenter(new THREE.Vector3());
        carModel.position.x = -center.x;
        carModel.position.y = -scaledBox.min.y; // Sit precisely on ground
        carModel.position.z = -center.z;

        carPivot.add(carModel);
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading 3D car model:', error);
        setIsLoading(false);
      }
    );

    // 8. Mouse & Touch Drag Interaction (XYZ Aircraft Simulation)
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - prevMousePos.current.x;
      const deltaY = e.clientY - prevMousePos.current.y;

      prevMousePos.current = { x: e.clientX, y: e.clientY };

      // Y-axis: 360-degree continuous turntable rotation
      targetRotation.current.y += deltaX * 0.009;

      // X-axis: Pitch (look down from top or from low angle)
      targetRotation.current.x = Math.max(-0.25, Math.min(0.65, targetRotation.current.x + deltaY * 0.007));

      // Z-axis: Subtle flight simulation roll banking on fast drag
      targetRotation.current.z = Math.max(-0.15, Math.min(0.15, -deltaX * 0.004));

      rotVelocity.current = { x: deltaY * 0.001, y: deltaX * 0.003, z: 0 };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoom.current = Math.max(3.8, Math.min(8.5, targetZoom.current + e.deltaY * 0.004));
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.current.x;
      const deltaY = e.touches[0].clientY - prevMousePos.current.y;

      prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      targetRotation.current.y += deltaX * 0.01;
      targetRotation.current.x = Math.max(-0.25, Math.min(0.65, targetRotation.current.x + deltaY * 0.008));
      targetRotation.current.z = Math.max(-0.15, Math.min(0.15, -deltaX * 0.005));
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    // 9. 60FPS Render Loop with Damping (Inertia)
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Auto rotation when idle
      if (autoRotate && !isDragging.current) {
        targetRotation.current.y += 0.005;
      }

      // Smooth damping (LERP) for X, Y, Z rotation
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;
      currentRotation.current.z += (targetRotation.current.z - currentRotation.current.z) * 0.08;

      // Smooth zoom
      currentZoom.current += (targetZoom.current - currentZoom.current) * 0.08;
      camera.position.z = currentZoom.current;

      // Apply rotation ONLY to carPivot (Background & lights stay fixed!)
      carPivot.rotation.x = currentRotation.current.x;
      carPivot.rotation.y = currentRotation.current.y;
      carPivot.rotation.z = currentRotation.current.z;

      // Notify parent of current normalized angle (0 - 360 deg)
      if (onAngleChange) {
        const deg = ((-currentRotation.current.y * (180 / Math.PI)) % 360 + 360) % 360;
        onAngleChange(Math.round(deg));
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      dracoLoader.dispose();
      renderer.dispose();
    };
  }, [vehicleId, accentColor]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md pointer-events-none z-20">
          <div className="w-12 h-12 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin mb-4" />
          <div className="text-xs font-mono tracking-widest text-amber-300 font-bold uppercase">
            3D 리얼 슈퍼카 모델 렌더링 중... {loadingProgress}%
          </div>
          <div className="text-[11px] text-white/50 mt-1 font-mono">
            특허 스프레이 PPS 클리어코트 셰이더 적용
          </div>
        </div>
      )}
    </div>
  );
};
