import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Cloud, 
  Utensils, 
  Bell, 
  Search, 
  Shield, 
  Globe, 
  ChevronLeft, 
  Send, 
  Menu as MenuIcon,
  X,
  LogOut,
  Thermometer,
  Wind,
  AlertTriangle,
  Dumbbell,
  Stethoscope,
  Mountain,
  MapPin,
  Zap,
  Wind as WindIcon,
  CloudRain,
  Map as MapIcon,
  Coffee,
  Gamepad2,
  Car,
  Building2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSLATIONS, MANUAL_CHAPTERS, CAMP_SERVICES, NEWS, CAMPS } from './constants';
import { Language, WeatherData, Camp, Alert, MapLocation } from './types';
import { askProjectAI } from './services/gemini';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type View = 'login' | 'dashboard' | 'manual' | 'weather' | 'services' | 'news' | 'search' | 'camps' | 'map';

export default function App() {
  const [view, setView] = useState<View>('login');
  const [lang, setLang] = useState<Language>('es');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState<Camp>(CAMPS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const t = TRANSLATIONS[lang];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setView('camps');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const response = await askProjectAI(searchQuery);
    setAiResponse(response);
    setIsSearching(false);
  };

  const renderHeader = () => (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white border-b border-industrial-blue/10">
      <div className="flex items-center gap-3">
        {view !== 'dashboard' && view !== 'login' && (
          <button onClick={() => setView('dashboard')} className="p-2 -ml-2 hover:bg-industrial-blue/5 rounded-full transition-colors text-industrial-blue">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-industrial-blue rounded-xl flex items-center justify-center shadow-lg shadow-industrial-blue/20">
            <span className="text-2xl font-black text-white italic">V</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter text-industrial-blue leading-none">VICUÑA</h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-industrial-muted font-bold">PROYECTO</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setLang(lang === 'es' ? 'en' : lang === 'en' ? 'fr' : 'es')}
          className="px-2 py-1 text-xs font-mono border border-industrial-blue/10 rounded text-industrial-muted hover:bg-industrial-blue/5 uppercase"
        >
          {lang}
        </button>
        {isLoggedIn && (
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-industrial-blue/5 rounded-full transition-colors text-industrial-blue">
            {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        )}
      </div>
    </header>
  );

  const renderLogin = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 industrial-card border-t-4 border-t-industrial-blue"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className="w-24 h-24 bg-industrial-blue rounded-3xl flex items-center justify-center shadow-2xl rotate-3">
              <span className="text-5xl font-black text-white italic -rotate-3">V</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-industrial-blue rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-center tracking-tight">VICUÑA <span className="text-industrial-blue">PROYECTO</span></h2>
          <p className="text-industrial-muted text-xs font-mono uppercase tracking-widest text-center mt-2">{t.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-industrial-muted mb-1 ml-1">{t.user}</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-industrial-blue outline-none transition-colors"
              placeholder="worker_id_123"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-industrial-muted mb-1 ml-1">{t.pass}</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-industrial-blue outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full py-4 industrial-button mt-4 shadow-lg shadow-industrial-blue/20">
            {t.login}
          </button>
          <button 
            type="button" 
            onClick={() => { setIsLoggedIn(false); setView('dashboard'); }}
            className="w-full py-2 text-xs text-industrial-muted hover:text-white transition-colors"
          >
            Continuar sin sesión (Modo Invitado)
          </button>
        </form>
      </motion.div>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-4 space-y-6">
      <div className="p-5 bg-industrial-blue text-white rounded-2xl shadow-xl shadow-industrial-blue/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold leading-tight text-white">{selectedCamp.name}</h3>
              <p className="text-[11px] text-white/80 uppercase font-mono tracking-wider">{selectedCamp.location}</p>
            </div>
          </div>
          <button 
            onClick={() => setView('camps')}
            className="px-4 py-2 text-[11px] font-black bg-white text-industrial-blue rounded-xl uppercase tracking-wider shadow-lg active:scale-95 transition-transform"
          >
            Cambiar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { id: 'manual', icon: Book, label: t.modules.manual, color: 'bg-industrial-blue' },
          { id: 'weather', icon: Cloud, label: t.modules.weather, color: 'bg-sky-500' },
          { id: 'services', icon: Utensils, label: t.modules.services, color: 'bg-emerald-500' },
          { id: 'map', icon: MapIcon, label: t.modules.map, color: 'bg-rose-500' },
          { id: 'news', icon: Bell, label: t.modules.news, color: 'bg-amber-500' },
          { id: 'search', icon: Search, label: t.modules.search, color: 'bg-purple-500' },
        ].map((module) => (
          <motion.button
            key={module.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView(module.id as View)}
            className="flex flex-col items-center justify-center p-6 industrial-card aspect-square gap-4 group hover:border-industrial-blue/30 transition-all shadow-sm"
          >
            <div className={cn("p-4 rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110", module.color)}>
              <module.icon className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-center leading-tight text-industrial-text">{module.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="industrial-card p-5 border-none shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black uppercase text-industrial-muted tracking-[0.2em]">Estado Operativo - {selectedCamp.name}</h3>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              selectedCamp.status === 'activo' ? 'bg-emerald-500' : 'bg-amber-500'
            )} />
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              selectedCamp.status === 'activo' ? 'text-emerald-500' : 'text-amber-500'
            )}>{t.campStatus[selectedCamp.status]}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <Thermometer className="w-6 h-6 text-sky-500" />
              <span className="text-base font-bold text-industrial-text">{selectedCamp.weather.temp}°C</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <Wind className="w-6 h-6 text-sky-500" />
              <span className="text-base font-bold text-industrial-text">{selectedCamp.weather.windSpeed} km/h</span>
            </div>
          </div>
          
          {selectedCamp.weather.alerts.length > 0 && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4">
              <div className="p-2 bg-rose-500 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider">{selectedCamp.weather.alerts.length} Alertas Activas</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCamps = () => (
    <div className="p-4 space-y-4">
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold text-industrial-text">Seleccionar Campamento</h2>
        <p className="text-xs text-industrial-muted">Elija el centro operativo para ver su estado</p>
      </div>
      <div className="grid gap-4">
        {CAMPS.map((camp) => (
          <motion.button
            key={camp.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setSelectedCamp(camp); setView('dashboard'); }}
            className={cn(
              "industrial-card p-5 text-left flex items-center justify-between border-l-4",
              selectedCamp.id === camp.id ? "border-l-industrial-blue" : "border-l-transparent"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-xl",
                camp.status === 'activo' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              )}>
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{camp.name}</h3>
                <p className="text-xs text-slate-500">{camp.location}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={cn(
                "text-[10px] font-mono uppercase px-2 py-0.5 rounded",
                camp.status === 'activo' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              )}>
                {t.campStatus[camp.status]}
              </span>
              {camp.weather.alerts.length > 0 && (
                <div className="flex items-center gap-1 mt-1 justify-end">
                  <AlertTriangle className="w-3 h-3 text-rose-500" />
                  <span className="text-[10px] text-rose-500 font-bold">{camp.weather.alerts.length}</span>
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const getLocationIcon = (type: MapLocation['type']) => {
    switch (type) {
      case 'comedor': return Coffee;
      case 'gimnasio': return Dumbbell;
      case 'recreacion': return Gamepad2;
      case 'estacionamiento': return Car;
      case 'medico': return Stethoscope;
      case 'oficina': return Building2;
      default: return Info;
    }
  };

  const renderMap = () => (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">{t.modules.map}</h2>
        <span className="text-xs font-mono text-industrial-blue uppercase bg-industrial-blue/10 px-2 py-1 rounded">
          {selectedCamp.name}
        </span>
      </div>

      <div className="relative aspect-square bg-industrial-card rounded-3xl border border-industrial-blue/5 overflow-hidden shadow-2xl">
        {/* Stylized Map Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#004A99 1px, transparent 1px), linear-gradient(90deg, #004A99 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Map Locations Pins */}
        {selectedCamp.mapLocations.map((loc) => {
          const Icon = getLocationIcon(loc.type);
          return (
            <motion.div
              key={loc.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute"
              style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="group relative">
                <div className="p-2 bg-industrial-blue text-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-white text-industrial-blue p-2 rounded-lg text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center shadow-xl border border-industrial-blue/10">
                  {loc.name}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-xl border border-industrial-blue/10">
          <p className="text-[10px] font-mono text-industrial-blue/60 uppercase mb-2">Referencia de Mapa</p>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(selectedCamp.mapLocations.map(l => l.type))).map(type => {
              const Icon = getLocationIcon(type as any);
              return (
                <div key={type} className="flex items-center gap-1.5">
                  <Icon className="w-3 h-3 text-industrial-blue" />
                  <span className="text-[9px] uppercase font-bold text-industrial-blue/80">{type}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase text-industrial-muted tracking-widest px-1">Detalle de Ubicaciones</h3>
        {selectedCamp.mapLocations.map((loc) => {
          const Icon = getLocationIcon(loc.type);
          return (
            <div key={loc.id} className="industrial-card p-4 flex items-center gap-4 border-none shadow-sm">
              <div className="p-3 bg-industrial-blue/10 text-industrial-blue rounded-xl">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">{loc.name}</h4>
                <p className="text-xs text-industrial-muted">{loc.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderManual = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">{t.modules.manual}</h2>
      {MANUAL_CHAPTERS.map((chapter) => (
        <div key={chapter.id} className="industrial-card p-4 space-y-2 border-none shadow-sm">
          <h3 className="font-bold text-industrial-blue">{chapter.title}</h3>
          <p className="text-sm text-industrial-muted leading-relaxed">{chapter.content}</p>
          <button className="text-xs font-mono text-industrial-blue uppercase tracking-wider hover:underline">
            Ver PDF Completo
          </button>
        </div>
      ))}
    </div>
  );

  const renderWeather = () => (
    <div className="p-4 space-y-6">
      <div className="industrial-card p-8 flex flex-col items-center text-center space-y-4">
        <div className="p-6 bg-sky-500/10 rounded-full">
          <Cloud className="w-20 h-20 text-sky-400" />
        </div>
        <div>
          <h2 className="text-4xl font-bold">{selectedCamp.weather.temp}°C</h2>
          <p className="text-industrial-muted uppercase tracking-widest text-xs font-mono mt-1">{selectedCamp.name}</p>
        </div>
        <div className="grid grid-cols-2 w-full gap-4 pt-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <Wind className="w-5 h-5 text-industrial-muted mb-2 mx-auto" />
            <span className="block text-lg font-bold">{selectedCamp.weather.windSpeed}</span>
            <span className="text-[10px] text-industrial-muted uppercase">km/h Viento</span>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <Thermometer className="w-5 h-5 text-industrial-muted mb-2 mx-auto" />
            <span className="block text-lg font-bold">{selectedCamp.weather.condition}</span>
            <span className="text-[10px] text-industrial-muted uppercase">Estado</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-mono uppercase text-industrial-muted tracking-widest">{t.alerts}</h3>
        {selectedCamp.weather.alerts.length === 0 ? (
          <div className="p-8 text-center industrial-card">
            <Shield className="w-10 h-10 text-emerald-500/20 mx-auto mb-2" />
            <p className="text-sm text-industrial-muted">No hay alertas activas para este campamento.</p>
          </div>
        ) : (
          selectedCamp.weather.alerts.map((alert) => (
            <div key={alert.id} className={cn(
              "industrial-card p-5 flex gap-4 border-l-4",
              alert.severity === 'high' ? "border-l-rose-500" : "border-l-amber-500"
            )}>
              <div className={cn(
                "p-3 rounded-xl h-fit",
                alert.type === 'tormenta' ? "bg-blue-500/10 text-blue-500" :
                alert.type === 'temporal' ? "bg-sky-500/10 text-sky-500" :
                alert.type === 'voladora' ? "bg-amber-500/10 text-amber-500" : "bg-white/5 text-industrial-muted"
              )}>
                {alert.type === 'tormenta' ? <Zap className="w-6 h-6" /> :
                 alert.type === 'temporal' ? <CloudRain className="w-6 h-6" /> :
                 alert.type === 'voladora' ? <WindIcon className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm uppercase tracking-tight">{alert.title}</h4>
                  <span className="text-[9px] font-mono text-industrial-muted">
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-industrial-muted leading-relaxed">{alert.message}</p>
                <div className="pt-2">
                  <span className={cn(
                    "text-[9px] font-bold uppercase px-2 py-0.5 rounded",
                    alert.severity === 'high' ? "bg-rose-500/10 text-rose-500" : "bg-amber-500/10 text-amber-500"
                  )}>
                    Prioridad {alert.severity}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">{t.modules.services}</h2>
      {CAMP_SERVICES.map((service) => (
        <div key={service.id} className="industrial-card p-5 flex gap-4">
          <div className="p-3 bg-white/5 rounded-xl h-fit">
            {service.icon === 'Utensils' ? <Utensils className="w-6 h-6 text-emerald-400" /> : 
             service.icon === 'Dumbbell' ? <Dumbbell className="w-6 h-6 text-blue-400" /> : 
             <Stethoscope className="w-6 h-6 text-rose-400" />}
          </div>
          <div className="space-y-1">
            <h3 className="font-bold">{service.name}</h3>
            <p className="text-xs font-mono text-industrial-blue">{service.schedule}</p>
            <p className="text-sm text-industrial-muted">{service.details}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNews = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">{t.modules.news}</h2>
      {NEWS.map((item) => (
        <div key={item.id} className="industrial-card overflow-hidden">
          <div className={cn(
            "h-1 w-full",
            item.category === 'seguridad' ? 'bg-rose-500' : 
            item.category === 'operativo' ? 'bg-blue-500' : 'bg-emerald-500'
          )} />
          <div className="p-5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-white/5 rounded text-industrial-muted">
                {item.category}
              </span>
              <span className="text-[10px] font-mono text-industrial-muted">{item.date}</span>
            </div>
            <h3 className="font-bold text-lg leading-tight">{item.title}</h3>
            <p className="text-sm text-industrial-muted leading-relaxed">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSearch = () => (
    <div className="p-4 flex flex-col min-h-[80vh]">
      <div className="flex-1 space-y-4">
        {aiResponse && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="industrial-card p-5 bg-industrial-blue/5 border-industrial-blue/20"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-industrial-blue rounded flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-industrial-blue">Asistente Vicuña</span>
            </div>
            <p className="text-sm leading-relaxed text-industrial-text/90 whitespace-pre-wrap">
              {aiResponse}
            </p>
          </motion.div>
        )}
        
        {isSearching && (
          <div className="flex justify-center p-8">
            <div className="w-8 h-8 border-4 border-industrial-blue border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <form onSubmit={handleSearch} className="sticky bottom-4 mt-4">
        <div className="relative">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-4 pr-14 py-4 bg-white border border-industrial-blue/10 rounded-2xl focus:border-industrial-blue outline-none shadow-xl"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="absolute right-2 top-2 bottom-2 px-4 bg-industrial-blue text-white rounded-xl disabled:opacity-50 transition-all active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-industrial-bg shadow-2xl">
      {renderHeader()}
      
      <main className="flex-1 overflow-y-auto pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {view === 'login' && renderLogin()}
            {view === 'dashboard' && renderDashboard()}
            {view === 'manual' && renderManual()}
            {view === 'weather' && renderWeather()}
            {view === 'services' && renderServices()}
            {view === 'news' && renderNews()}
            {view === 'search' && renderSearch()}
            {view === 'camps' && renderCamps()}
            {view === 'map' && renderMap()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-industrial-card z-[70] p-6 border-l border-white/5"
            >
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-industrial-blue/10 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-industrial-blue" />
                  </div>
                  <h3 className="font-bold">Franco Montiveros</h3>
                  <p className="text-xs text-industrial-muted font-mono">ID: 10235457</p>
                </div>

                <nav className="flex-1 space-y-2">
                  <button onClick={() => { setView('map'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <MapIcon className="w-5 h-5 text-industrial-muted" />
                    <span className="text-sm">Mapa del Campamento</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Shield className="w-5 h-5 text-industrial-muted" />
                    <span className="text-sm">Seguridad</span>
                  </button>
                </nav>

                <button 
                  onClick={() => { setIsLoggedIn(false); setView('login'); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 p-3 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors mt-auto"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-bold">Cerrar Sesión</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Industrial Grid Overlay (Visual Style) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1]" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    </div>
  );
}
