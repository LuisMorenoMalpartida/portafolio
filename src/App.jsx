import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Github, Linkedin, Mail, Terminal, Code, Cpu, 
  ExternalLink, Briefcase, FolderOpen, ArrowRight, BookOpen
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURACIÓN DEL USUARIO ---
const GITHUB_USERNAME = "LuisMorenoMalpartida"; 
const YOUR_NAME = "LUIS MORENO";
const YOUR_TITLE = "INGENIERO DE SOFTWARE CON I.A"; //[cite: 1]
const YOUR_EMAIL = "gus6bmp@gmail.com"; //[cite: 1]
const YOUR_PHONE = "+51 912439638"; //[cite: 1]

// -----------------------------------------------------------
// --- ELIGE AQUÍ LOS PROYECTOS QUE QUIERES MOSTRAR ---
// Escribe el nombre EXACTO del repositorio tal como está en GitHub
// -----------------------------------------------------------
const SELECTED_REPOS = [
  "Altera-Labs-360",
  "QA-Station-Pro",
  "MisRestaurantes",
  "Fogon-Gaucho"
];

// --- DATOS DEL CV LUIS MORENO ---
const CV_DATA = {
  about: "Ingeniero de Software con especialización en IA y experiencia en desarrollo Full Stack bajo metodología SCRUM[cite: 1]. Perfil proactivo y orientado a resultados, enfocado en la entrega de productos de alta calidad mediante la aplicación de metodologías de Testing y Aseguramiento de Calidad (QA), incluyendo pruebas funcionales, de regresión y herramientas automatizadas para garantizar la robustez del sistema[cite: 1].",
  skills: [
    { category: "Lenguajes", items: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "HTML/CSS"] }, //[cite: 1]
    { category: "Frameworks & Libs", items: ["React", "Next.js", "Laravel", "Tailwind CSS", "FastAPI", "GSAP", "Flutter"] }, //[cite: 1]
    { category: "Base de Datos & Cloud", items: ["MySQL", "MongoDB", "PostgreSQL", "Supabase", "Neon", "AWS (Básico)", "Azure (Básico)"] }, //[cite: 1]
    { category: "QA, DevOps & Tools", items: ["Selenium", "Postman", "JMeter", "PHPUnit", "Docker", "Vercel", "Jira", "Scrum"] } //[cite: 1]
  ],
  experience: [
    {
      role: "Programador Junior | Líder de equipo", //[cite: 1]
      company: "ALTERA FINANCE", //[cite: 1]
      period: "Feb 2026 - Actualidad", //[cite: 1]
      desc: "Desarrollo Frontend y Backend con Next.js, PostgreSQL, Neon, Flutter y FastAPI[cite: 1]. Liderazgo de equipos en modalidad Squads autónomos, supervisando avances, manejando APIs, endpoints y pruebas de testing[cite: 1]."
    },
    {
      role: "Programador Junior Web Full Stack", //[cite: 1]
      company: "AM CONSULTORIA", //[cite: 1]
      period: "Jun 2025 - Nov 2025", //[cite: 1]
      desc: "Proyecto Full Stack de gestión de proyectos con tablero Kanban interactivo, visualización de datos, validaciones avanzadas y testing responsive[cite: 1]. Implementación de un módulo de IA para análisis de riesgos y predicción de fallos en cronogramas[cite: 1]."
    },
    {
      role: "Programador Junior Web", //[cite: 1]
      company: "ARTE IDEAS", //[cite: 1]
      period: "Feb 2025 - Jun 2025", //[cite: 1]
      desc: "Desarrollo de interfaz de usuario con HTML, CSS, JavaScript y WordPress[cite: 1]. Backend con PHP, MySQL y JQuery. Realización de pruebas de APIs/Endpoints (Testing de Integración) bajo metodología SCRUM[cite: 1]."
    },
    {
      role: "Líder y coordinador de proyectos web", //[cite: 1]
      company: "ICSM Instituto Científico Minero", //[cite: 1]
      period: "2024 - 2025", //[cite: 1]
      desc: "Full Developer (Frontend - Backend). Dirección de un equipo de desarrollo para la construcción de la página web utilizando la metodología SCRUM[cite: 1]."
    }
  ],
  education: [
    {
      degree: "Carrera de Ingeniería de Software con IA", //[cite: 1]
      institution: "Senati (Independencia - Lima)", //[cite: 1]
      period: "2022 - 2025 (Egresado)" //[cite: 1]
    },
    {
      degree: "Dibujante Autocad (Básico - Intermedio - Avanzado)", //[cite: 1]
      institution: "Unimaster", //[cite: 1]
      period: "2024" //[cite: 1]
    }
  ]
};

const NavBar = ({ scrollToSection }) => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 transition-all">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="text-white font-bold tracking-tighter text-xl flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
        <Terminal className="w-5 h-5" />
        <span>LM.DEV</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium font-mono text-zinc-400">
        {['Proyectos', 'Experiencia', 'Educación', 'Skills'].map((item) => (
          <button 
            key={item} 
            onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
            className="hover:text-white transition-colors uppercase tracking-widest"
          >
            // {item}
          </button>
        ))}
      </div>
      <button 
        onClick={() => document.getElementById('contacto').scrollIntoView({behavior:'smooth'})}
        className="bg-white text-black px-4 py-2 text-sm font-bold hover:bg-zinc-200 transition-colors"
      >
        CONTACTAR
      </button>
    </div>
  </nav>
);

const App = () => {
  const containerRef = useRef(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.to('.reveal-overlay', { height: 0, duration: 1, ease: 'expo.inOut', stagger: 0.1 })
      .from('.hero-text', { y: 100, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, "-=0.5")
      .from('.hero-sub', { opacity: 0, duration: 1 }, "-=0.5");

    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: { trigger: header, start: 'top 90%' },
        x: -50, opacity: 0, duration: 0.8, ease: 'expo.out'
      });
    });

    gsap.utils.toArray('.fade-up').forEach(element => {
      gsap.from(element, {
        scrollTrigger: { trigger: element, start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
      });
    });
  }, { scope: containerRef });

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Obtenemos un límite mayor de repositorios para asegurar que encontramos los elegidos
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        if (!response.ok) throw new Error('Error');
        const data = await response.json();
        
        // Filtramos la data para que coincida SÓLO con los nombres en SELECTED_REPOS
        const filteredRepos = data.filter(repo => SELECTED_REPOS.includes(repo.name));
        
        // Si por alguna razón no encuentra los repos (nombres mal escritos), usamos un fallback
        if (filteredRepos.length > 0) {
          setRepos(filteredRepos);
        } else {
          throw new Error('Repos no encontrados');
        }

      } catch (error) {
        // Fallback dinámico basado en tus proyectos en caso de fallo de API
        setRepos([
          { id: 1, name: "Altera-Labs-360", description: "Laboratorio inteligente e incubadora de negocios para emprendedores.", language: "Next.js" },
          { id: 2, name: "QA-Station-Pro", description: "Programa de escritorio robusto para workflows de QA y análisis de datos.", language: "Java" },
          { id: 3, name: "MisRestaurantes", description: "Aplicación móvil para guardar y clasificar restaurantes usando .NET MAUI.", language: "C#" },
          { id: 4, name: "Fogon-Gaucho", description: "Plataforma interactiva de menú digital para restaurante.", language: "Astro" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-black min-h-screen w-full text-zinc-300 font-sans selection:bg-white selection:text-black">
      
      <div className="reveal-overlay fixed top-0 left-0 w-full h-screen bg-zinc-900 z-[60] origin-top"></div>
      
      <NavBar scrollToSection={scrollToSection} />

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-7xl mx-auto relative">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-zinc-900/50 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="font-mono text-zinc-500 mb-6 text-sm md:text-base flex items-center gap-2 hero-sub">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          SISTEMA EN LÍNEA // DISPONIBLE PARA TRABAJO
        </div>
        
        <div className="overflow-hidden">
          <h1 className="hero-text text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter leading-none mb-4 uppercase">
            {YOUR_NAME.split(' ')[0]} <br /> {YOUR_NAME.split(' ')[1]}
          </h1>
        </div>
        
        <div className="overflow-hidden mb-12">
          <h2 className="hero-text text-xl md:text-3xl text-zinc-400 font-light tracking-tight">
            {YOUR_TITLE}
          </h2>
        </div>
        
        <p className="hero-sub max-w-2xl text-zinc-400 text-lg md:text-xl leading-relaxed mb-12 border-l-2 border-zinc-800 pl-6">
          {CV_DATA.about}
        </p>
        
        <div className="hero-sub flex gap-6 items-center">
          <a href="#contacto" className="group flex items-center gap-3 bg-white text-black px-6 py-3 font-bold hover:bg-zinc-200 transition-all">
            INICIAR PROYECTO <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-zinc-500 hover:text-white transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="proyectos" className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-header text-4xl md:text-5xl font-black text-white mb-16 tracking-tighter uppercase flex items-center gap-4">
            <Code className="w-8 h-8 text-zinc-600" /> Proyectos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {!loading && repos.map((repo, idx) => (
              <a key={idx} href={repo.html_url || "#"} target="_blank" rel="noreferrer" className="fade-up block group relative bg-zinc-950 border border-zinc-800 p-8 hover:border-zinc-500 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs font-mono text-zinc-500 mb-4">{repo.language || 'Code'}</div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">{repo.name}</h3>
                <p className="text-zinc-400 leading-relaxed">{repo.description}</p>
                <div className="mt-8 h-[1px] w-0 bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experiencia" className="py-32 px-6 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-header text-4xl md:text-5xl font-black text-white mb-16 tracking-tighter uppercase flex items-center gap-4">
            <Briefcase className="w-8 h-8 text-zinc-600" /> Experiencia Laboral
          </h2>
          
          <div className="flex flex-col border-t border-zinc-800">
            {CV_DATA.experience.map((job, idx) => (
              <div key={idx} className="fade-up flex flex-col md:flex-row py-8 border-b border-zinc-800 group hover:bg-zinc-900/30 transition-colors px-4 -mx-4">
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                  <div className="font-mono text-zinc-500 text-sm mb-1">{job.period}</div>
                  <div className="font-bold text-white uppercase tracking-wide text-sm">{job.company}</div>
                </div>
                <div className="w-full md:w-3/4">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    {job.role}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed max-w-3xl">
                    {job.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="educacion" className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-header text-3xl md:text-4xl font-black text-white mb-12 tracking-tighter uppercase flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-zinc-600" /> Educación
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CV_DATA.education.map((edu, idx) => (
              <div key={idx} className="fade-up border border-zinc-800 p-6 bg-zinc-950/30">
                <div className="font-mono text-zinc-500 text-xs mb-2">{edu.period}</div>
                <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                <p className="text-zinc-400">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-32 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-header text-4xl md:text-5xl font-black text-white mb-16 tracking-tighter uppercase flex items-center gap-4">
            <Cpu className="w-8 h-8 text-zinc-600" /> Tecnologías
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CV_DATA.skills.map((skillGroup, idx) => (
              <div key={idx} className="fade-up">
                <h3 className="font-mono text-zinc-500 text-sm uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">
                  // {skillGroup.category}
                </h3>
                <ul className="flex flex-col gap-3">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="text-lg text-zinc-300 font-medium hover:text-white transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-zinc-700 inline-block"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-32 px-6 border-t border-zinc-900 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)]" style={{ backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-3xl mx-auto relative z-10 fade-up">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase">
            Iniciemos un proceso.
          </h2>
          <p className="text-xl text-zinc-400 mb-12 font-light">
            Arquitectura escalable. Código limpio. Calidad asegurada.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href={`mailto:${YOUR_EMAIL}`} className="group bg-white text-black px-8 py-4 font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-200 transition-colors">
              <Mail className="w-5 h-5" /> ENVIAR EMAIL
            </a>
            <a href={`https://wa.me/${YOUR_PHONE.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="group bg-transparent border border-zinc-700 text-white px-8 py-4 font-bold text-lg flex items-center justify-center gap-3 hover:border-white transition-colors">
              <Terminal className="w-5 h-5" /> WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-zinc-600 font-mono text-sm border-t border-zinc-900">
        <p>SYSTEM.OUT.PRINTLN("© {new Date().getFullYear()} {YOUR_NAME}. ALL RIGHTS RESERVED.");</p>
      </footer>
    </div>
  );
};

export default App;