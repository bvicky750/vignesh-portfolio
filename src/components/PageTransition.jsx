// src/components/PageTransition.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

/**
 * PageTransition - full-screen WebGL warp used during page transitions.
 * Usage: Wrap your page content with <PageTransition> ... </PageTransition>
 *
 * The component renders children normally and draws a fullscreen shader
 * on top that animates on mount/exit. Framer Motion controls the duration
 * of the exit so the shader has time to play.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4( position, 1.0 );
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uProgress; // 0 -> 1: progress of warp
  uniform vec2 uResolution;

  // Simple random
  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  // noise (value noise)
  float noise(in vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // fbm
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i=0; i<5; i++){
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Center coords (-1..1)
    vec2 center = uv - 0.5;
    float dist = length(center);

    // base displacement amount (stronger near center)
    float warpStrength = smoothstep(0.8, 0.0, dist) * 0.6;

    // animated noise
    float n = fbm((uv * 8.0 + uTime * 0.6));

    // progress easing (0->1)
    float p = smoothstep(0.0, 1.0, uProgress);

    // displacement (radial swirl + noise)
    float angle = atan(center.y, center.x);
    float swirl = sin(angle * 4.0 + uTime * 6.0) * 0.06;

    vec2 displaced = uv + (center * swirl * warpStrength * (0.5 + n)) * p;

    // chromatic offsets
    float chroma = 0.012 * p; // adjust intensity with progress
    vec2 rUV = displaced + vec2(chroma, -chroma);
    vec2 gUV = displaced + vec2(0.0, 0.0);
    vec2 bUV = displaced + vec2(-chroma, chroma);

    // sample screen colour by sampling a render - we don't have the DOM as a texture.
    // Instead we approximate with a subtle grid + tint so overlay feels integrated.
    // Create a pseudo-background using gradients + noise (this works as a stylized warp overlay).
    // Base gradient
    vec3 bg = mix(vec3(0.02,0.02,0.05), vec3(0.07,0.02,0.12), uv.y);

    // grid lines to echo your site's grid
    float grid = step(0.9985, fract(uv.x * 40.0)) * 0.12 + step(0.9985, fract(uv.y * 40.0)) * 0.08;

    // noise / scanline
    float scan = sin((uv.y + uTime * 0.8) * 200.0) * 0.02;

    // sample "layers" with different tints
    vec3 colR = bg + vec3(1.0, 0.12, 0.6) * 0.5 * n;
    vec3 colG = bg + vec3(0.3, 1.0, 0.9) * 0.35 * n;
    vec3 colB = bg + vec3(0.5, 0.6, 1.0) * 0.45 * n;

    // mix channels with offsets
    vec3 final = vec3(
      texture2D(vec4(0.0), rUV).r * 0.0 + colR.r,
      texture2D(vec4(0.0), gUV).g * 0.0 + colG.g,
      texture2D(vec4(0.0), bUV).b * 0.0 + colB.b
    );

    // add grid + scan + chroma fringe
    final += grid * 0.6;
    final += scan * 0.6;

    // vignette
    float vign = smoothstep(0.8, 0.4, dist) * 0.6;
    final *= (1.0 - vign);

    // a bright flash near the peak of transition
    float flash = pow(smoothstep(0.2, 0.8, p), 3.0);
    final += vec3(1.0, 0.7, 0.9) * flash * 0.25;

    gl_FragColor = vec4(final, 0.85 * p); // overlay alpha tied to progress
  }
`;

export default function PageTransition({ children }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const startTimeRef = useRef(0);
  const progressRef = useRef(0);

  // Setup three.js scene and shader on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uProgress: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let raf = null;
    startTimeRef.current = performance.now();

    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(w, h);
      }
    }
    window.addEventListener("resize", onResize);

    function animate(now) {
      const t = (now - startTimeRef.current) / 1000;
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = t;
        materialRef.current.uniforms.uProgress.value = progressRef.current;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // drive the "progress" uniform on mount and unmount (entry/exit)
  useEffect(() => {
    // play entry reveal: progress 1 -> 0 (overlay fades out)
    let rafId = null;
    let start = performance.now();
    const duration = 700; // ms
    progressRef.current = 1.0;

    function tickEntry(now) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // ease out cubic
      const v = 1 - Math.pow(1 - t, 3);
      progressRef.current = 1.0 - v; // go 1 -> 0
      if (t < 1) {
        rafId = requestAnimationFrame(tickEntry);
      } else {
        progressRef.current = 0.0;
      }
    }
    rafId = requestAnimationFrame(tickEntry);

    return () => {
      // on unmount (exit), play a strong warp: progress 0 -> 1 quickly
      cancelAnimationFrame(rafId);
      let startExit = performance.now();
      const exitDuration = 500; // ms - this controls how long exit warp plays
      function tickExit(now) {
        const elapsed = now - startExit;
        const t = Math.min(1, elapsed / exitDuration);
        // ease in cubic
        const v = Math.pow(t, 3);
        progressRef.current = v; // go 0 -> 1
        if (t < 1) {
          requestAnimationFrame(tickExit);
        } else {
          progressRef.current = 1.0;
        }
      }
      requestAnimationFrame(tickExit);
    };
  }, []);

  // Motion overlay variants: keep a longer exit so shader plays
  const overlayVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 1, transition: { duration: 0.55, ease: "easeInOut" } }, // hold while shader plays
  };

  return (
    <div className="relative w-full h-full">
      {/* The page content */}
      <div className="relative z-0">{children}</div>

      {/* WebGL overlay container (covers whole viewport) */}
      <div
        ref={containerRef}
        className="page-warp-canvas fixed inset-0 z-40 pointer-events-none"
        aria-hidden
      />

      {/* Motion overlay to control timing (framer-motion coordinates exit duration) */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </div>
  );
}
