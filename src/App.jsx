import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import * as THREE from 'three';
import { 
  Github, Linkedin, Mail, Terminal, Code, Cpu, 
  ExternalLink, Briefcase, ArrowRight, BookOpen, Lock
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURACIÓN DEL USUARIO ---
const GITHUB_USERNAME = "LuisMorenoMalpartida"; 
const YOUR_NAME = "LUIS MORENO";
const YOUR_TITLE = "INGENIERO DE SOFTWARE CON I.A"; 
const YOUR_EMAIL = "gus6bmp@gmail.com"; 
const YOUR_PHONE = "+51 912439638"; 

const SELECTED_REPOS = [
  "FineBank",
  "VALERIA-STELLA",
  "attendance-system",
  "Entrevista_Altera-"
];

// --- DATOS DEL CV ---
const CV_DATA = {
  about: "Ingeniero de Software con especialización en IA y experiencia en desarrollo Full Stack bajo metodología SCRUM. Perfil proactivo y orientado a resultados, enfocado en la entrega de productos de alta calidad mediante la aplicación de metodologías de Testing y Aseguramiento de Calidad (QA), incluyendo pruebas funcionales, de regresión y herramientas automatizadas para garantizar la robustez del sistema.",
  skills: [
    { category: "Lenguajes", items: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "HTML/CSS"] }, 
    { category: "Frameworks", items: ["React", "Next.js", "Laravel", "Tailwind", "FastAPI", "Node.js", "GSAP", "Three.js", "Flutter"] }, 
    { category: "Bases / Cloud", items: ["MySQL", "MongoDB", "PostgreSQL", "Supabase", "Neon", "AWS", "Azure"] }, 
    { category: "QA / DevOps", items: ["Selenium", "Postman", "JMeter", "PHPUnit", "Docker", "Vercel", "Scrum"] } 
  ],
  experience: [
    {
      role: "Programador Junior | Líder de equipo", 
      company: "ALTERA FINANCE", 
      period: "Feb 2026 - Actualidad", 
      desc: "Desarrollo Frontend y Backend con Next.js, PostgreSQL, Neon, Flutter y FastAPI. Liderazgo de equipos en modalidad Squads autónomos, supervisando avances, manejando APIs, endpoints y pruebas de testing."
    },
    {
      role: "Programador Junior Web Full Stack", 
      company: "AM CONSULTORIA", 
      period: "Jun 2025 - Nov 2025", 
      desc: "Proyecto Full Stack de gestión de proyectos con tablero Kanban interactivo, visualización de datos, validaciones avanzadas y testing responsive. Implementación de un módulo de IA para análisis de riesgos y predicción de fallos en cronogramas."
    },
    {
      role: "Programador Junior Web", 
      company: "ARTE IDEAS", 
      period: "Feb 2025 - Jun 2025", 
      desc: "Desarrollo de interfaz de usuario con HTML, CSS, JavaScript y WordPress. Backend con PHP, MySQL y JQuery. Realización de pruebas de APIs/Endpoints (Testing de Integración) bajo metodología SCRUM."
    },
    {
      role: "Líder y coordinador de proyectos web", 
      company: "ICSM Instituto Científico Minero", 
      period: "2024 - 2025", 
      desc: "Full Developer (Frontend - Backend). Dirección de un equipo de desarrollo para la construcción de la página web utilizando la metodología SCRUM."
    }
  ],
  education: [
    {
      degree: "Ingeniería de Software con IA", 
      institution: "Senati", 
      period: "2022 - 2025" 
    },
    {
      degree: "Dibujante Autocad", 
      institution: "Unimaster", 
      period: "2024" 
    }
  ]
};

// --- COMPONENTES UI AVANZADOS ---

// 1. Cursor Personalizado GSAP
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
      
      const fXTo = gsap.quickTo(followerRef.current, "x", { duration: 0.5, ease: "power3" });
      const fYTo = gsap.quickTo(followerRef.current, "y", { duration: 0.5, ease: "power3" });

      window.addEventListener("mousemove", (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
        fXTo(e.clientX);
        fYTo(e.clientY);
      });

      const clickables = document.querySelectorAll('a, button, .magnetic');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(followerRef.current, { scale: 1.5, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0)', duration: 0.3 });
          gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(followerRef.current, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.3)', duration: 0.3 });
          gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -ml-1 -mt-1 mix-blend-difference hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] -ml-5 -mt-5 transition-colors hidden md:block" />
    </>
  );
};

// 2. Preloader Estilo Consola
const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef();

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.to({}, {
      duration: 2,
      onUpdate: function() {
        setProgress(Math.floor(this.progress() * 100));
      }
    })
    .to('.loader-text', { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" })
    .to(containerRef.current, { yPercent: -100, duration: 1, ease: "expo.inOut", delay: 0.2 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] bg-zinc-950 flex flex-col items-center justify-center font-mono text-zinc-500">
      <div className="loader-text flex flex-col items-center gap-4">
        <Terminal className="w-8 h-8 text-cyan-500 animate-pulse" />
        <div className="text-xl text-cyan-500">SYSTEM.BOOT({progress}%)</div>
        <div className="w-64 h-1 bg-zinc-900 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-cyan-500 transition-all duration-75 shadow-[0_0_15px_#06b6d4]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

// 3. Header Flotante Glass
const NavBar = ({ scrollToSection }) => (
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 perspective-[1000px]">
    <div className="bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-2xl px-6 py-4 flex items-center justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
      <div className="text-zinc-100 font-bold tracking-tighter text-lg flex items-center gap-3 cursor-pointer group magnetic" onClick={() => scrollToSection('hero')}>
        <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-cyan-500 transition-colors shadow-inner">
          <Terminal className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
        </div>
        <span className="group-hover:text-cyan-400 transition-colors">LM.DEV</span>
      </div>

      <div className="hidden md:flex gap-10 text-xs font-medium font-mono text-zinc-500">
        {['Proyectos', 'Experiencia', 'Skills'].map((item) => (
          <button 
            key={item} 
            onClick={() => scrollToSection(item.toLowerCase())}
            className="hover:text-zinc-200 uppercase tracking-widest relative overflow-hidden group py-1"
          >
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-[150%]">{item}</span>
            <span className="absolute top-1 left-0 inline-block transition-transform duration-500 translate-y-[150%] group-hover:translate-y-0 text-cyan-400">{item}</span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out"></div>
          </button>
        ))}
      </div>

      <button onClick={() => document.getElementById('contacto').scrollIntoView({behavior:'smooth'})} className="magnetic bg-white hover:bg-cyan-400 hover:text-black text-black px-6 py-2 text-xs font-bold font-mono tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        CONTACTAR
      </button>
    </div>
  </nav>
);

// --- COMPONENTE NUEVO: THREE.JS AVANZADO ---
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.03);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(12, 32);
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#06b6d4') },
        uMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vElevation;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute( permute( permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vec3 pos = position;
          
          float noiseFreq = 0.3;
          float noiseAmp = 2.5;
          vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq + uTime * 0.3, pos.z * noiseFreq);
          float dist = snoise(noisePos) * noiseAmp;
          
          pos += normal * dist;
          
          pos.x += uMouse.x * 3.0;
          pos.y += uMouse.y * 3.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          gl_PointSize = (15.0 / -mvPosition.z);
          vElevation = dist;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vElevation;

        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if(dist > 0.5) discard;
          
          float mixStrength = (vElevation + 2.5) / 5.0;
          vec3 finalColor = mix(vec3(0.5, 0.5, 0.5), uColor, mixStrength);
          
          float alpha = 1.0 - (dist * 2.0);
          gl_FragColor = vec4(finalColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    particles.position.x = 8;
    scene.add(particles);

    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    
    const onMouseMove = (event) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      
      material.uniforms.uTime.value = elapsedTime;
      
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);

      particles.rotation.y = elapsedTime * 0.1;
      particles.rotation.x = elapsedTime * 0.05;

      camera.position.y = -(window.scrollY * 0.015);

      renderer.render(scene, camera);
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(tick);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

// --- APP PRINCIPAL ---
const App = () => {
  const containerRef = useRef(null);
  const backgroundGlowRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inicializar Lenis
  useEffect(() => {
    document.body.style.cursor = 'none';
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      lenis.destroy();
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Fetch repos
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        if (!response.ok) throw new Error('API Falló');
        const data = await response.json();
        const filteredRepos = data.filter(repo => SELECTED_REPOS.includes(repo.name));
        
        if (filteredRepos.length > 0) setRepos(filteredRepos);
        else throw new Error('Repos no encontrados');
      } catch (error) {
        setRepos([
          { id: 1, name: "FineBank", description: "Plataforma financiera y gestión bancaria.", language: "TypeScript", html_url: "https://github.com/LuisMorenoMalpartida/FineBank" },
          { id: 2, name: "VALERIA-STELLA", description: "Proyecto web desarrollado a medida.", language: "JavaScript", html_url: "https://github.com/LuisMorenoMalpartida/VALERIA-STELLA" },
          { id: 3, name: "attendance-system", description: "Sistema automatizado para el control de asistencia.", language: "Python", html_url: "https://github.com/LuisMorenoMalpartida/attendance-system" },
          { id: 4, name: "Entrevista_Altera-", description: "Proyecto y prueba técnica para Altera.", language: "JavaScript", html_url: "https://github.com/LuisMorenoMalpartida/Entrevista_Altera-" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  // Refrescar ScrollTrigger cuando los repos terminan de cargar y renderizar
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // GSAP Animaciones Generales (NO dependen de repos)
  useGSAP(() => {
    // Efecto Glow de Fondo 2D - CON CLEANUP
    const handleMouseMove = (e) => {
      gsap.to(backgroundGlowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 2,
        ease: "power2.out",
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const tl = gsap.timeline({ delay: 2.2 });
    tl.from('.hero-mask span', { y: 150, opacity: 0, duration: 1.5, ease: 'power4.out', stagger: 0.1 })
      .from('.hero-fade', { opacity: 0, y: 30, duration: 1, stagger: 0.1 }, "-=1");

    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 60, opacity: 0, duration: 1, ease: 'power3.out'
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, { scope: containerRef });

  // Scroll Horizontal - Se re-ejecuta cuando repos/loading cambian
  useGSAP(() => {
    if (loading || repos.length === 0) return;

    const slider = document.querySelector(".horizontal-slider");
    const wrapper = document.querySelector(".horizontal-wrapper");
    
    if (!slider || !wrapper) return;

    gsap.to(slider, {
      x: () => -(slider.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
        start: "top top",
        end: () => `+=${slider.scrollWidth - window.innerWidth}`,
      }
    });

    ScrollTrigger.refresh();
  }, { 
    scope: containerRef, 
    dependencies: [repos, loading] 
  });

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen w-full text-zinc-300 font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative">
      <Preloader />
      <CustomCursor />
      
      {/* CAPA BASE: TEXTURA Y THREE.JS */}
      <ThreeBackground />
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      {/* Orbe Magnético 2D */}
      <div 
        ref={backgroundGlowRef} 
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[1]"
      ></div>

      <NavBar scrollToSection={(id) => {
        const element = document.getElementById(id);
        if (element) window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
      }} />

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-7xl mx-auto relative z-10">
        <div className="font-mono text-cyan-500 mb-6 text-sm flex items-center gap-2 hero-fade">
          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]"></span>
          [ {YOUR_TITLE} ]
        </div>
        
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black text-white tracking-tighter leading-[0.8] uppercase overflow-hidden py-2">
            <div className="hero-mask overflow-hidden">
              <span className="inline-block">{YOUR_NAME.split(' ')[0]}</span>
            </div>
          </h1>
          <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] uppercase overflow-hidden py-2">
            <div className="hero-mask overflow-hidden">
              <span className="inline-block bg-gradient-to-r from-zinc-100 via-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                {YOUR_NAME.split(' ')[1]}
              </span>
            </div>
          </h1>
        </div>
        
        <p className="hero-fade max-w-2xl text-zinc-400 text-lg md:text-xl leading-relaxed mb-12 border-l border-cyan-900 pl-8 backdrop-blur-sm bg-black/20 py-2 rounded-r-xl">
          {CV_DATA.about}
        </p>
        
        <div className="hero-fade flex gap-8 items-center">
          <button 
            onClick={() => {
              const element = document.getElementById('proyectos');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="magnetic group flex items-center gap-4 text-white font-bold text-sm tracking-widest uppercase border-b border-white pb-2 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
          >
            Ver Proyectos <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
          <div className="flex gap-4">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="magnetic p-3 rounded-full border border-zinc-800 hover:bg-cyan-500 hover:border-cyan-500 hover:text-black transition-all bg-black/50 backdrop-blur-md"><Github className="w-5 h-5" /></a>
            <a href="#" className="magnetic p-3 rounded-full border border-zinc-800 hover:bg-cyan-500 hover:border-cyan-500 hover:text-black transition-all bg-black/50 backdrop-blur-md"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL PROJECTS SECTION - CORREGIDO */}
      <section id="proyectos" className="horizontal-wrapper relative w-full h-screen flex items-center overflow-hidden border-y border-zinc-900 z-10 bg-black/40 backdrop-blur-sm">
        
        <div className="absolute top-20 md:top-24 left-6 md:left-24 z-20 mix-blend-difference text-white">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Proyectos.</h2>
          <p className="font-mono text-cyan-500 mt-2">// ARCHIVOS_SISTEMA</p>
        </div>

        <div className="horizontal-slider flex h-[60vh] md:h-[70vh] items-center gap-10 px-6 md:px-24 w-max">
          {!loading && repos.map((repo) => (
            <a key={repo.id} href={repo.html_url || "#"} target="_blank" rel="noreferrer" 
               className="horizontal-slide magnetic relative flex-shrink-0 w-[85vw] md:w-[600px] h-[80%] bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-10 flex flex-col justify-between group overflow-hidden">
              
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl group-hover:border-cyan-500/50 transition-colors">
                    <Code className="w-6 h-6 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <ExternalLink className="w-6 h-6 text-zinc-600 group-hover:text-white transition-colors transform group-hover:scale-110" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 group-hover:-translate-y-2 transition-transform duration-500">{repo.name}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-md group-hover:text-zinc-300">{repo.description ?? "Sin descripción"}</p>
              </div>

              <div className="relative z-10 flex items-center justify-between border-t border-zinc-800 pt-6">
                <span className="font-mono text-sm px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800 text-cyan-500">{repo.language || 'Software'}</span>
                <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">EXPANDIR_</span>
              </div>
            </a>
          ))}
           <div className="horizontal-slide flex-shrink-0 w-[85vw] md:w-[400px] h-[80%] flex flex-col items-center justify-center text-center p-10 bg-zinc-950/80 backdrop-blur-xl border border-zinc-900 rounded-3xl">
              <Lock className="w-10 h-10 text-cyan-900 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">CRMs Privados</h3>
              <p className="text-zinc-500">He desarrollado plataformas CRM corporativas que permanecen en repositorios privados por confidencialidad.</p>
           </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experiencia" className="py-32 px-6 max-w-6xl mx-auto relative z-10">
        <h2 className="reveal text-4xl md:text-5xl font-black text-white mb-20 tracking-tighter uppercase text-center">
          Trayectoria
        </h2>
        
        <div className="flex flex-col gap-4">
          {CV_DATA.experience.map((job, idx) => (
            <div key={idx} className="reveal group relative flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 hover:bg-cyan-500 hover:text-black transition-all duration-500 rounded-2xl overflow-hidden cursor-default">
              
              <div className="relative z-10 w-full md:w-1/3 mb-4 md:mb-0">
                <div className="font-mono text-xs text-cyan-500 group-hover:text-black font-bold mb-2 transition-colors">{job.period}</div>
                <div className="font-black text-2xl uppercase tracking-tight">{job.company}</div>
              </div>
              
              <div className="relative z-10 w-full md:w-2/3">
                <h3 className="text-xl font-bold text-white group-hover:text-black mb-3 transition-colors">{job.role}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-800 text-sm md:text-base leading-relaxed transition-colors max-w-2xl">{job.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS GRID */}
      <section id="skills" className="py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-zinc-900 bg-black/20 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="reveal col-span-1 md:col-span-2 lg:col-span-4 mb-10">
             <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Stack Técnico.</h2>
          </div>
          
          {CV_DATA.skills.map((skillGroup, idx) => (
            <div key={idx} className="reveal magnetic bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 hover:border-cyan-500/50 hover:bg-zinc-900/80 transition-colors duration-300">
              <Cpu className="w-8 h-8 text-cyan-500 mb-6" />
              <h3 className="font-mono text-zinc-100 text-sm uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4">
                {skillGroup.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skillGroup.items.map((item, i) => (
                  <li key={i} className="px-3 py-1.5 bg-black border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Education Box */}
          <div className="reveal col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {CV_DATA.education.map((edu, idx) => (
              <div key={idx} className="bg-zinc-950/60 backdrop-blur-md border border-zinc-900 p-8 rounded-3xl flex justify-between items-end group hover:border-cyan-900 transition-colors">
                 <div>
                   <BookOpen className="w-6 h-6 text-zinc-600 group-hover:text-cyan-500 transition-colors mb-4" />
                   <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                   <p className="text-zinc-500">{edu.institution}</p>
                 </div>
                 <div className="font-mono text-sm text-cyan-700">{edu.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <section id="contacto" className="py-40 px-6 border-t border-zinc-900 bg-black/80 backdrop-blur-xl text-center relative overflow-hidden z-10">
        <div className="reveal max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-[8rem] font-black text-white mb-10 tracking-tighter uppercase leading-none">
            Let's Talk.
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`mailto:${YOUR_EMAIL}`} className="magnetic bg-white text-black px-10 py-6 font-bold text-sm tracking-widest uppercase rounded-full flex items-center justify-center gap-3 hover:scale-105 hover:bg-cyan-500 hover:text-black transition-all">
              <Mail className="w-5 h-5" /> Enviar Email
            </a>
            <a href={`https://wa.me/${YOUR_PHONE.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="magnetic bg-transparent border border-zinc-700 text-white px-10 py-6 font-bold text-sm tracking-widest uppercase rounded-full flex items-center justify-center gap-3 hover:border-cyan-500 hover:text-cyan-400 hover:scale-105 transition-all bg-black/50">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;