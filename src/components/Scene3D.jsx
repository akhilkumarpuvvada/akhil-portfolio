import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Scene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (window.matchMedia('(max-width: 639px)').matches) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 6

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const geometry = new THREE.IcosahedronGeometry(1.7, 4)
    const basePositions = geometry.attributes.position.array.slice()

    const core = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        color: 0x1b1b2e,
        roughness: 0.35,
        metalness: 0.6,
        flatShading: true,
        transparent: true,
        opacity: 0.9,
      }),
    )
    group.add(core)

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.72, 3)),
      new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.35 }),
    )
    group.add(wireframe)

    const halo = new THREE.Points(
      new THREE.IcosahedronGeometry(2.7, 6),
      new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.02, transparent: true, opacity: 0.6 }),
    )
    group.add(halo)

    const violet = new THREE.PointLight(0x8b5cf6, 90, 20)
    violet.position.set(4, 3, 4)
    scene.add(violet)
    const cyan = new THREE.PointLight(0x22d3ee, 70, 20)
    cyan.position.set(-4, -2, 3)
    scene.add(cyan)
    const fuchsia = new THREE.PointLight(0xe879f9, 50, 20)
    fuchsia.position.set(0, 4, -3)
    scene.add(fuchsia)
    scene.add(new THREE.AmbientLight(0x404060, 1.2))

    const pointer = new THREE.Vector2(0, 0)
    const target = new THREE.Vector2(0, 0)
    const onPointerMove = (e) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    const posAttr = geometry.attributes.position
    const tmp = new THREE.Vector3()
    let raf = 0
    let running = true
    let elapsed = 0
    let last = performance.now()

    const tick = () => {
      const now = performance.now()
      elapsed += Math.min((now - last) / 1000, 0.05)
      last = now
      const t = elapsed

      pointer.lerp(target, 0.05)

      group.rotation.y = t * 0.15 + pointer.x * 0.6
      group.rotation.x = Math.sin(t * 0.2) * 0.15 + pointer.y * 0.4
      halo.rotation.y = -t * 0.08
      halo.rotation.z = t * 0.05

      for (let i = 0; i < posAttr.count; i++) {
        const ix = i * 3
        tmp.set(basePositions[ix], basePositions[ix + 1], basePositions[ix + 2])
        const n = Math.sin(tmp.x * 2 + t) * Math.cos(tmp.y * 2 + t * 0.8) * Math.sin(tmp.z * 2 + t * 1.2)
        const scale = 1 + n * 0.06
        posAttr.setXYZ(i, tmp.x * scale, tmp.y * scale, tmp.z * scale)
      }
      posAttr.needsUpdate = true
      geometry.computeVertexNormals()

      violet.position.x = Math.sin(t * 0.5) * 5
      violet.position.z = Math.cos(t * 0.5) * 5
      cyan.position.x = Math.cos(t * 0.4) * 5
      cyan.position.y = Math.sin(t * 0.3) * 4

      renderer.render(scene, camera)
      if (running) raf = requestAnimationFrame(tick)
    }

    if (reduced) {
      renderer.render(scene, camera)
    } else {
      raf = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible' && !reduced
      if (running) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(raf)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      ro.disconnect()
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => m.dispose())
        }
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden h-full opacity-80 sm:block sm:w-[58%] lg:w-[52%]"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 45%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 45%)',
      }}
    />
  )
}
