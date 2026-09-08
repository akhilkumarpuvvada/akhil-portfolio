import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

const noiseGLSL = `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

export default function Scene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowPower = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 700
    const particleCount = lowPower ? 1400 : 3600

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !lowPower, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1 : 1.6))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 18)

    const world = new THREE.Group()
    scene.add(world)

    const uniforms = {
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uMouseDir: { value: new THREE.Vector3(0, 0, 1) },
      uMouseStrength: { value: 0 },
      uColorA: { value: new THREE.Color(0x7c3aed) },
      uColorB: { value: new THREE.Color(0x22d3ee) },
    }

    const blobGeo = new THREE.IcosahedronGeometry(3.4, lowPower ? 24 : 48)
    const blob = new THREE.Mesh(
      blobGeo,
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          uniform float uTime;
          uniform float uIntro;
          uniform vec3 uMouseDir;
          uniform float uMouseStrength;
          varying vec3 vNormalW;
          varying vec3 vViewDir;
          varying float vDisp;
          ${noiseGLSL}
          void main(){
            vec3 nrm = normalize(position);
            float n = snoise(nrm * 1.5 + uTime * 0.22);
            n += 0.5 * snoise(nrm * 3.1 - uTime * 0.16);
            float bulge = uMouseStrength * pow(max(dot(nrm, uMouseDir), 0.0), 3.0);
            float disp = (n * 0.6 + bulge) * uIntro;
            vDisp = disp;
            vec3 pos = position + normal * disp;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            vNormalW = normalize(normalMatrix * normal);
            vViewDir = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec3 vNormalW;
          varying vec3 vViewDir;
          varying float vDisp;
          void main(){
            float fres = pow(1.0 - max(dot(vViewDir, vNormalW), 0.0), 2.4);
            vec3 col = mix(uColorA, uColorB, clamp(vDisp * 1.6 + 0.28, 0.0, 1.0));
            col += fres * 1.7 * uColorB;
            col += 0.06;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    )
    world.add(blob)

    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(6.4, 2)),
      new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.12 }),
    )
    world.add(shell)

    const pPos = new Float32Array(particleCount * 3)
    const pScale = new Float32Array(particleCount)
    const pColor = new Float32Array(particleCount * 3)
    const cA = new THREE.Color(0x8b5cf6)
    const cB = new THREE.Color(0x22d3ee)
    const cC = new THREE.Color(0xe879f9)
    const gold = (1 + Math.sqrt(5)) / 2
    for (let i = 0; i < particleCount; i++) {
      const shellHit = Math.random() < 0.72
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount)
      const theta = 2 * Math.PI * i * gold
      const r = shellHit ? 5.4 + Math.random() * 1.8 : 3.6 + Math.random() * 8.5
      pPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      pPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r
      pPos[i * 3 + 2] = Math.cos(phi) * r
      pScale[i] = 0.5 + Math.random() * 2.2
      const mix = Math.random()
      const c = mix < 0.5 ? cA.clone().lerp(cB, mix * 2) : cB.clone().lerp(cC, (mix - 0.5) * 2)
      pColor[i * 3] = c.r
      pColor[i * 3 + 1] = c.g
      pColor[i * 3 + 2] = c.b
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('aScale', new THREE.BufferAttribute(pScale, 1))
    pGeo.setAttribute('aColor', new THREE.BufferAttribute(pColor, 3))

    const particles = new THREE.Points(
      pGeo,
      new THREE.ShaderMaterial({
        uniforms: { uTime: uniforms.uTime, uIntro: uniforms.uIntro },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          uniform float uTime;
          uniform float uIntro;
          attribute float aScale;
          attribute vec3 aColor;
          varying vec3 vColor;
          void main(){
            vColor = aColor;
            vec3 p = position;
            p.x += sin(uTime * 0.4 + position.y * 0.4) * 0.25;
            p.y += cos(uTime * 0.35 + position.x * 0.3) * 0.25;
            p *= mix(0.15, 1.0, uIntro);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = aScale * (150.0 / -mv.z) * uIntro;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.05, d);
            gl_FragColor = vec4(vColor, a * 0.9);
          }
        `,
      }),
    )
    world.add(particles)

    let composer = null
    let bloom = null
    if (!lowPower) {
      try {
        composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, camera))
        bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.85, 0.5, 0.0)
        composer.addPass(bloom)
        composer.addPass(new OutputPass())
      } catch {
        composer = null
      }
    }

    const targetMouse = new THREE.Vector2(0, 0)
    const mouse = new THREE.Vector2(0, 0)
    let lastMove = -10
    const onPointerMove = (e) => {
      targetMouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
      lastMove = performance.now() / 1000
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      composer?.setSize(w, h)
      bloom?.resolution.set(w, h)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    let running = true
    let onScreen = true

    let raf = 0
    let elapsed = 0
    let last = performance.now()
    const startedAt = performance.now()

    const renderFrame = () => {
      if (composer) composer.render()
      else renderer.render(scene, camera)
    }

    const tick = () => {
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      elapsed += dt
      uniforms.uTime.value = elapsed

      const intro = easeOutCubic(Math.min((now - startedAt) / 1900, 1))
      uniforms.uIntro.value = intro
      camera.position.z = 18 - 5 * intro

      mouse.lerp(targetMouse, 0.06)
      world.rotation.y = elapsed * 0.06 + mouse.x * 0.5
      world.rotation.x = mouse.y * 0.35 + Math.sin(elapsed * 0.15) * 0.08
      shell.rotation.y = -elapsed * 0.05
      shell.rotation.z = elapsed * 0.03
      particles.rotation.y = elapsed * 0.02

      uniforms.uMouseDir.value.set(mouse.x, mouse.y, 0.6).normalize()
      const active = now / 1000 - lastMove < 1.2
      const wantStrength = active ? 0.7 : 0.12
      uniforms.uMouseStrength.value += (wantStrength - uniforms.uMouseStrength.value) * 0.05

      renderFrame()
      if (running && onScreen) raf = requestAnimationFrame(tick)
    }

    if (reduced) {
      uniforms.uIntro.value = 1
      camera.position.z = 13
      renderFrame()
    } else {
      raf = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible' && !reduced
      if (running && onScreen) {
        last = performance.now()
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(raf)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen && running && !reduced) {
        last = performance.now()
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(tick)
      }
    })
    io.observe(mount)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      ro.disconnect()
      io.disconnect()
      composer?.dispose?.()
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

  return <div ref={mountRef} aria-hidden className="absolute inset-0 h-full w-full" />
}
