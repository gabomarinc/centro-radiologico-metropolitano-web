
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Calendar,
  MessageCircle,
  HelpCircle,
  Layers,
  Zap,
  Activity,
  Baby,
  Star,
  CheckCircle2,
  Users,
  Award,
  HeartPulse,
  Info,
  TrendingUp,
  Search,
  FileText
} from 'lucide-react';

import { SERVICES, BRANCHES, VALUES } from './constants';
import { askConcierge } from './services/gemini';

// --- Icon Mapper ---
const IconMap: Record<string, React.ReactNode> = {
  Layers: <Layers size={24} />,
  Zap: <Zap size={24} />,
  Baby: <Baby size={24} />,
  Activity: <Activity size={24} />,
};

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkText = isScrolled || pathname !== '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-effect py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <img src="/dist/img/logo.webp" alt="Logo Metropolitano" className="w-11 h-11 object-contain group-hover:scale-105 transition-transform" />
          <div>
            <span className={`text-2xl font-extrabold tracking-tight block leading-none transition-colors ${isDarkText ? 'text-slate-900' : 'text-slate-900'}`}>METROPOLITANO</span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#6C569E] block mt-0.5 text-center md:text-left">Panamá | Radiología</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {[
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/servicios' },
            { name: 'Sedes', path: '/sedes' },
            { name: 'Nosotros', path: '/nosotros' }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-semibold transition-colors ${pathname === item.path ? 'text-[#6C569E]' : 'text-slate-600 hover:text-[#6C569E]'}`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/contacto" className="bg-[#6C569E] text-white px-7 py-3 rounded-full text-sm font-bold hover:bg-[#5d4a87] transition-all shadow-xl shadow-purple-100 hover:shadow-purple-200 active:scale-95">
            Agendar Cita
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-900">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-6 space-y-4">
            {[
              { name: 'Inicio', path: '/' },
              { name: 'Servicios', path: '/servicios' },
              { name: 'Sedes', path: '/sedes' },
              { name: 'Nosotros', path: '/nosotros' }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-bold text-slate-800"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-[#6C569E] text-white text-center py-4 rounded-2xl font-bold"
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-2">
          <div className="flex items-center space-x-3 mb-8">
            <img src="/dist/img/logo.webp" alt="Logo Metropolitano" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-white tracking-tight">METROPOLITANO</span>
          </div>
          <p className="text-slate-500 max-w-sm mb-10 leading-relaxed text-lg">
            Líderes en radiología en Panamá. Combinamos el rigor clínico más exigente con una calidez humana que transforma la experiencia diagnóstica.
          </p>
          <div className="flex space-x-5">
            {[MessageCircle, Phone, Activity].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center hover:bg-[#6C569E] hover:text-white transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-8 text-lg">Estudios</h4>
          <ul className="space-y-4 font-medium">
            {SERVICES.map(s => (
              <li key={s.id}><Link to="/servicios" className="hover:text-[#6C569E] transition-colors">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-8 text-lg">Central de Citas</h4>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Phone size={20} className="text-[#6C569E] shrink-0" />
              <div>
                <span className="block text-white font-bold text-lg">+507 263-5555</span>
                <span className="text-sm">Línea directa Panamá</span>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin size={20} className="text-[#6C569E] shrink-0" />
              <span className="text-sm">Panamá: Marbella & Costa del Este</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center text-xs tracking-wide">
        <p>© 2024 Centro Radiológico Metropolitano Panamá. Todos los derechos reservados.</p>
        <div className="flex space-x-8 mt-6 md:mt-0 uppercase font-bold text-slate-600">
          <a href="#" className="hover:text-white">Privacidad</a>
          <a href="#" className="hover:text-white">Transparencia</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- AI Concierge ---
const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: '¡Hola! Soy tu asistente en Metropolitano Panamá. ¿Cómo puedo ayudarte con tu preparación médica hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    const botResponse = await askConcierge(userText);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[550px] rounded-[32px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-[#6C569E] p-6 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Stethoscope size={20} />
              </div>
              <div>
                <span className="font-bold block leading-tight">Asistente Panamá</span>
                <span className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Guía de Pacientes</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <X size={24} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                  ? 'bg-[#6C569E] text-white rounded-tr-none'
                  : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none font-medium'
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-slate-100 flex space-x-1">
                  <span className="w-2 h-2 bg-[#6C569E] rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-[#6C569E] rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-[#6C569E] rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ej: ¿Ayuno para resonancia?"
              className="flex-1 bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#6C569E] transition-all outline-none"
            />
            <button
              onClick={handleSend}
              className="w-12 h-12 bg-[#6C569E] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-100 hover:bg-[#5d4a87] transition-all active:scale-90"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#6C569E] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full"></div>
          <HelpCircle size={30} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

// --- Page Components ---

const HomePage = () => (
  <div className="relative">
    {/* Hero Section */}
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
          alt="Clínica Moderna Panamá"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#F1ECF9]/80 via-white to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-20">
        <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
          <div className="inline-flex items-center space-x-2 bg-[#F1ECF9] border border-purple-200 text-[#6C569E] px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] mb-10">
            <Star size={12} fill="currentColor" />
            <span>Referente Médico en Panamá</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-slate-950 leading-[1.05] mb-8 text-balance">
            Tecnología <br /> de punta en <span className="text-[#6C569E] italic">Panamá.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed font-medium">
            Líderes en diagnóstico por imagen con más de 40 años brindando certeza y tranquilidad a las familias panameñas.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/contacto" className="bg-[#6C569E] text-white px-10 py-5 rounded-[20px] font-bold text-lg hover:bg-[#5d4a87] transition-all shadow-2xl shadow-purple-100 flex items-center justify-center space-x-3 group">
              <span>Agendar mi estudio</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/servicios" className="flex items-center justify-center space-x-3 text-slate-900 font-bold hover:text-[#6C569E] transition-colors group">
              <span className="border-b-2 border-slate-900 group-hover:border-[#6C569E] py-1 transition-all">Ver especialidades</span>
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="mt-20 pt-12 border-t border-slate-100 grid grid-cols-3 gap-10">
            <div>
              <div className="text-4xl font-extrabold text-slate-900 mb-1">40+</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Años de Trayectoria</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-slate-900 mb-1">2</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sedes Modernas</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-slate-900 mb-1">100%</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compromiso</div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block animate-in zoom-in duration-1000 delay-300">
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#F1ECF9]/50 rounded-full blur-[100px] -z-10"></div>
          <div className="bg-white p-5 rounded-[56px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white/50 animate-float">
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
              alt="Radiología Avanzada"
              className="rounded-[40px] w-full h-[550px] object-cover"
            />
            <div className="absolute bottom-12 -left-12 bg-white/90 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white max-w-xs">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-[#6C569E] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                  <Award />
                </div>
                <span className="font-extrabold text-slate-900 text-lg leading-tight">Certificación de Calidad</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">Cumplimos con los más rigurosos estándares de salud de la República de Panamá.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Stats & Benefits */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-[#6C569E] text-white rounded-[28px] flex items-center justify-center mb-8 shadow-xl shadow-purple-100 group-hover:-translate-y-2 transition-transform">
              <TrendingUp size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Resultados en Línea</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Acceda a sus resultados e imágenes desde nuestro portal digital las 24 horas del día.</p>
          </div>
          <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-[#4AAC3D] text-white rounded-[28px] flex items-center justify-center mb-8 shadow-xl shadow-green-100 group-hover:-translate-y-2 transition-transform">
              <ShieldCheck size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Máxima Seguridad</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Equipos de baja radiación calibrados bajo normativas internacionales de protección.</p>
          </div>
          <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-[#4a3866] text-white rounded-[28px] flex items-center justify-center mb-8 shadow-xl shadow-slate-200 group-hover:-translate-y-2 transition-transform">
              <Users size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Staff Especializado</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Radiólogos panameños altamente capacitados con subespecialidades clínicas.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Our Steps Section */}
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6">Su salud en <span className="text-[#6C569E]">3 simples pasos.</span></h2>
          <p className="text-xl text-slate-500 font-medium">Facilitamos su proceso para que su única prioridad sea estar bien.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-16 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#F1ECF9] -translate-y-1/2 -z-10"></div>
          <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm text-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#6C569E] text-white rounded-full flex items-center justify-center font-black">1</div>
            <div className="w-16 h-16 bg-[#F1ECF9] text-[#6C569E] rounded-2xl flex items-center justify-center mx-auto mb-8"><Search size={32} /></div>
            <h4 className="text-xl font-bold mb-4">Elija su estudio</h4>
            <p className="text-slate-500 text-sm font-medium">Explore nuestro catálogo de especialidades diagnósticas.</p>
          </div>
          <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm text-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#6C569E] text-white rounded-full flex items-center justify-center font-black">2</div>
            <div className="w-16 h-16 bg-[#F1ECF9] text-[#6C569E] rounded-2xl flex items-center justify-center mx-auto mb-8"><Calendar size={32} /></div>
            <h4 className="text-xl font-bold mb-4">Agende su Cita</h4>
            <p className="text-slate-500 text-sm font-medium">En línea o por teléfono en la sede más cercana a usted.</p>
          </div>
          <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm text-center relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#6C569E] text-white rounded-full flex items-center justify-center font-black">3</div>
            <div className="w-16 h-16 bg-[#F1ECF9] text-[#6C569E] rounded-2xl flex items-center justify-center mx-auto mb-8"><FileText size={32} /></div>
            <h4 className="text-xl font-bold mb-4">Reciba su reporte</h4>
            <p className="text-slate-500 text-sm font-medium">Acceso digital inmediato a sus resultados y placas.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight">Excelencia Médica <br /><span className="text-[#6C569E] italic">a su alcance.</span></h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">Contamos con la infraestructura más completa de Panamá para diagnósticos precisos.</p>
          </div>
          <Link to="/servicios" className="group flex items-center space-x-3 text-[#6C569E] font-bold text-lg mb-2">
            <span>Ver portafolio Panamá</span>
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center shadow-md group-hover:bg-[#6C569E] group-hover:text-white transition-all">
              <ChevronRight />
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s) => (
            <div key={s.id} className="group bg-white p-10 rounded-[40px] border border-slate-100 hover:border-purple-200 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F1ECF9] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#6C569E] rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-purple-100 group-hover:-translate-y-2 transition-transform">
                  {IconMap[s.iconName]}
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">{s.description}</p>
                <Link to={`/servicios`} className="text-[#6C569E] font-bold text-sm inline-flex items-center space-x-2 group/btn">
                  <span>Detalles del estudio</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Human Experience Section */}
    <section className="py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="bg-[#6C569E] rounded-[60px] p-2 rotate-2 scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200"
                alt="Atención Médica Metropolitano Panamá"
                className="rounded-[56px] h-[600px] w-full object-cover -rotate-2"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white rounded-[40px] shadow-2xl p-10 max-w-sm border border-slate-50">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-lg font-bold text-slate-900 italic mb-4">"En Metropolitano Panamá me sentí escuchada y cuidada. La rapidez y la calidez del personal en Marbella fue excepcional."</p>
              <span className="font-extrabold text-[#6C569E] uppercase tracking-widest text-xs">— María Castillo, Paciente</span>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-8 leading-tight">Expertos en <br /><span className="text-[#6C569E] italic">cuidar de usted.</span></h2>
            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-[#6C569E]" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-2">Protocolos ALARA</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">Aplicamos el principio "As Low As Reasonably Achievable" para asegurar la menor radiación posible.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center shrink-0">
                  <Clock className="text-[#6C569E]" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-2">Puntualidad Panameña</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">Respetamos su tiempo. Nuestra gestión de citas está optimizada para que su espera sea mínima.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center shrink-0">
                  <Microscope className="text-[#6C569E]" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-2">Interpreta un Especialista</h4>
                  <p className="text-slate-500 leading-relaxed font-medium">Cada estudio es revisado minuciosamente por médicos radiólogos expertos en su patología.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Final */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#6C569E] rounded-[64px] p-16 md:p-32 text-center relative overflow-hidden text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#8672b3] via-transparent to-transparent opacity-50"></div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-10 relative z-10 leading-none">Su salud no <br /> puede esperar.</h2>
          <p className="text-xl md:text-2xl text-purple-50 mb-16 max-w-2xl mx-auto font-medium relative z-10">Agenda hoy mismo tu estudio en nuestras sedes de Marbella o Costa del Este.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8 relative z-10">
            <Link to="/contacto" className="bg-white text-[#6C569E] px-12 py-6 rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
              Agendar Cita Ahora
            </Link>
            <a href="tel:+5072635555" className="flex items-center space-x-4 text-white font-bold text-lg hover:underline decoration-2">
              <Phone size={24} />
              <span>+507 263-5555</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ServicesPage = () => (
  <div className="pt-32 pb-32">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-32 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-950 mb-8">Especialidades Panamá</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          Descubra por qué somos la referencia en imagenología en todo el país. Tecnología de clase mundial operada por expertos locales.
        </p>
      </div>

      <div className="space-y-40">
        {SERVICES.map((s, idx) => (
          <div key={s.id} className={`flex flex-col lg:flex-row items-center gap-24 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1 w-full">
              <div className="relative rounded-[60px] overflow-hidden shadow-2xl aspect-square lg:aspect-[4/3] group">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4">
                    {IconMap[s.iconName]}
                  </div>
                  <h3 className="text-3xl font-extrabold text-white">{s.title}</h3>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <span className="text-[#6C569E] font-extrabold uppercase tracking-[0.3em] text-sm block mb-6">Diagnóstico Panamá</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-8 leading-tight">{s.title}</h2>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed font-medium">
                {s.longDescription}
              </p>

              <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 mb-12">
                <h4 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><Calendar size={18} className="text-[#6C569E]" /></div>
                  <span>Preparación para su estudio</span>
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
                  {s.preparation.map((p, i) => (
                    <li key={i} className="flex items-center space-x-3 text-slate-600 font-bold text-sm">
                      <CheckCircle2 size={16} className="text-[#4AAC3D]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/contacto" className="inline-flex items-center space-x-4 bg-slate-950 text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#6C569E] transition-all shadow-xl active:scale-95 group">
                <span>Agendar en Panamá</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BranchesPage = () => (
  <div className="pt-32 pb-32 medical-gradient min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-950 mb-8">Nuestras Sedes</h1>
        <p className="text-xl text-slate-600 font-medium">Contamos con ubicaciones estratégicas en la Ciudad de Panamá para su mayor comodidad.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-24">
        {BRANCHES.map(b => (
          <div key={b.id} className="bg-white rounded-[60px] shadow-2xl overflow-hidden group border border-white">
            <div className="h-80 relative overflow-hidden">
              <img
                src={b.id === 'marbella'
                  ? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
                  : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                }
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt={b.name}
              />
              <div className="absolute inset-0 bg-[#6C569E]/20 mix-blend-multiply"></div>
              <div className="absolute top-8 left-8">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[#6C569E] font-black text-xs uppercase tracking-widest">{b.id === 'marbella' ? 'Principal' : 'Sede Este'}</span>
              </div>
            </div>
            <div className="p-12">
              <h3 className="text-4xl font-extrabold text-slate-950 mb-8">{b.name}</h3>
              <div className="space-y-8 mb-12">
                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 bg-[#F1ECF9] rounded-2xl flex items-center justify-center shrink-0 text-[#6C569E]"><MapPin size={24} /></div>
                  <p className="text-lg text-slate-600 font-bold leading-relaxed">{b.address}</p>
                </div>
                <div className="flex items-center space-x-5">
                  <div className="w-12 h-12 bg-[#F1ECF9] rounded-2xl flex items-center justify-center shrink-0 text-[#6C569E]"><Phone size={24} /></div>
                  <p className="text-2xl text-slate-950 font-black">{b.phone}</p>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 bg-[#F1ECF9] rounded-2xl flex items-center justify-center shrink-0 text-[#6C569E]"><Clock size={24} /></div>
                  <p className="text-slate-500 font-medium">{b.hours}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`} target="_blank" className="bg-slate-50 text-slate-900 text-center py-5 rounded-3xl font-bold hover:bg-slate-100 transition-all">Como llegar</a>
                <Link to="/contacto" className="bg-[#6C569E] text-white text-center py-5 rounded-3xl font-bold shadow-xl shadow-purple-100 hover:bg-[#5d4a87] transition-all">Agendar Cita</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-950 rounded-[60px] p-16 md:p-24 text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6C569E]/20 rounded-full blur-[120px]"></div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 relative z-10">Instalaciones en el corazón de Panamá</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-16 relative z-10">Diseñamos espacios que brindan serenidad y confort absoluto para todos nuestros pacientes panameños.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {['Wifi Alta Velocidad', 'Café & Snacks', 'Valet Parking', 'Accesibilidad Universal'].map((feat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl">
              <div className="text-[#6C569E] mb-4 flex justify-center"><CheckCircle2 size={32} /></div>
              <span className="text-white font-bold text-sm">{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="pt-32">
    {/* Hero Nosotros */}
    <section className="pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[#6C569E] font-black uppercase tracking-[0.4em] text-xs mb-8 block">Excelencia Panameña</span>
            <h1 className="text-5xl md:text-8xl font-extrabold text-slate-950 mb-10 leading-[0.95] tracking-tighter">Pasión por la <br /><span className="text-[#6C569E]">precisión.</span></h1>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed mb-12">
              Metropolitano Panamá nació con una visión clara: elevar los estándares de salud en el país a través de la mejor tecnología de imagen del mundo.
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-slate-200">
                    <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="Doctor Metropolitano" />
                  </div>
                ))}
              </div>
              <div>
                <span className="block font-black text-slate-900">Equipo en Panamá</span>
                <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">Especialistas Certificados</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-[80px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" className="w-full h-[700px] object-cover" alt="Metropolitano Panamá" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-12 rounded-[50px] shadow-2xl border border-slate-50 max-w-xs z-20">
              <Award className="text-[#6C569E] mb-6" size={48} />
              <h4 className="text-xl font-extrabold text-slate-900 mb-2">Salud sin fronteras</h4>
              <p className="text-sm text-slate-500 font-medium">Reconocidos por el Ministerio de Salud como centro de referencia diagnóstica.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Mision / Vision */}
    <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6C569E] via-transparent to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32">
          <div>
            <h2 className="text-4xl font-extrabold mb-10 flex items-center space-x-4">
              <span className="w-12 h-0.5 bg-[#6C569E]"></span>
              <span>Nuestra Misión</span>
            </h2>
            <p className="text-3xl font-light text-slate-300 leading-relaxed italic">
              "Brindar diagnósticos de la más alta precisión tecnológica a cada familia en Panamá, con un compromiso absoluto hacia la salud y la dignidad humana."
            </p>
          </div>
          <div>
            <h2 className="text-4xl font-extrabold mb-10 flex items-center space-x-4">
              <span className="w-12 h-0.5 bg-[#6C569E]"></span>
              <span>Nuestra Visión</span>
            </h2>
            <p className="text-3xl font-light text-slate-300 leading-relaxed italic">
              "Ser la institución líder en innovación diagnóstica de Centroamérica, siendo referente de calidad clínica y atención humanizada."
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Valores */}
    <section className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-extrabold text-slate-950 mb-6">Nuestros Valores</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">La esencia de nuestro servicio en cada rincón de Panamá.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, i) => (
            <div key={i} className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#6C569E] shadow-sm mb-8">
                {i === 0 && <ShieldCheck size={32} />}
                {i === 1 && <Zap size={32} />}
                {i === 2 && <HeartPulse size={32} />}
                {i === 3 && <Award size={32} />}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{val.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 pb-32 medical-gradient min-h-screen">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-24">
        <div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-950 mb-10 leading-none">Cerca de usted <br /> en <span className="text-[#6C569E]">Panamá.</span></h1>
          <p className="text-xl text-slate-600 font-medium mb-16 max-w-lg">Resuelva cualquier duda o agende su cita directamente con nuestras sucursales en Marbella o Costa del Este.</p>

          <div className="space-y-10">
            {BRANCHES.map(b => (
              <div key={b.id} className="bg-white/80 backdrop-blur-md p-10 rounded-[40px] shadow-xl border border-white hover:scale-[1.02] transition-transform">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-6">{b.name}</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-[#6C569E] shrink-0" size={24} />
                    <span className="text-slate-600 font-bold leading-relaxed">{b.address}</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="text-[#6C569E] shrink-0" size={24} />
                    <span className="text-slate-900 font-black text-xl">{b.phone}</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="text-[#6C569E] shrink-0" size={24} />
                    <span className="text-slate-500 font-medium text-sm">{b.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl shadow-purple-200/50 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F1ECF9]/50 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <h2 className="text-3xl font-extrabold text-slate-950 mb-10 text-center">Agendar mi Cita</h2>
          <form className="space-y-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Nombre Completo</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#6C569E] outline-none transition-all" placeholder="Ej. Ricardo Martinelli" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Teléfono Panamá</label>
                <input type="tel" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#6C569E] outline-none transition-all" placeholder="+507 XXXX-XXXX" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Correo Electrónico</label>
              <input type="email" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#6C569E] outline-none transition-all" placeholder="paciente@metropolitano.com.pa" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Tipo de Estudio</label>
              <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#6C569E] outline-none transition-all appearance-none">
                <option>Seleccionar servicio</option>
                {SERVICES.map(s => <option key={s.id}>{s.title}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Sede Preferida</label>
              <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-900 font-bold focus:ring-2 focus:ring-[#6C569E] outline-none transition-all appearance-none">
                <option>Seleccionar sede</option>
                {BRANCHES.map(b => <option key={b.id}>{b.name}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full bg-[#6C569E] text-white font-extrabold py-5 rounded-[24px] text-lg hover:bg-[#5d4a87] hover:shadow-2xl shadow-purple-200 transition-all active:scale-95">
              Confirmar Solicitud de Cita
            </button>
            <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Su información está protegida por la ley de protección de datos personales de Panamá.</p>
          </form>
        </div>
      </div>
    </div>
  </div>
);

const App = () => (
  <Router>
    <div className="min-h-screen bg-slate-50 selection:bg-[#F1ECF9] selection:text-blue-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/sedes" element={<BranchesPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <AIChat />
    </div>
  </Router>
);

export default App;
