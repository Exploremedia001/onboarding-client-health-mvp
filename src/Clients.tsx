import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, AlertCircle, CheckCircle2, AlertTriangle, 
  ArrowRight, TrendingUp, TrendingDown, Users, Bell, ArrowLeft
} from 'lucide-react';

// Data from user's image & requirements
const ALL_CLIENTS = [
  { id: 1, name: "Foundation Health & Wellness", status: "green", category: "Health & Wellness", score: 92, alerts: 0, trend: "up", revenue: "$4,200", lastChecked: "10m ago" },
  { id: 2, name: "JAG Medical Spa", status: "yellow", category: "Medical Spa", score: 74, alerts: 2, trend: "down", revenue: "$3,100", lastChecked: "1h ago" },
  { id: 3, name: "Vital Roots Functional Medicine", status: "green", category: "Medical", score: 88, alerts: 0, trend: "up", revenue: "$2,800", lastChecked: "2h ago" },
  { id: 4, name: "Core Wellness & Recovery", status: "red", category: "Health & Wellness", score: 54, alerts: 5, trend: "down", revenue: "$1,900", lastChecked: "5m ago" },
  { id: 5, name: "Vitality Medical Spa", status: "green", category: "Medical Spa", score: 95, alerts: 0, trend: "up", revenue: "$5,500", lastChecked: "15m ago" },
  { id: 6, name: "Inner Calm Therapy Center", status: "yellow", category: "Therapy", score: 78, alerts: 1, trend: "up", revenue: "$1,200", lastChecked: "3h ago" },
  { id: 7, name: "Precision HVAC Experts", status: "green", category: "HVAC", score: 91, alerts: 0, trend: "up", revenue: "$7,200", lastChecked: "20m ago" },
  { id: 8, name: "Apex Climate Control", status: "red", category: "HVAC", score: 61, alerts: 4, trend: "down", revenue: "$4,500", lastChecked: "2m ago" },
  { id: 9, name: "Comfort Zone Heating & Air", status: "yellow", category: "HVAC", score: 68, alerts: 2, trend: "down", revenue: "$3,800", lastChecked: "1h ago" },
  { id: 10, name: "Elite Air Systems", status: "green", category: "HVAC", score: 85, alerts: 0, trend: "up", revenue: "$5,100", lastChecked: "4h ago" },
  { id: 11, name: "Rapid Response Air", status: "red", category: "HVAC", score: 45, alerts: 7, trend: "down", revenue: "$2,100", lastChecked: "1m ago" },
  { id: 12, name: "Pure Air Solutions", status: "green", category: "HVAC", score: 94, alerts: 0, trend: "up", revenue: "$6,300", lastChecked: "30m ago" },
  { id: 13, name: "Airflow Masters", status: "yellow", category: "HVAC", score: 72, alerts: 1, trend: "up", revenue: "$4,100", lastChecked: "2h ago" },
  { id: 14, name: "Frosty Systems", status: "green", category: "HVAC", score: 89, alerts: 0, trend: "up", revenue: "$5,800", lastChecked: "5h ago" },
  { id: 15, name: "Prime Comfort HVAC", status: "red", category: "HVAC", score: 58, alerts: 3, trend: "down", revenue: "$3,400", lastChecked: "12m ago" },
];

export default function ClientsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredClients = ALL_CLIENTS.filter(client => {
    if (filter !== 'all' && client.status !== filter) return false;
    if (search && !client.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: ALL_CLIENTS.length,
    green: ALL_CLIENTS.filter(c => c.status === 'green').length,
    yellow: ALL_CLIENTS.filter(c => c.status === 'yellow').length,
    red: ALL_CLIENTS.filter(c => c.status === 'red').length,
  };

  const navigateToDashboard = (clientName: string) => {
    localStorage.setItem('selectedClient', clientName);
    window.location.href = `/dashboard.html?client=${encodeURIComponent(clientName)}`;
  };

  const handleSignOut = () => {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = '/';
  };

  return (
    <div className="h-screen bg-[#fdfaf1] font-sans text-slate-900 flex flex-col overflow-hidden">
      <header className="fixed top-0 left-0 right-0 h-24 md:h-28 bg-white/80 backdrop-blur-md border-b border-[#e6dec9] flex items-center z-30 flex-shrink-0">
        {/* Logo Container aligned with Sidebar */}
        <div className="w-64 h-full border-r border-[#e6dec9] flex items-center justify-center flex-shrink-0">
          <a href="/" className="flex items-center justify-center h-full w-full px-4">
            <img 
              src="/logo.svg" 
              alt="Explore Media" 
              className="h-20 md:h-24 opacity-90 object-contain max-w-full"
            />
          </a>
        </div>
        
        {/* Rest of the Navbar */}
        <div className="flex-1 flex items-center justify-between px-8 h-full relative">
          <div className="flex items-center gap-6">
            <button 
               onClick={() => window.location.href='/'} 
               className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium bg-transparent border-0 cursor-pointer"
            >
               <ArrowLeft size={16} /> Back to Home
            </button>
          </div>

          {/* Title in center */}
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl text-[#142f45] hidden md:flex items-center gap-2 pointer-events-none">
            <Users size={20} className="text-[#607484]" /> Client Health Overview
          </h1>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors bg-transparent border-0 cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="w-9 h-9 rounded-full bg-[#142f45] text-white flex items-center justify-center font-semibold text-sm shadow-sm ring-2 ring-white">
              AM
            </div>

            <div className="h-6 w-px bg-[#e6dec9]"></div>

            <button 
              onClick={handleSignOut} 
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-medium text-sm hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer border-0"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container under Navbar */}
      <div className="flex flex-1 pt-24 md:pt-28 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-[#e6dec9] flex flex-col shrink-0 h-full relative z-20">
          <div className="py-6 flex-1 overflow-y-auto hidden-scrollbar">
            <div className="text-[11px] uppercase text-[#94a3b8] font-bold tracking-[0.05em] px-4 mb-2">
              Client Health
            </div>
            <div className="flex flex-col gap-1 px-4">
               <StatusCard 
                 title="Total Clients" count={stats.total} 
                 icon={<Users size={18} />} 
                 color="blue" isActive={filter === 'all'} onClick={() => setFilter('all')} 
               />
               <StatusCard 
                 title="Critical Issues" count={stats.red} 
                 icon={<AlertCircle size={18} />} 
                 color="red" isActive={filter === 'red'} onClick={() => setFilter('red')}
               />
               <StatusCard 
                 title="Warnings" count={stats.yellow} 
                 icon={<AlertTriangle size={18} />} 
                 color="yellow" isActive={filter === 'yellow'} onClick={() => setFilter('yellow')}
               />
               <StatusCard 
                 title="Healthy" count={stats.green} 
                 icon={<CheckCircle2 size={18} />} 
                 color="green" isActive={filter === 'green'} onClick={() => setFilter('green')}
               />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative w-full">
          {/* Wave background like in dashboard */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
             {/* Simple static wave-like gradients using tailwind */}
             <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
             <div className="absolute top-40 -left-20 w-72 h-72 bg-emerald-100/50 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 px-8 pt-6 pb-8 w-full min-h-full flex flex-col">


          {/* Controls */}
          <div className="flex justify-between items-center mb-6 z-20">
             <div className="text-lg font-bold text-[#142f45] tracking-tight">
                {filter === 'all' ? 'All Clients' : filter === 'green' ? 'Healthy Clients' : filter === 'yellow' ? 'Clients with Warnings' : 'Clients with Critical Issues'}
             </div>
             <div className="relative w-full sm:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Search clients..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e6dec9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#142f45]/20 focus:border-[#142f45] transition-all placeholder:text-slate-400 shadow-sm"
               />
             </div>
          </div>

          {/* Table/List */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-[#e6dec9] shadow-sm overflow-hidden flex-1 flex flex-col relative z-20"
          >
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#e6dec9] text-[#64748b] text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-bold whitespace-nowrap">Health Status & Client</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">SEO Score</th>
                    <th className="px-6 py-4 font-bold whitespace-nowrap">Current Revenue</th>
                    <th className="px-6 py-4 font-bold">Alerts</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredClients.map((client, i) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                          opacity: { duration: 0.2 },
                          y: { duration: 0.2 },
                          layout: { type: "spring", stiffness: 500, damping: 50 } 
                        }}
                        key={client.id} 
                        className="border-b border-slate-100 hover:bg-[#f8fafc] transition-colors group cursor-pointer"
                        onClick={() => navigateToDashboard(client.name)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <StatusDot status={client.status} />
                            <div>
                              <div className="font-semibold text-slate-800 text-[14px]">{client.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">Checked {client.lastChecked}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="px-2.5 py-1 bg-slate-100 text-[#475569] rounded-md text-xs font-medium whitespace-nowrap border border-slate-200">
                            {client.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                             <span className={`font-semibold ${client.score >= 80 ? 'text-[#059669]' : client.score >= 60 ? 'text-[#d97706]' : 'text-[#dc2626]'}`}>
                               {client.score}/100
                             </span>
                             {client.trend === 'up' ? <TrendingUp size={14} className="text-[#10b981]" /> : <TrendingDown size={14} className="text-[#ef4444]" />}
                           </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {client.revenue}
                        </td>
                        <td className="px-6 py-4">
                          {client.alerts > 0 ? (
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-max border ${client.status === 'red' ? 'bg-[#fef2f2] text-[#dc2626] border-[#fee2e2]' : 'bg-[#fffbeb] text-[#d97706] border-[#fef3c7]'}`}>
                              <AlertCircle size={12} /> {client.alerts} Alerts
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-max border bg-[#ecfdf5] text-[#059669] border-[#d1fae5]">
                              <CheckCircle2 size={12} /> Clear
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 text-slate-400 group-hover:text-[#142f45] group-hover:bg-[#f1f5f9] rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); navigateToDashboard(client.name); }}>
                            <ArrowRight size={18} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {filteredClients.length === 0 && (
                    <tr>
                       <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                          <div className="flex flex-col items-center justify-center">
                             <Search size={32} className="block mb-4 text-slate-300" />
                             <span className="text-base font-medium">No clients found matching your criteria.</span>
                          </div>
                       </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>

      <style>{`
        .hidden-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .hidden-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hidden-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 20px;
        }
      `}</style>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  if (status === 'red') {
    return (
      <div className="relative flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500 shadow-sm shadow-rose-500/40"></span>
      </div>
    );
  }
  if (status === 'yellow') {
    return (
      <div className="relative flex h-3.5 w-3.5">
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/20"></span>
      </div>
    );
  }
  return (
    <div className="relative flex h-3.5 w-3.5">
      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-sm shadow-emerald-500/30"></span>
    </div>
  );
}

type StatusColor = 'blue' | 'red' | 'yellow' | 'green';

interface StatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: StatusColor;
  isActive: boolean;
  onClick: () => void;
}

function StatusCard({ title, count, icon, color, isActive, onClick }: StatusCardProps) {
  const iconActiveColor: Record<StatusColor, string> = {
    blue: 'text-blue-600',
    red: 'text-rose-600',
    yellow: 'text-amber-500',
    green: 'text-emerald-600',
  };

  const bgActiveColor = 'bg-[#142f45]/[0.08] text-[#142f45]';

  return (
    <motion.button 
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${isActive ? bgActiveColor : 'hover:bg-[#f8fafc] text-[#0c304f]'}`}
    >
       <div className="flex items-center gap-3">
         <div className={`flex items-center justify-center ${isActive ? iconActiveColor[color] : 'text-[#607484]'}`}>
            {React.cloneElement(icon as React.ReactElement, { size: 18 })}
         </div>
         <div className={`text-sm font-medium ${isActive ? 'text-[#142f45]' : 'text-[#0c304f]'}`}>{title}</div>
       </div>
       <div className={`text-sm font-bold ${isActive ? iconActiveColor[color] : 'text-slate-500'}`}>
         {count}
       </div>
    </motion.button>
  );
}
