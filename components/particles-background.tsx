"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"

function Particles() {
  const count = 300
  const mesh = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
    }

    return positions
  }, [])

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3)
    const color1 = new THREE.Color("#B8D8E8")
    const color2 = new THREE.Color("#ffffff")

    for (let i = 0; i < count; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random())
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b
    }

    return colors
  }, [])

  const sizes = useMemo(() => {
    const data = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      data[i] = Math.random() * 0.5 + 0.5
    }
    return data
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      mesh.current.geometry.attributes.position.array[i3] += Math.sin(time * 0.3 + i) * 0.003
      mesh.current.geometry.attributes.position.array[i3 + 1] += Math.cos(time * 0.2 + i) * 0.003

      const scale = (Math.sin(time * 0.5 + i) + 2) * 0.5
      mesh.current.geometry.attributes.size.array[i] = scale
    }

    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.geometry.attributes.size.needsUpdate = true
    mesh.current.rotation.y = time * 0.03
    mesh.current.rotation.x = time * 0.01
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 50.0 * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          
          void main() {
            vec2 center = gl_PointCoord - 0.5;
            float dist = length(center);
            float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `}
      />
    </points>
  )
}

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white via-white to-[#B8D8E8]/20">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
        <EffectComposer>
          <Bloom intensity={2} luminanceThreshold={0} luminanceSmoothing={0.9} kernelSize={3} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

