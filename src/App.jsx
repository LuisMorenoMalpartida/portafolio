import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import * as THREE from 'three';
import { 
  Github, Linkedin, Mail, Terminal, Code, Cpu, 
  ExternalLink, Briefcase, ArrowRight, BookOpen, Lock,
  X, AlertCircle, Database, Wrench, Menu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURACIÓN DEL USUARIO ---
const GITHUB_USERNAME = "LuisMorenoMalpartida"; 
const LINKEDIN_URL = "https://www.linkedin.com/in/luis-moreno-malpartida-80169a277";
const YOUR_NAME = "LUIS MORENO";
const YOUR_TITLE = "INGENIERO DE SOFTWARE CON I.A"; 
const YOUR_EMAIL = "gus6bmp@gmail.com"; 
const YOUR_PHONE = "+51 912439638"; 

// --- PROYECTOS CON IMÁGENES Y URLs ---
const PROJECTS = [
  {
    id: 1,
    name: "Egoa Capital",
    category: "CRM · Real Estate",
    year: "2025",
    description: "CRM inmobiliario para gestión de clientes, pipeline de ventas y dashboard en tiempo real.",
    language: "Next.js",
    image: "/images/projects/egoa-capital.png",
    url: null,
    isPrivate: true,
    privateMessage: "Este proyecto es un CRM privado desarrollado para Egoa Capital. Por políticas de confidencialidad, no se puede compartir el enlace público."
  },
  {
    id: 2,
    name: "Altera Bank",
    category: "Fintech · Banca",
    year: "2025",
    description: "Plataforma financiera con control total del pipeline comercial y trazabilidad de leads.",
    language: "TypeScript",
    image: "/images/projects/altera-bank.png",
    url: null,
    isPrivate: true,
    privateMessage: "Este proyecto es una plataforma bancaria privada desarrollada para Altera Bank. El acceso está restringido por seguridad."
  },
  {
    id: 3,
    name: "Altera Finance",
    category: "Fintech · Web",
    year: "2025",
    description: "Financiamiento con tasas bajas y garantía inmobiliaria para crecimiento empresarial.",
    language: "React",
    image: "/images/projects/altera-finance.png",
    url: "https://www.altera.com.pe/inicio",
    isPrivate: false
  },
  {
    id: 4,
    name: "Ascent",
    category: "Corporate · Web",
    year: "2025",
    description: "Ecosistema empresarial que convierte capital, patrimonio y tecnología en progreso.",
    language: "Next.js",
    image: "/images/projects/ascent.png",
    url: "https://ascent.com.pe",
    isPrivate: false
  },
  {
    id: 5,
    name: "MiWasi",
    category: "Fintech · Comunidad",
    year: "2025",
    description: "Plataforma de ahorro comunitario sin bancos. Convierte la confianza entre personas en un sistema financiero real.",
    language: "Next.js",
    image: "/images/projects/miwasi.png",
    url: "https://www.miwasi.pe",
    isPrivate: false
  },
  {
    id: 6,
    name: "Asistente Virtual RRHH",
    category: "IA · Low-Code",
    year: "2026",
    description: "Asistente conversacional inteligente desarrollado con Copilot Studio y Power Platform para la automatización de consultas internas de Recursos Humanos.",
    language: "Copilot Studio / Power Platform",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    url: null,
    isPrivate: true,
    privateMessage: "Este es un proyecto interno de automatización desarrollado con Microsoft Copilot Studio y Power Platform. Debido a que maneja datos confidenciales de la empresa y está integrado en el tenant corporativo, el repositorio y el acceso público están restringidos. Se implementaron flujos de Power Automate y conexiones a Dataverse para la gestión de solicitudes."
  }
];

// --- DATOS DEL CV ---
const CV_DATA = {
  about: "Ingeniero de Software con especialización en IA y experiencia en desarrollo Full Stack bajo metodología SCRUM. Perfil proactivo y orientado a resultados, enfocado en la entrega de productos de alta calidad mediante la aplicación de metodologías de Testing y Aseguramiento de Calidad (QA), incluyendo pruebas funcionales, de regresión y herramientas automatizadas para garantizar la robustez del sistema.",
  stats: [
    { value: "+2", label: "Años exp." },
    { value: "6+", label: "Proyectos" },
    { value: "100%", label: "Full Stack" }
  ],
  skills: [
    { category: "Lenguajes", items: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "HTML/CSS"] }, 
    { category: "Frameworks", items: ["React", "Next.js", "Laravel", "Angular", "Tailwind", "FastAPI", "Node.js", "GSAP", "Three.js", "Flutter"] }, 
    { category: "Bases / Cloud", items: ["MySQL", "MongoDB", "PostgreSQL", "Supabase", "Neon", "AWS", "Azure"] }, 
    { category: "QA / DevOps / Low-Code", items: ["Selenium", "Postman", "JMeter", "PHPUnit", "Docker", "Vercel", "Scrum", "Power Platform", "Copilot Studio"] } 
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

// Mapeo de íconos por categoría de skills
const SKILL_ICONS = {
  "Lenguajes": Code,
  "Frameworks": Cpu,
  "Bases / Cloud": Database,
  "QA / DevOps / Low-Code": Wrench,
};

// --- MODAL PARA PROYECTOS PRIVADOS ---
const PrivateProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-zinc-950/95 border border-zinc-800 rounded-3xl max-w-lg w-full p-8 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20">
            <Lock className="w-12 h-12 text-cyan-500" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white text-center mb-2">
          {project.name}
        </h3>
        <p className="text-zinc-400 text-center text-sm mb-6">
          Proyecto Privado
        </p>

        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
            <p className="text-zinc-300 text-sm leading-relaxed">
              {project.privateMessage}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs text-zinc-500 font-mono">
          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span>Tecnología</span>
            <span className="text-cyan-400">{project.language}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-zinc-800/50">
            <span>Estado</span>
            <span className="text-emerald-400">● En producción</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Acceso</span>
            <span className="text-zinc-400">Restringido</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    if (!cursorRef.current || !followerRef.current) return;

    let ctx = gsap.context(() => {
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });
      
      const fXTo = gsap.quickTo(followerRef.current, "x", { duration: 0.5, ease: "power3" });
      const fYTo = gsap.quickTo(followerRef.current, "y", { duration: 0.5, ease: "power3" });

      const handleMouseMove = (e) => {
        if (!isMounted.current) return;
        xTo(e.clientX);
        yTo(e.clientY);
        fXTo(e.clientX);
        fYTo(e.clientY);
      };

      window.addEventListener("mousemove", handleMouseMove);

      const clickables = document.querySelectorAll('a, button, .magnetic');
      const cleanupFunctions = [];

      clickables.forEach((el) => {
        const handleMouseEnter = () => {
          if (!isMounted.current) return;
          gsap.to(followerRef.current, { scale: 1.5, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0)', duration: 0.3 });
          gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
        };
        const handleMouseLeave = () => {
          if (!isMounted.current) return;
          gsap.to(followerRef.current, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.3)', duration: 0.3 });
          gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
        };
        
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        
        cleanupFunctions.push(() => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        cleanupFunctions.forEach(cleanup => cleanup());
      };
    });

    return () => {
      isMounted.current = false;
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -ml-1 -mt-1 mix-blend-difference hidden md:block" />
      <div ref={followerRef} className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] -ml-5 -mt-5 transition-colors hidden md:block" />
    </>
  );
};

// --- PRELOADER ---
const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const isMounted = useRef(true);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    let tl = gsap.timeline();
    const progressObj = { value: 0 };
    
    tl.to(progressObj, {
      value: 100,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: function() {
        if (isMounted.current) {
          setProgress(Math.floor(progressObj.value));
        }
      }
    })
    .to('.loader-text', { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" })
    .to(containerRef.current, { yPercent: -100, duration: 1, ease: "expo.inOut", delay: 0.2 });

    return () => {
      isMounted.current = false;
      tl.kill();
    };
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

// --- NAVBAR MEJORADO ---
const NavBar = ({ scrollToSection, activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
        
        {/* Logo */}
        <div 
          className="text-zinc-100 font-bold tracking-tighter text-lg flex items-center gap-3 cursor-pointer group magnetic" 
          onClick={() => scrollToSection('hero')}
        >
          <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-cyan-500 transition-colors">
            <Terminal className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
          </div>
          <span className="group-hover:text-cyan-400 transition-colors hidden sm:inline">LM.DEV</span>
        </div>
        
        {/* Desktop nav */}
        <div className="hidden md:flex gap-1 text-xs font-mono">
          {['Proyectos', 'Experiencia', 'Skills'].map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`px-4 py-2 rounded-lg uppercase tracking-widest transition-all relative ${
                  isActive ? 'text-cyan-400 bg-cyan-500/10' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
        
        {/* CTA Desktop */}
        <button 
          onClick={() => scrollToSection('contacto')} 
          className="magnetic hidden md:flex bg-white hover:bg-cyan-400 text-black px-5 py-2 text-xs font-bold font-mono tracking-widest rounded-xl transition-all items-center gap-2"
        >
          CONTACTAR
          <ArrowRight className="w-3 h-3" />
        </button>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-2 bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-4 flex flex-col gap-1">
          {['Proyectos', 'Experiencia', 'Skills', 'Contacto'].map((item) => (
            <button 
              key={item}
              onClick={() => { scrollToSection(item.toLowerCase()); setMobileOpen(false); }}
              className="text-left text-zinc-300 py-3 px-4 uppercase font-mono text-sm hover:bg-zinc-900 rounded-lg transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- THREE.JS BACKGROUND ---
const ThreeBackground = () => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    if (!mountRef.current) return;

    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true, 
      powerPreference: "high-performance" 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const bgParticlesGeo = new THREE.BufferGeometry();
    const bgParticlesCount = isMobile ? 1000 : 3500;
    const bgPos = new Float32Array(bgParticlesCount * 3);
    const bgColors = new Float32Array(bgParticlesCount * 3);
    
    const colorCyan = new THREE.Color('#06b6d4');
    const colorPurple = new THREE.Color('#6366f1');

    for(let i = 0; i < bgParticlesCount * 3; i+=3) {
      bgPos[i] = (Math.random() - 0.5) * 200; 
      bgPos[i+1] = (Math.random() - 0.5) * 300; 
      bgPos[i+2] = (Math.random() - 0.5) * 150 - 20;

      const mix = Math.random();
      const color = colorCyan.clone().lerp(colorPurple, mix);
      bgColors[i] = color.r;
      bgColors[i+1] = color.g;
      bgColors[i+2] = color.b;
    }
    
    bgParticlesGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    bgParticlesGeo.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));

    const bgParticlesMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const bgParticlesMesh = new THREE.Points(bgParticlesGeo, bgParticlesMat);
    masterGroup.add(bgParticlesMesh);

    const coreGeo = new THREE.IcosahedronGeometry(11, isMobile ? 24 : 64);
    
    const coreMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#06b6d4') },
        uColor2: { value: new THREE.Color('#a855f7') },
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
          vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
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
          
          float noiseFreq = 0.25;
          float noiseAmp = 3.0;
          vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.4, pos.y * noiseFreq + uTime * 0.4, pos.z * noiseFreq);
          float dist = snoise(noisePos) * noiseAmp;
          
          pos += normal * dist;
          
          pos.x += uMouse.x * 2.5;
          pos.y += uMouse.y * 2.5;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          gl_PointSize = (20.0 / -mvPosition.z);
          vElevation = dist;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying float vElevation;

        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          if(dist > 0.5) discard;
          
          float mixStrength = (vElevation + 3.0) / 6.0;
          vec3 finalColor = mix(uColor2, uColor1, mixStrength);
          
          float alpha = 1.0 - (dist * 2.0);
          gl_FragColor = vec4(finalColor, alpha * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const coreMesh = new THREE.Points(coreGeo, coreMat);
    coreMesh.position.set(12, 0, -5);
    masterGroup.add(coreMesh);

    const ringMat = new THREE.PointsMaterial({
        color: 0x06b6d4,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const ringGeo1 = new THREE.TorusGeometry(16, 0.02, 16, 150);
    const ringGeo2 = new THREE.TorusGeometry(21, 0.02, 16, 200);
    const ringGeo3 = new THREE.TorusGeometry(26, 0.02, 16, 250);
    
    const ring1 = new THREE.Points(ringGeo1, ringMat);
    const ring2 = new THREE.Points(ringGeo2, ringMat);
    const ring3 = new THREE.Points(ringGeo3, ringMat);

    ring1.position.copy(coreMesh.position);
    ring2.position.copy(coreMesh.position);
    ring3.position.copy(coreMesh.position);

    ring1.rotation.x = Math.PI / 2;
    ring2.rotation.y = Math.PI / 3;
    ring3.rotation.x = Math.PI / 4;

    masterGroup.add(ring1, ring2, ring3);

    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    
    const onMouseMove = (event) => {
      if (!isMounted.current) return;
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!isMounted.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    
    const animate = () => {
      if (!isMounted.current) return;
      
      const elapsedTime = clock.getElapsedTime();
      const scrollY = window.scrollY || window.pageYOffset || 0;
      
      coreMat.uniforms.uTime.value = elapsedTime;
      
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;
      coreMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      coreMesh.rotation.y = elapsedTime * 0.1;
      coreMesh.rotation.x = elapsedTime * 0.05;

      ring1.rotation.x = (Math.PI / 2) + elapsedTime * 0.2;
      ring1.rotation.y = elapsedTime * 0.1;
      
      ring2.rotation.y = (Math.PI / 3) - elapsedTime * 0.15;
      ring2.rotation.z = elapsedTime * 0.1;

      ring3.rotation.x = (Math.PI / 4) + elapsedTime * 0.05;
      ring3.rotation.z = -elapsedTime * 0.08;

      bgParticlesMesh.rotation.y = elapsedTime * 0.03;

      masterGroup.position.x += (mouse.x * 2 - masterGroup.position.x) * 0.05;
      masterGroup.position.y += (mouse.y * 2 - masterGroup.position.y) * 0.05;

      camera.position.y = -(scrollY * 0.012);
      masterGroup.rotation.y = scrollY * 0.001;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isMounted.current = false;
      
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch (e) {}
      }
      
      try {
        bgParticlesGeo.dispose();
        bgParticlesMat.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        ringGeo1.dispose();
        ringGeo2.dispose();
        ringGeo3.dispose();
        ringMat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      } catch (e) {}
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />;
};

// --- APP PRINCIPAL ---
const App = () => {
  const containerRef = useRef(null);
  const backgroundGlowRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lenisRef = useRef(null);
  const isMounted = useRef(true);

  // Inicializar Lenis
  useEffect(() => {
    isMounted.current = true;
    document.body.style.cursor = 'none';
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenisRef.current = lenis;
    
    lenis.on('scroll', ScrollTrigger.update);
    
    const raf = (time) => {
      if (isMounted.current) {
        lenis.raf(time * 1000);
      }
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    
    setTimeout(() => {
      if (isMounted.current) {
        setLoading(false);
      }
    }, 2500);
    
    return () => {
      isMounted.current = false;
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Refrescar ScrollTrigger
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (isMounted.current) {
          ScrollTrigger.refresh();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Detectar sección activa
  useEffect(() => {
    if (loading) return;
    
    const sections = ['hero', 'proyectos', 'experiencia', 'skills', 'contacto'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [loading]);

  // GSAP Animaciones Generales
  useGSAP(() => {
    const handleMouseMove = (e) => {
      if (backgroundGlowRef.current && isMounted.current) {
        gsap.to(backgroundGlowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 2,
          ease: "power2.out",
        });
      }
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

  // Scroll Horizontal
  useEffect(() => {
    if (loading || !isMounted.current) return;

    const slider = document.querySelector(".horizontal-slider");
    const wrapper = document.querySelector(".horizontal-wrapper");
    
    if (!slider || !wrapper) return;

    let scrollTriggerInstance = null;
    
    const tl = gsap.to(slider, {
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

    if (tl.scrollTrigger) {
      scrollTriggerInstance = tl.scrollTrigger;
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      tl.kill();
    };
  }, [loading]);

  // Función para manejar clic en proyectos
  const handleProjectClick = (project) => {
    if (project.isPrivate) {
      setSelectedProject(project);
      setIsModalOpen(true);
    } else if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen w-full text-zinc-300 font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative">
      <Preloader />
      <CustomCursor />
      
      <PrivateProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <ThreeBackground />
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      <div 
        ref={backgroundGlowRef} 
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-cyan-900/15 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[1]"
      ></div>

      <NavBar scrollToSection={scrollToSection} activeSection={activeSection} />

      {/* HERO SECTION MEJORADO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-24 max-w-7xl mx-auto relative z-10">
        
        {/* Badge de disponibilidad */}
        <div className="font-mono text-xs mb-8 hero-fade flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-emerald-400 uppercase tracking-widest">Disponible para proyectos</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">//</span>
          <span className="text-cyan-500">[ {YOUR_TITLE} ]</span>
        </div>
        
        {/* Nombre con tipografía mejorada */}
        <div className="flex flex-col mb-8 relative">
          <h1 className="text-[15vw] md:text-[10rem] lg:text-[13rem] font-black text-white tracking-tighter leading-[0.85] uppercase">
            <div className="hero-mask overflow-hidden">
              <span className="inline-block">LUIS</span>
            </div>
          </h1>
          <h1 className="text-[15vw] md:text-[10rem] lg:text-[13rem] font-black tracking-tighter leading-[0.85] uppercase -mt-2 md:-mt-4">
            <div className="hero-mask overflow-hidden">
              <span className="inline-block bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-500 bg-clip-text text-transparent italic">
                MORENO
              </span>
            </div>
          </h1>
        </div>
        
        {/* Descripción + stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <p className="hero-fade md:col-span-2 max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed border-l-2 border-cyan-500/50 pl-6">
            {CV_DATA.about}
          </p>
          
          <div className="hero-fade flex md:flex-col gap-6 md:gap-3 md:border-l md:border-zinc-800 md:pl-6">
            {CV_DATA.stats.map((stat, i) => (
              <div key={i}>
                <div className={`text-3xl font-black ${i === 1 ? 'text-cyan-400' : 'text-white'}`}>
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTAs y socials */}
        <div className="hero-fade flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <button 
            onClick={() => scrollToSection('proyectos')}
            className="magnetic group flex items-center gap-3 bg-white text-black px-7 py-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-cyan-400 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Ver Proyectos 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex gap-3">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" 
               className="magnetic p-3 rounded-full border border-zinc-800 hover:bg-cyan-500 hover:border-cyan-500 hover:text-black transition-all bg-black/50 backdrop-blur-md">
              <Github className="w-5 h-5" />
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"
               className="magnetic p-3 rounded-full border border-zinc-800 hover:bg-cyan-500 hover:border-cyan-500 hover:text-black transition-all bg-black/50 backdrop-blur-md">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${YOUR_EMAIL}`}
               className="magnetic p-3 rounded-full border border-zinc-800 hover:bg-cyan-500 hover:border-cyan-500 hover:text-black transition-all bg-black/50 backdrop-blur-md">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-fade">
          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent"></div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL PROJECTS SECTION */}
      <section id="proyectos" className="horizontal-wrapper relative w-full h-screen flex items-center overflow-hidden border-y border-zinc-900/50 z-10 bg-gradient-to-b from-transparent via-black/40 to-transparent backdrop-blur-[2px]">
        
        <div className="absolute top-20 md:top-24 left-6 md:left-24 z-20 mix-blend-difference text-white pointer-events-none">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Proyectos.</h2>
          <p className="font-mono text-cyan-500 mt-2">// ARQUITECTURAS_DESPLEGADAS</p>
        </div>

        <div className="horizontal-slider flex h-[60vh] md:h-[70vh] items-center gap-10 px-6 md:px-24 w-max">
          {!loading && PROJECTS.map((project) => (
            <div 
              key={project.id} 
              onClick={() => handleProjectClick(project)}
              className={`horizontal-slide relative flex-shrink-0 w-[85vw] md:w-[550px] h-[80%] rounded-3xl overflow-hidden group border border-zinc-800/50 hover:border-cyan-500/50 transition-all duration-700 hover:scale-[1.02] cursor-pointer ${project.isPrivate ? 'private-project' : ''}`}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => { 
                    e.target.src = `https://via.placeholder.com/600x400/0a0a0a/06b6d4?text=${encodeURIComponent(project.name)}`; 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Contenido */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  {/* Índice + categoría */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-cyan-500 font-bold">
                      {String(project.id).padStart(2, '0')} /
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Icono estado */}
                  <div className={`p-2 rounded-full border transition-all ${
                    project.isPrivate 
                      ? 'bg-cyan-500/10 border-cyan-500/30' 
                      : 'bg-black/50 border-zinc-800 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10'
                  }`}>
                    {project.isPrivate ? (
                      <Lock className="w-4 h-4 text-cyan-500" />
                    ) : (
                      <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                    )}
                  </div>
                </div>

                <div>
                  {/* Año */}
                  <div className="font-mono text-xs text-zinc-500 mb-2">{project.year}</div>
                  
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-4 group-hover:-translate-y-1 transition-transform duration-500 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md line-clamp-2 mb-6">
                    {project.description}
                  </p>
                  
                  {/* Tags inferiores */}
                  <div className="flex items-center justify-between pt-5 border-t border-zinc-800/50">
                    <span className="font-mono text-[10px] px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 uppercase tracking-wider">
                      {project.language}
                    </span>
                    <div className="flex items-center gap-2 text-zinc-500 group-hover:text-cyan-400 transition-colors">
                      <span className="font-mono text-[10px] uppercase tracking-widest">
                        {project.isPrivate ? 'Confidencial' : 'Explorar'}
                      </span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="horizontal-slide flex-shrink-0 w-[85vw] md:w-[400px] h-[80%] flex flex-col items-center justify-center text-center p-10 bg-zinc-950/80 backdrop-blur-xl border border-zinc-900 rounded-3xl">
            <Lock className="w-10 h-10 text-cyan-900 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Próximos Proyectos</h3>
            <p className="text-zinc-500">Desarrollo de plataformas internas y arquitecturas complejas bajo acuerdos de confidencialidad.</p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION - TIMELINE VERTICAL */}
      <section id="experiencia" className="py-32 px-6 max-w-6xl mx-auto relative z-10">
        <div className="reveal mb-20 text-center">
          <span className="font-mono text-xs text-cyan-500 uppercase tracking-[0.3em]">// Mi camino</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 tracking-tighter uppercase">
            Trayectoria
          </h2>
        </div>
        
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent md:-translate-x-1/2"></div>
          
          <div className="flex flex-col gap-12">
            {CV_DATA.experience.map((job, idx) => (
              <div key={idx} className={`reveal relative flex flex-col md:flex-row gap-8 items-start ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                
                {/* Punto en la timeline */}
                <div className="absolute left-4 md:left-1/2 top-8 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)] -translate-x-1/2 z-20 border-2 border-zinc-950"></div>
                
                {/* Card */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-6 md:p-8 hover:border-cyan-500/50 hover:bg-zinc-900/70 transition-all duration-500 relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/15 transition-all"></div>
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="font-mono text-xs text-cyan-400 font-bold">
                        {job.period}
                      </div>
                      <Briefcase className="w-4 h-4 text-zinc-600 group-hover:text-cyan-500 transition-colors" />
                    </div>
                    
                    <div className="text-lg md:text-xl font-black text-white mb-1 uppercase tracking-tight relative z-10">
                      {job.company}
                    </div>
                    
                    <div className="text-sm text-cyan-400 mb-4 font-medium relative z-10">
                      {job.role}
                    </div>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                      {job.desc}
                    </p>
                  </div>
                </div>
                
                {/* Espacio vacío */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS GRID */}
      <section id="skills" className="py-32 px-6 max-w-7xl mx-auto relative z-10 border-t border-zinc-900/50 bg-black/40 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="reveal col-span-1 md:col-span-2 lg:col-span-4 mb-10">
             <span className="font-mono text-xs text-cyan-500 uppercase tracking-[0.3em]">// Herramientas</span>
             <h2 className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tighter uppercase">Stack Técnico.</h2>
          </div>
          
          {CV_DATA.skills.map((skillGroup, idx) => {
            const IconComponent = SKILL_ICONS[skillGroup.category] || Cpu;
            return (
              <div 
                key={idx} 
                className="reveal magnetic bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 hover:border-cyan-500/50 hover:bg-zinc-900/90 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-black border border-zinc-800 rounded-xl group-hover:border-cyan-500/50 transition-colors">
                    <IconComponent className="w-6 h-6 text-cyan-500" />
                  </div>
                  <span className="font-mono text-xs text-zinc-700 group-hover:text-cyan-500 transition-colors">
                    {String(skillGroup.items.length).padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className="font-mono text-zinc-100 text-sm uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4">
                  {skillGroup.category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <li 
                      key={i} 
                      className="px-3 py-1.5 bg-black border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-default"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Education Box */}
          <div className="reveal col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {CV_DATA.education.map((edu, idx) => (
              <div key={idx} className="bg-zinc-950/80 backdrop-blur-md border border-zinc-900 p-8 rounded-3xl flex justify-between items-end group hover:border-cyan-900 transition-colors">
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

      {/* FOOTER / CONTACT MEJORADO */}
      <section id="contacto" className="py-40 px-6 border-t border-zinc-900 bg-gradient-to-b from-black/80 to-zinc-950 backdrop-blur-xl relative overflow-hidden z-10">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="reveal max-w-4xl mx-auto relative z-10 text-center">
          
          <span className="font-mono text-xs text-cyan-500 uppercase tracking-[0.3em]">// ¿Trabajamos juntos?</span>
          
          <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-black text-white mt-6 mb-8 tracking-tighter uppercase leading-[0.85]">
            Hablemos
            <span className="text-cyan-500">.</span>
          </h2>
          
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-12">
            Estoy abierto a oportunidades de desarrollo Full Stack, proyectos de IA y colaboraciones técnicas. Respondo en menos de 24 horas.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`mailto:${YOUR_EMAIL}`} 
              className="magnetic group bg-white text-black px-8 py-5 font-bold text-xs tracking-widest uppercase rounded-full flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4" /> 
              Enviar Email
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href={`https://wa.me/${YOUR_PHONE.replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noreferrer" 
              className="magnetic group bg-transparent border border-zinc-700 text-white px-8 py-5 font-bold text-xs tracking-widest uppercase rounded-full flex items-center justify-center gap-3 hover:border-cyan-500 hover:text-cyan-400 transition-all"
            >
              WhatsApp
            </a>
          </div>
          
          {/* Footer info */}
          <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-zinc-600">
            <div>© 2026 Luis Moreno. Todos los derechos reservados.</div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              Disponible para trabajar
            </div>
            <div>Hecho con React + Three.js</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;