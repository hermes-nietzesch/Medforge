/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Calendar, 
  FlaskConical, 
  BrainCircuit, 
  BarChart3, 
  Bolt, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  Camera, 
  Upload, 
  Loader2, 
  FileText, 
  Zap, 
  HelpCircle, 
  Stethoscope, 
  Plus, 
  ArrowUp,
  Copy,
  ThumbsUp,
  RefreshCw,
  Save,
  Brain,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { Screen, TimetableItem, SpecialtyConfidence } from './types';

// --- Components ---

const BottomNav = ({ activeScreen, setScreen }: { activeScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems: { id: Screen; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'plan', label: 'Plan', icon: Calendar },
    { id: 'lab', label: 'Lab', icon: FlaskConical },
    { id: 'mentor', label: 'Mentor', icon: BrainCircuit },
    { id: 'progress', label: 'Status', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-10 pt-4 bg-background/90 backdrop-blur-xl border-t border-primary/10 shadow-[0_-4px_40px_rgba(0,82,54,0.15)] z-50 rounded-t-[3rem]">
      {navItems.map((item) => {
        const isActive = activeScreen === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 ${
              isActive 
                ? 'bg-primary/10 text-primary rounded-full px-5 py-2.5 scale-105' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[9px] uppercase tracking-[0.15em] font-bold mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const TopBar = ({ title, subtitle, showMentorBadge = true }: { title: string; subtitle?: string; showMentorBadge?: boolean }) => {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4 border-b border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-primary/20">
          <img 
            alt="User Profile" 
            className="w-full h-full object-cover" 
            src="https://picsum.photos/seed/doctor/200/200"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white tracking-tighter">{title}</span>
          {subtitle && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider w-fit">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {showMentorBadge && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Zap size={14} className="text-primary fill-primary" />
          <span className="font-sans tracking-tight font-bold text-xs text-primary uppercase">Mentor Ready</span>
        </div>
      )}
    </header>
  );
};

// --- Screens ---

const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto px-6 pt-6 space-y-6 pb-32"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface border border-white/5 p-5 rounded-3xl">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Confidence</p>
          <div className="flex flex-col">
            <span className="text-4xl font-black text-primary tracking-tighter">42%</span>
            <span className="text-xs font-semibold text-primary/80 mt-1">+18% change</span>
          </div>
        </div>
        <div className="bg-surface border border-white/5 p-5 rounded-3xl flex flex-col justify-between">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Streak</p>
          <div className="flex items-center gap-2">
            <Zap size={24} className="text-orange-500 fill-orange-500" />
            <span className="text-4xl font-black text-white tracking-tighter">7 Days</span>
          </div>
        </div>
      </div>

      <section className="bg-surface border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Today's Timetable</h3>
            <span className="text-[10px] font-medium text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded-full">CONDENSED</span>
          </div>
          <div className="space-y-3">
            {[
              { time: '08:00', title: 'Surgical Ward Rounds', desc: 'Post-op management focus', active: true },
              { time: '13:00', title: 'Clinical Skills Lab', desc: 'Airway management prep', active: false },
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-4 p-3 rounded-2xl bg-surface-container-lowest border ${item.active ? 'border-primary/20' : 'border-white/5 opacity-60'}`}>
                <div className="text-[10px] font-bold text-on-surface-variant w-12 pt-1 uppercase">{item.time}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-[11px] text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative rounded-3xl overflow-hidden p-8 bg-gradient-to-br from-primary/10 via-surface to-surface-container-lowest border border-primary/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Brain size={24} />
            </div>
            <h3 className="text-xl font-black tracking-tight text-white leading-none">Your AI Mentor<br/><span className="text-primary">is ready</span></h3>
          </div>
          <div className="space-y-3 mt-6">
            {[
              'Review Pediatric Surgery differentials',
              'Master the Glasgow Coma Scale',
              'Practice 10 High-Yield MCQs'
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
                <CheckCircle2 size={18} className="text-primary" />
                <p className="text-sm text-on-surface-variant font-medium">{task}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 bg-primary hover:bg-primary/90 text-on-primary font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
            <span>Start Prep Session</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <button className="w-full py-5 px-6 rounded-3xl bg-primary border border-primary/50 hover:bg-primary/90 transition-all flex items-center justify-center group shadow-2xl shadow-primary/40 active:scale-95">
        <div className="flex items-center gap-3">
          <Zap size={24} className="text-on-primary fill-on-primary" />
          <span className="font-black text-on-primary text-xl tracking-tight uppercase">Recall Now</span>
        </div>
      </button>
    </motion.div>
  );
};

const Lab = () => {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsProcessing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto px-6 pt-8 space-y-8 pb-40"
    >
      <section>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white">AI Lab</h1>
        <p className="text-on-surface-variant text-lg">Convert raw surgery notes into clinical intelligence.</p>
      </section>

      <section className="relative group">
        <div className="w-full min-h-[220px] flex flex-col items-center justify-center gap-6 bg-surface-container-low/40 hover:bg-primary/5 transition-all cursor-pointer overflow-hidden p-8 rounded-[3rem] border-2 border-dashed border-primary/30">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center text-primary">
              <Camera size={32} />
            </div>
            <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center text-primary">
              <Upload size={32} />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">Snap handwritten notes or upload PDF handout</h3>
            <p className="text-on-surface-variant text-sm mt-2">Optimized for surgical ward rounds & theatre notes</p>
          </div>
        </div>
      </section>

      {isProcessing && (
        <section className="animate-pulse">
          <div className="bg-surface border border-primary/30 p-5 rounded-3xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Loader2 size={20} className="text-primary animate-spin" />
            </div>
            <div>
              <p className="text-white font-bold">Claude is analysing your notes...</p>
              <p className="text-xs text-primary/70">Identifying key anatomical landmarks and surgical steps</p>
            </div>
          </div>
        </section>
      )}

      {!isProcessing && (
        <section className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">Analysis Results</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full">Theatre Batch #42</span>
          </div>

          <div className="space-y-3">
            {[
              { 
                title: 'Key Points Summary', 
                icon: FileText, 
                color: 'text-primary', 
                bg: 'bg-primary/10',
                content: [
                  "Laparoscopic Cholecystectomy: Calot's triangle is defined by the cystic duct, common hepatic duct, and the inferior border of the liver.",
                  "The \"Critical View of Safety\" requires clearing the lower part of the gallbladder from the cystic plate.",
                  "Cystic artery usually arises from the right hepatic artery."
                ]
              },
              { 
                title: 'High-Yield Facts', 
                icon: Zap, 
                color: 'text-amber-400', 
                bg: 'bg-amber-500/10',
                content: ["Moynihan's Hump: A tortuous right hepatic artery that may be mistaken for the cystic artery, leading to catastrophic bleeding if ligated."]
              },
              { 
                title: '8 Generated MCQs', 
                icon: HelpCircle, 
                color: 'text-blue-400', 
                bg: 'bg-blue-500/10',
                subtitle: 'Surgical anatomy & indications'
              },
              { 
                title: '3 OSCE Stations', 
                icon: Stethoscope, 
                color: 'text-red-400', 
                bg: 'bg-red-500/10',
                subtitle: 'Hands-on prep'
              }
            ].map((item, i) => (
              <details key={i} className="group bg-surface-container-low/50 rounded-3xl border border-white/5 overflow-hidden" open={i === 0}>
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-surface-container-high/50 transition-colors list-none">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl ${item.bg} flex items-center justify-center ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-white">{item.title}</span>
                      {item.subtitle && <span className="text-xs text-on-surface-variant">{item.subtitle}</span>}
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-on-surface-variant group-open:rotate-90 transition-transform" />
                </summary>
                {item.content && (
                  <div className="px-6 pb-8 pt-2">
                    <ul className="space-y-3 text-on-surface-variant text-sm list-disc pl-5 marker:text-primary">
                      {item.content.map((line, j) => <li key={j}>{line}</li>)}
                    </ul>
                  </div>
                )}
              </details>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 pt-6">
            <button className="w-full py-4 bg-primary text-on-primary font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10 active:scale-[0.98] transition-all">
              <Save size={20} />
              <span>Save all MCQs</span>
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-4 bg-surface-container-high text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors border border-white/5">
                <Brain size={20} className="text-primary" />
                <span>Add to Recall</span>
              </button>
              <button className="py-4 bg-surface-container-high text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors border border-white/5">
                <MessageSquare size={20} className="text-primary" />
                <span>Chat with Mentor</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

const Mentor = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen pb-48"
    >
      <header className="px-6 py-4 bg-surface-container-low/50 backdrop-blur-md sticky top-[72px] z-40 border-b border-white/5">
        <h1 className="font-sans font-bold text-lg tracking-tight mb-3">AI Mentor – Consultant Mode</h1>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <button className="flex-none px-4 py-1.5 rounded-full bg-surface-container-highest text-primary text-sm font-medium border border-primary/20">
            Claude 3.5 Sonnet
          </button>
          <button className="flex-none px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest transition-colors">
            GPT-4o
          </button>
        </div>
      </header>

      <main className="flex-grow px-4 py-6 flex flex-col gap-8 max-w-3xl mx-auto w-full">
        <div className="flex flex-col items-end w-full group">
          <div className="max-w-[85%] bg-surface-container-high text-on-surface px-6 py-4 rounded-t-3xl rounded-bl-3xl shadow-sm">
            <p className="text-[15px] leading-relaxed">Review my weak areas in GI surgery.</p>
          </div>
          <span className="text-[10px] text-on-surface-variant mt-2 mr-2 font-sans tracking-widest uppercase">Sent • 09:41 AM</span>
        </div>

        <div className="flex flex-col items-start w-full gap-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <BrainCircuit size={16} className="text-primary" />
            </div>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">AI Mentor</span>
          </div>
          <div className="max-w-[90%] bg-surface-container-low/80 backdrop-blur-xl px-6 py-5 rounded-tr-3xl rounded-b-3xl relative overflow-hidden group border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 pointer-events-none"></div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold tracking-tighter uppercase">Consultant Tone</span>
              </div>
              <p className="text-[15px] leading-relaxed text-on-surface/90">
                You've shown strong grasp of surgical anatomy, but we need to sharpen your management of <span className="text-primary font-semibold">acute cholecystitis</span> and <span className="text-primary font-semibold">mesenteric ischemia</span>.
              </p>
              <p className="text-[15px] leading-relaxed text-on-surface/90 border-l-2 border-primary/30 pl-4 py-1 italic">
                Let's start with the critical view of safety in laparoscopic cholecystectomy.
              </p>
              <div className="pt-2 flex gap-3">
                <button className="text-on-surface-variant hover:text-primary transition-colors"><Copy size={16} /></button>
                <button className="text-on-surface-variant hover:text-primary transition-colors"><ThumbsUp size={16} /></button>
                <button className="text-on-surface-variant hover:text-primary transition-colors"><RefreshCw size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-24 left-0 w-full z-40 flex flex-col">
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto hide-scrollbar">
          {['Quiz me', 'Generate OSCE', 'Explain management', 'Compare medical vs surgical'].map((chip) => (
            <button key={chip} className="flex-none px-5 py-2.5 rounded-full bg-surface-container-high/90 backdrop-blur-md text-on-surface text-sm font-medium border border-white/5 hover:bg-surface-container-highest transition-all active:scale-95 whitespace-nowrap">
              {chip}
            </button>
          ))}
        </div>
        <div className="bg-background/80 backdrop-blur-xl px-4 pt-4 pb-8 border-t border-primary/10">
          <div className="flex items-center gap-3 bg-surface-container-low rounded-full px-4 py-2 border border-white/5 focus-within:border-primary/40 transition-all">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary transition-colors">
              <Plus size={20} />
            </button>
            <input 
              className="bg-transparent border-none focus:ring-0 flex-grow text-on-surface placeholder:text-on-surface-variant/50 text-[15px] py-3" 
              placeholder="Ask your AI Mentor..." 
              type="text"
            />
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/20 active:scale-90 transition-transform">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Progress = () => {
  const specialties: SpecialtyConfidence[] = [
    { name: 'Cardiology', confidence: 78, status: 'High Confidence', color: 'text-primary' },
    { name: 'Respiratory', confidence: 62, status: 'Steady Progress', color: 'text-yellow-500' },
    { name: 'GI', confidence: 45, status: 'Needs Review', color: 'text-orange-500' },
    { name: 'Neurology', confidence: 82, status: 'High Confidence', color: 'text-primary' },
    { name: 'Hematology', confidence: 58, status: 'Growing', color: 'text-yellow-500' },
    { name: 'Nephrology', confidence: 39, status: 'Critical Focus', color: 'text-orange-500' },
    { name: 'Endocrine', confidence: 76, status: 'High Confidence', color: 'text-primary' },
    { name: 'Surgery', confidence: 91, status: 'Mastered', color: 'text-primary' },
    { name: 'Pediatrics', confidence: 67, status: 'Steady', color: 'text-yellow-500' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-5xl mx-auto px-6 pt-8 space-y-8 pb-40"
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2 block">Clinical Engagement</span>
        <h1 className="text-3xl font-black tracking-tighter text-white">System Confidence Heatmap</h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specialties.map((spec, i) => (
          <div key={i} className="bg-surface-container-low/50 border border-white/5 p-6 rounded-3xl hover:bg-surface-container-high transition-colors">
            <p className="text-on-surface-variant text-sm font-medium mb-1">{spec.name}</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-black ${spec.color} tracking-tighter`}>{spec.confidence}%</span>
              <span className={`text-[10px] uppercase tracking-wider font-bold ${spec.color}/80 bg-white/5 px-2 py-0.5 rounded-full`}>
                {spec.status}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-10">
            <Zap size={120} className="text-primary fill-primary" />
          </div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap size={20} className="text-primary fill-primary" />
              </div>
              <h2 className="text-xl font-bold text-white">AI Weekly Insights</h2>
            </div>
            <div className="p-5 bg-surface-container-lowest/50 rounded-2xl border border-white/5">
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Your diagnostic accuracy in <span className="text-primary font-bold">Acute Coronary Syndrome</span> has improved by 24% this week. Rapid identification of ST-elevation patterns is excellent. However, focus on <span className="text-orange-400 font-bold">Pulmonary Function Tests (PFT)</span> next, as there is some confusion in obstructive patterns.
              </p>
            </div>
            <button className="mt-6 w-full py-4 bg-primary text-on-primary font-bold rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              <span>Generate Next Learning Path</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const Plan = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-6 pt-8 pb-40"
    >
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Today's Plan</h1>
        <p className="text-on-surface-variant">Optimize your clinical rotations and study hours with neural scheduling.</p>
      </header>

      <section className="space-y-6 mb-12">
        <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary mb-4 block">Clinical Posting Hours</label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input className="w-full bg-surface-container-highest border-0 rounded-2xl text-2xl font-bold py-4 px-6 focus:ring-2 focus:ring-primary/50 text-white" type="text" defaultValue="08:00"/>
            </div>
            <span className="text-on-surface-variant font-bold">—</span>
            <div className="flex-1">
              <input className="w-full bg-surface-container-highest border-0 rounded-2xl text-2xl font-bold py-4 px-6 focus:ring-2 focus:ring-primary/50 text-white" type="text" defaultValue="15:00"/>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5">
          <label className="text-[10px] uppercase tracking-widest font-bold text-primary mb-4 block">Extra Commitments?</label>
          <input className="w-full bg-transparent border-0 border-b-2 border-white/10 focus:border-primary focus:ring-0 text-lg font-medium py-2 px-0 placeholder:text-on-surface-variant/30 transition-colors text-white" placeholder="e.g. Call consultant, pick up scrubs..." type="text"/>
        </div>

        <button className="w-full group relative flex items-center justify-center gap-4 bg-primary text-on-primary font-bold py-6 px-8 rounded-full shadow-[0_0_40px_rgba(78,222,163,0.15)] active:scale-[0.98] transition-all duration-200">
          <Brain size={24} />
          <span className="text-lg tracking-tight">Generate Adjusted Timetable with AI</span>
        </button>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Generated Timetable</h2>
          <div className="flex items-center gap-1.5 text-primary font-bold text-[10px] tracking-widest uppercase">
            <Zap size={14} className="fill-primary" />
            <span>Optimized</span>
          </div>
        </div>
        <div className="space-y-6">
          {[
            { time: '05:00 – 07:00', title: 'Pre-Posting Intensive', desc: 'Morning Reading: Surgery High-Yields. Focus on acute abdomen differentials.' },
            { time: '08:00 – 15:00', title: 'Clinical Posting', desc: 'Teaching Hospital Rounds & Theatre. Observe laparoscopic cholecystectomy.', badge: 'Clinical' },
            { time: '15:30 – 16:30', title: 'Power Nap & Refuel', desc: 'Cognitive Reset. Hydration and light snack for sustained focus.', ai: true },
            { time: '17:00 – 21:00', title: 'Deep Study & Active Recall', desc: 'MCQ Bank + AI Mentor. Reviewing today\'s patient cases and pharmacology.' },
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">{item.time}</span>
                {item.badge && <span className="bg-secondary-container text-primary text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase">{item.badge}</span>}
              </div>
              <div className={`${item.ai ? 'ai-wash glass-card' : 'bg-surface-container-low'} p-6 rounded-3xl border border-white/5 hover:border-primary/30 transition-all`}>
                <h3 className="text-xl font-bold mb-1 text-white">{item.title}</h3>
                <p className="text-on-surface-variant text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return <Dashboard />;
      case 'plan': return <Plan />;
      case 'lab': return <Lab />;
      case 'mentor': return <Mentor />;
      case 'progress': return <Progress />;
      default: return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (activeScreen) {
      case 'dashboard': return 'MedForge AI';
      case 'plan': return 'MedForge AI';
      case 'lab': return 'MedForge AI';
      case 'mentor': return 'MedForge AI';
      case 'progress': return 'MedForge AI';
      default: return 'MedForge AI';
    }
  };

  const getSubtitle = () => {
    if (activeScreen === 'dashboard') return '6-WEEK MODE';
    return undefined;
  };

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary/30">
      <TopBar title={getTitle()} subtitle={getSubtitle()} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      <BottomNav activeScreen={activeScreen} setScreen={setActiveScreen} />
    </div>
  );
}
