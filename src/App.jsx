import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  Code, 
  Brain, 
  MessageSquare, 
  Send, 
  ExternalLink, 
  Star, 
  GitFork, 
  ChevronDown, 
  Menu, 
  X,
  User,
  Briefcase,
  Award,
  Smartphone,
  ShieldCheck,
  FileText,
  FolderOpen,
  Clock,
  Globe,
  Database,
  Layout,
  Settings
} from 'lucide-react';

// --- CONFIGURACIÓN DEL USUARIO ---
const GITHUB_USERNAME = "LuisMorenoMalpartida"; 
const YOUR_NAME = "Luis Enrique Moreno Malpartida";
const YOUR_TITLE = "Ing. Software con IA | Full Stack & Mobile | QA Automation";
const YOUR_EMAIL = "gus6bmp@gmail.com";

// --- ENLACES A DRIVE ---
const DRIVE_CURSOS = "https://drive.google.com/drive/folders/178JiAyjgCZB0eWFwjyC1zOAu3ABzVtJ0?usp=sharing";
const DRIVE_TRABAJOS = "https://drive.google.com/drive/folders/1cxZm8fYROaZRxGy_zDO5gDo6nR_pOEvI?usp=sharing";

// --- DATOS DEL CV ---
const CV_DATA = {
  about: "Estudiante avanzado de Ingeniería de Software con IA. Experto en desarrollo Full Stack y Mobile (Flutter/Dart). Me especializo en Aseguramiento de Calidad (QA) y Testing Automatizado para garantizar productos robustos. Cuento con experiencia liderando equipos bajo metodología SCRUM y aplicando Inteligencia Artificial en sectores como la minería.",
  
  // Habilidades actualizadas con niveles porcentuales
  detailedSkills: {
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "B1 - Básico" }
    ],
    programming: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "PHP", level: 80 },
      { name: "MySQL", level: 80 },
      { name: "Java", level: 75 },
      { name: "Lua", level: 60 },
      { name: "Visual Basic (VBA)", level: 60 }
    ],
    frameworks: [
      { name: "React", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "Laravel", level: 80 },
      { name: "Bootstrap", level: 85 },
      { name: "Django", level: 75 },
      { name: "Express", level: 75 },
      { name: "Vite", level: 80 },
      { name: "TypeScript", level: 70 },
      { name: "Flask", level: 70 }
    ],
    tools: [
      { name: "GitHub / Git", level: 90 },
      { name: "HTML / CSS", level: 95 },
      { name: "Jira / Trello / Notion", level: 90 },
      { name: "Inteligencia Artificial (IA)", level: 85 },
      { name: "Android Studio", level: 75 },
      { name: "Office", level: 95 },
      { name: "Discord", level: 100 }
    ],
    qa: [
      { name: "Diseño de Test Cases", level: 90 },
      { name: "Pruebas Funcionales/Regresión", level: 90 },
      { name: "Inspección de Navegador (F12)", level: 95 },
      { name: "Postman (APIs)", level: 85 },
      { name: "Selenium (Web Automation)", level: 75 },
      { name: "JMeter (Performance)", level: 70 },
      { name: "PHPUnit", level: 65 }
    ]
  },

  experience: [
    {
      role: "Líder y Coordinador de Proyectos Web",
      company: "ICSM Instituto Científico Minero",
      period: "2024 - 2025",
      desc: "Full Developer (Frontend/Backend). Dirección de equipo bajo metodología SCRUM para la construcción de plataformas web. Gestión de entregables y aseguramiento de calidad."
    },
    {
      role: "Programador Junior Web",
      company: "ARTE IDEAS",
      period: "Feb 2025 - Jun 2025",
      desc: "Desarrollo de interfaces con HTML, CSS, JS y WordPress. Backend con PHP, MySQL y JQuery. Ejecución de Testing de Integración para APIs y Endpoints. Uso de metodología SCRUM."
    }
  ],
  
  certifications: {
    courses: [
      {
        title: "IA y Machine Learning en la Minería",
        issuer: "Especialización Técnica",
        year: "2025",
        desc: "Aplicación de algoritmos de aprendizaje automático para la optimización de procesos mineros.",
        status: "in_process" 
      },
      {
        title: "Desarrollo Web Full Stack",
        issuer: "Especialización Avanzada",
        year: "2025",
        desc: "Dominio de tecnologías modernas Frontend y Backend para aplicaciones escalables.",
        status: "in_process" 
      },
      {
        title: "Idioma Inglés (Nivel B1)",
        issuer: "Certificación de Idiomas",
        year: "2025",
        desc: "Formación en habilidades comunicativas, lectura y escritura en inglés técnico.",
        status: "in_process"
      },
      {
        title: "Ingeniería de Software con IA",
        issuer: "Senati",
        year: "2022 - Presente",
        desc: "Formación profesional en desarrollo de software, algoritmos avanzados e implementación de inteligencia artificial.",
        status: "completed"
      },
      {
        title: "Dibujante Autocad (Básico - Avanzado)",
        issuer: "Unimaster",
        year: "2024",
        desc: "Diseño técnico y modelado asistido por computadora.",
        status: "completed"
      }
    ],
    jobs: [
      {
        title: "Certificado de Trabajo - ICSM",
        issuer: "Instituto Científico Minero",
        year: "2024-2025",
        desc: "Constancia de liderazgo en proyectos web y desarrollo Full Stack.",
        status: "completed"
      },
      {
        title: "Certificado de Trabajo - ARTE IDEAS",
        issuer: "ARTE IDEAS",
        year: "2025",
        desc: "Constancia de desempeño como Programador Junior Web.",
        status: "completed"
      }
    ]
  }
};

// --- COMPONENTES ---

const NavBar = ({ activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <Brain className="h-8 w-8 text-cyan-400" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Luis.AI
          </span>
        </div>
        
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {['Sobre mí', 'Proyectos', 'Experiencia', 'Certificados', 'Habilidades', 'Contacto'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300 hover:text-white">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </div>

    {mobileMenuOpen && (
      <div className="md:hidden bg-slate-900 border-b border-slate-800">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
           {['Sobre mí', 'Proyectos', 'Experiencia', 'Certificados', 'Habilidades', 'Contacto'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase().replace(' ', '-'));
                  setMobileMenuOpen(false);
                }}
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {item}
              </button>
            ))}
        </div>
      </div>
    )}
  </nav>
);

const ContactModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Contacto desde Portafolio Web");
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="text-cyan-500" /> Enviar Mensaje
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Tu mensaje (Máx 1000 caracteres)
            </label>
            <textarea
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none h-40"
              placeholder="Hola Luis, me interesa tu perfil..."
              maxLength={1000}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <div className="text-right text-xs text-slate-500 mt-1">
              {message.length}/1000
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Enviar Correo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual de Luis. Pregúntame sobre su experiencia en QA, desarrollo Mobile o sus proyectos de IA.", sender: 'ai' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let responseText = "Puedes contactarme directamente al correo: gus6bmp@gmail.com";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("hola") || lowerInput.includes("buenos")) {
        responseText = "¡Hola! Estoy aquí para contarte sobre el perfil de Luis.";
      } else if (lowerInput.includes("mobile") || lowerInput.includes("flutter") || lowerInput.includes("dart")) {
        responseText = "Luis es desarrollador Mobile con experiencia en Flutter y Dart, creando aplicaciones nativas eficientes.";
      } else if (lowerInput.includes("qa") || lowerInput.includes("testing") || lowerInput.includes("calidad")) {
        responseText = "Tiene sólida experiencia en QA, manejando pruebas funcionales, de regresión y automatización con Selenium y Postman.";
      } else if (lowerInput.includes("experiencia") || lowerInput.includes("trabajo")) {
        responseText = "Ha liderado proyectos web en ICSM y trabajado como Full Stack en Arte Ideas usando metodología SCRUM.";
      } else if (lowerInput.includes("ia") || lowerInput.includes("mineria")) {
        responseText = "Cuenta con una certificación especializada en IA y Machine Learning aplicada a la minería.";
      }

      setMessages(prev => [...prev, { text: responseText, sender: 'ai' }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-500 text-white p-4 rounded-full shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-110 flex items-center gap-2"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="font-semibold hidden md:block">Chat con mi IA</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col h-[400px]">
          <div className="bg-slate-900 p-3 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">Luis AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-cyan-600 text-white rounded-tr-none' 
                    : 'bg-slate-700 text-slate-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregúntame sobre Mobile, QA o IA..."
              className="flex-1 bg-slate-800 text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700"
            />
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-full">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ repo }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-xl hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-2">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors break-all">{repo.name}</h3>
      </div>
      <div className="flex gap-2 text-slate-400">
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
    <p className="text-slate-400 text-sm mb-4 overflow-hidden line-clamp-3 flex-grow">
      {repo.description || "Proyecto de desarrollo de software e innovación tecnológica."}
    </p>
    <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-slate-700/50">
      <div className="flex items-center gap-4">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="w-3 h-3" /> {repo.forks_count}
        </span>
      </div>
    </div>
  </div>
);

// Componente actualizado para mostrar barras de nivel
const SkillCategory = ({ title, items, icon: Icon, colorClass }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all h-full">
    <div className={`flex items-center gap-3 mb-6 pb-3 border-b border-slate-700/50 ${colorClass}`}>
      <Icon className="w-6 h-6" />
      <h3 className="font-bold text-lg text-white">{title}</h3>
    </div>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-200 font-medium">{item.name}</span>
            <span className={`${colorClass} font-mono text-xs`}>{item.level}%</span>
          </div>
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${colorClass.replace('text-', 'bg-')}`} 
              style={{ width: `${item.level}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LanguageCard = ({ lang }) => (
  <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
    <div className="flex items-center gap-3">
      <Globe className="w-5 h-5 text-cyan-400" />
      <span className="font-bold text-white">{lang.name}</span>
    </div>
    <span className="text-sm text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
      {lang.level}
    </span>
  </div>
);

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('Error fetching repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.log("Using fallback data (API limit or user not found)");
        setRepos([
          { id: 1, name: "ICSM-Web-Platform", description: "Plataforma web integral para el Instituto Científico Minero. Backend en Laravel y Frontend React.", language: "PHP", stargazers_count: 12, forks_count: 4, html_url: "#" },
          { id: 2, name: "Flutter-Mining-App", description: "App móvil para monitoreo de datos en minería usando Flutter y Dart con integración IA.", language: "Dart", stargazers_count: 8, forks_count: 2, html_url: "#" },
          { id: 3, name: "QA-Automation-Suite", description: "Suite de pruebas automatizadas con Selenium y Python para validación de flujos críticos.", language: "Python", stargazers_count: 15, forks_count: 5, html_url: "#" },
          { id: 4, name: "Arte-Ideas-Ecommerce", description: "Sitio web comercial con integración de pasarela de pagos y gestión de inventario.", language: "JavaScript", stargazers_count: 10, forks_count: 3, html_url: "#" },
          { id: 5, name: "Machine-Learning-Ores", description: "Modelo de ML para clasificación de minerales basado en imágenes.", language: "Jupyter Notebook", stargazers_count: 25, forks_count: 8, html_url: "#" },
          { id: 6, name: "Portfolio-V2", description: "Mi portafolio personal desarrollado con React y TailwindCSS.", language: "JavaScript", stargazers_count: 5, forks_count: 1, html_url: "#" },
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen w-full overflow-x-hidden text-slate-200 font-sans selection:bg-cyan-500/30">
      <NavBar 
        scrollToSection={scrollToSection} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Contact Modal */}
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Open to Work: Mobile & QA
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Luis Moreno</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-6 font-light">
            {YOUR_TITLE}
          </p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {CV_DATA.about}
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              onClick={() => scrollToSection('proyectos')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <Code className="w-5 h-5" /> Ver Proyectos
            </button>
            <button 
              onClick={() => setContactModalOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Mail className="w-5 h-5" /> Contactar
            </button>
          </div>

          <div className="mt-10 flex justify-center gap-6">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-7 h-7" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="w-7 h-7" />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Terminal className="w-8 h-8 text-cyan-500" />
            <h2 className="text-3xl font-bold text-white">Proyectos Destacados</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-20 text-slate-500">Sincronizando con GitHub...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors border-b border-cyan-400/30 pb-1">
              Ver repositorio completo <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-white">Experiencia Laboral</h2>
          </div>

          <div className="space-y-12">
            {CV_DATA.experience.map((job, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-slate-800 hover:border-purple-500/50 transition-colors group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-purple-500 group-hover:bg-purple-500 transition-colors"></div>
                <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                  <span className="text-sm font-mono text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded border border-cyan-900/50 w-fit mt-2 sm:mt-0">{job.period}</span>
                </div>
                <div className="text-xl text-purple-400 mb-4 font-medium flex items-center gap-2">
                  {job.company}
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">{job.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certificados" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-white">Certificaciones</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Columna 1: Cursos y Estudios */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" /> Cursos y Especializaciones
                </h3>
                <a 
                  href={DRIVE_CURSOS} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 px-3 py-1.5 rounded border border-slate-700 transition-colors"
                >
                  <FolderOpen className="w-3 h-3" /> Ver Carpeta
                </a>
              </div>
              
              <div className="space-y-4">
                {CV_DATA.certifications.courses.map((cert, idx) => (
                  <div key={idx} className={`bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-xl border ${cert.status === 'in_process' ? 'border-dashed border-yellow-500/50 bg-yellow-500/5' : 'border-slate-700'} hover:shadow-lg transition-all`}>
                    <div className="flex justify-between items-start mb-3">
                      {cert.status === 'in_process' ? (
                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> EN PROCESO
                        </span>
                      ) : (
                        <span className="text-slate-500 text-sm font-mono">{cert.year}</span>
                      )}
                      <Award className={`w-5 h-5 ${cert.status === 'in_process' ? 'text-yellow-500' : 'text-slate-600'}`} />
                    </div>
                    <h4 className="font-bold text-white text-lg mb-1">{cert.title}</h4>
                    <div className="text-cyan-500 text-sm mb-2">{cert.issuer}</div>
                    <p className="text-slate-400 text-sm text-justify">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna 2: Certificados de Trabajo */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-400" /> Certificados Laborales
                </h3>
                <a 
                  href={DRIVE_TRABAJOS} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-purple-400 px-3 py-1.5 rounded border border-slate-700 transition-colors"
                >
                  <FolderOpen className="w-3 h-3" /> Ver Carpeta
                </a>
              </div>

              <div className="space-y-4">
                 {CV_DATA.certifications.jobs.map((cert, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-xl border border-slate-700 hover:border-purple-500/30 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-slate-500 text-sm font-mono">{cert.year}</span>
                      <FileText className="w-5 h-5 text-slate-600" />
                    </div>
                    <h4 className="font-bold text-white text-lg mb-1">{cert.title}</h4>
                    <div className="text-purple-400 text-sm mb-2">{cert.issuer}</div>
                    <p className="text-slate-400 text-sm text-justify">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section (NUEVO DISEÑO EN COLUMNAS) */}
      <section id="habilidades" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Cpu className="w-8 h-8 text-green-500" />
            <h2 className="text-3xl font-bold text-white">Habilidades Técnicas</h2>
          </div>

          {/* Idiomas (Destacado) */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" /> Idiomas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {CV_DATA.detailedSkills.languages.map((lang, idx) => (
                <LanguageCard key={idx} lang={lang} />
              ))}
            </div>
          </div>

          {/* Grid de Categorías Técnicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkillCategory 
              title="Lenguajes de Programación" 
              items={CV_DATA.detailedSkills.programming} 
              icon={Code} 
              colorClass="text-cyan-400"
            />
            <SkillCategory 
              title="Frameworks & Librerías" 
              items={CV_DATA.detailedSkills.frameworks} 
              icon={Layout} 
              colorClass="text-purple-400"
            />
            <SkillCategory 
              title="QA, Testing & Automatización" 
              items={CV_DATA.detailedSkills.qa} 
              icon={ShieldCheck} 
              colorClass="text-green-400"
            />
             <SkillCategory 
              title="Herramientas & Plataformas" 
              items={CV_DATA.detailedSkills.tools} 
              icon={Settings} 
              colorClass="text-yellow-400"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900 opacity-50"></div>
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 text-cyan-400 mb-8 shadow-xl shadow-cyan-500/20">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para colaborar?</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Actualmente estoy buscando nuevas oportunidades en Desarrollo Software y QA. Si tienes un proyecto o vacante, hablemos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center justify-center bg-white text-slate-900 hover:bg-cyan-50 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg cursor-pointer"
            >
              <Mail className="w-5 h-5 mr-2" /> Enviar Correo
            </button>
            <a 
              href={`https://wa.me/51912439638`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-green-600 text-white hover:bg-green-500 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {YOUR_NAME}. Ingeniero de Software con IA.</p>
      </footer>

      {/* AI Floating Chat */}
      <AIChat />
    </div>
  );
};

export default App;