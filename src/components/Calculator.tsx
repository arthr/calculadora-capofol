import React, { useState, useMemo } from 'react';
import { RECIPE, WEIGHTS, CAPOFOL_BATCH_WEIGHT, CAPOFOL_UNITS_PER_BATCH, Ingredients } from '../constants';
import { Hexagon, Leaf, Syringe, Pipette, FlaskConical, Scale, Dna } from 'lucide-react';

export function Calculator() {
  const [inventory, setInventory] = useState<Record<Ingredients, number | ''>>({
    opium: '',
    leaves: '',
    syringe: '',
    needle: '',
  });

  const handleInputChange = (item: Ingredients, value: string) => {
    const parsed = value.replace(/\D/g, '');
    setInventory((prev) => ({
      ...prev,
      [item]: parsed === '' ? '' : parseInt(parsed, 10),
    }));
  };

  const maxProduction = useMemo(() => {
    const quantities = {
      opium: Math.floor((inventory.opium || 0) / RECIPE.opium),
      leaves: Math.floor((inventory.leaves || 0) / RECIPE.leaves),
      syringe: Math.floor((inventory.syringe || 0) / RECIPE.syringe),
      needle: Math.floor((inventory.needle || 0) / RECIPE.needle),
    };
    return Math.min(quantities.opium, quantities.leaves, quantities.syringe, quantities.needle);
  }, [inventory]);

  const leftovers = useMemo(() => {
    return {
      opium: (inventory.opium || 0) - maxProduction * RECIPE.opium,
      leaves: (inventory.leaves || 0) - maxProduction * RECIPE.leaves,
      syringe: (inventory.syringe || 0) - maxProduction * RECIPE.syringe,
      needle: (inventory.needle || 0) - maxProduction * RECIPE.needle,
    };
  }, [inventory, maxProduction]);

  const totalWeightIn = useMemo(() => {
    return (
      (inventory.opium || 0) * WEIGHTS.opium +
      (inventory.leaves || 0) * WEIGHTS.leaves +
      (inventory.syringe || 0) * WEIGHTS.syringe +
      (inventory.needle || 0) * WEIGHTS.needle
    );
  }, [inventory]);

  const totalCapofolWeight = maxProduction * CAPOFOL_BATCH_WEIGHT;
  const totalCapofolUnits = maxProduction * CAPOFOL_UNITS_PER_BATCH;
  const leftoverWeight = useMemo(() => {
    return (
      leftovers.opium * WEIGHTS.opium +
      leftovers.leaves * WEIGHTS.leaves +
      leftovers.syringe * WEIGHTS.syringe +
      leftovers.needle * WEIGHTS.needle
    );
  }, [leftovers]);

  return (
    <div className="min-h-[100dvh] bg-black text-white font-sans p-2 sm:p-4 md:p-8 flex flex-col items-center justify-center selection:bg-[#D946EF]/30 relative overflow-x-hidden">
      
      {/* Background Ambient Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url('${import.meta.env.BASE_URL}background.jpg')` }}
      />
      
      {/* Overlay gradient to maintain tech-dark mood and readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-t from-black/90 via-[#0D0D14]/70 to-[#1E1E28]/30 pointer-events-none" />

      {/* Main Window */}
      <div className="w-full max-w-5xl bg-[#1E1E28]/50 backdrop-blur-xl border border-white/10 rounded-md p-4 sm:p-6 md:p-10 shadow-2xl shadow-black/50 space-y-4 sm:space-y-8 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 sm:pb-6 gap-3 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-[#D946EF]/10 rounded-md border border-[#D946EF]/30 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
              <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#D946EF]" />
            </div>
            <div>
              <h1 className="text-sm md:text-lg font-semibold text-white tracking-wide uppercase flex items-center">
                CAPOFOL <span className="text-[#A1A1AA] font-normal mx-2 hidden sm:inline">/</span><span className="hidden sm:inline text-[#A1A1AA] font-medium">CALCULADORA DE PRODUÇÃO</span>
              </h1>
              <h2 className="text-[10px] sm:hidden text-[#A1A1AA] tracking-wide uppercase mt-0.5">CALCULADORA DE PRODUÇÃO</h2>
            </div>
          </div>
          <div className="flex bg-[#282832]/50 border border-white/10 rounded-md px-4 sm:px-5 py-2 sm:py-3 items-center justify-between gap-4 sm:gap-6 w-full md:w-auto">
             <div className="flex items-center gap-1.5 sm:gap-2 text-[#A1A1AA]">
               <Scale className="w-3.5 h-3.5" />
               <h2 className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">Peso dos Materiais</h2>
             </div>
             <p className="text-base sm:text-xl font-mono font-semibold text-white whitespace-nowrap">
               {totalWeightIn.toFixed(2)}<span className="text-[#A1A1AA] text-xs sm:text-sm ml-1 font-sans font-normal">kg</span>
             </p>
          </div>
        </header>

        {/* Body */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-8 items-start">
          
          {/* Left Column */}
          <section className="lg:col-span-5 space-y-3 sm:space-y-6">
            <h3 className="text-[11px] sm:text-xs font-medium text-[#A1A1AA] tracking-wider uppercase flex items-center gap-2 sm:gap-3">
              INVENTÁRIO ATUAL
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-4">
              <InputCard 
                icon={<Hexagon className="w-4 h-4 sm:w-5 sm:h-5" />} 
                label="ÓPIO" 
                value={inventory.opium} 
                onChange={(v) => handleInputChange('opium', v)} 
                recipeCost={RECIPE.opium}
                color="fuchsia"
              />
              <InputCard 
                icon={<Leaf className="w-4 h-4 sm:w-5 sm:h-5" />} 
                label="FOLHAS" 
                value={inventory.leaves} 
                onChange={(v) => handleInputChange('leaves', v)} 
                recipeCost={RECIPE.leaves}
                color="green"
              />
              <InputCard 
                icon={<Syringe className="w-4 h-4 sm:w-5 sm:h-5" />} 
                label="SERINGA" 
                value={inventory.syringe} 
                onChange={(v) => handleInputChange('syringe', v)} 
                recipeCost={RECIPE.syringe}
                color="blue"
              />
              <InputCard 
                icon={<Pipette className="w-4 h-4 sm:w-5 sm:h-5" />} 
                label="AGULHA" 
                value={inventory.needle} 
                onChange={(v) => handleInputChange('needle', v)} 
                recipeCost={RECIPE.needle}
                color="white"
              />
            </div>
          </section>

          {/* Right Column */}
          <section className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 lg:gap-8">
            
            {/* Top Card */}
            <div className="bg-[#282832]/60 backdrop-blur-md border border-white/10 rounded-md p-4 sm:p-6 md:p-8 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-[0.03] pointer-events-none">
                <Dna className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 text-white relative -top-4 -right-4" />
              </div>
              
              <h3 className="text-[11px] sm:text-xs font-medium text-[#A1A1AA] tracking-wider uppercase mb-3 sm:mb-5 relative z-10">PRODUÇÃO</h3>
              
              <div className="relative z-10 flex flex-col gap-3 sm:gap-5">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-mono font-semibold text-white tracking-tight">
                      {maxProduction}
                    </span>
                    <span className="text-sm sm:text-base text-[#A1A1AA] font-normal">farms</span>
                  </div>
                  <div className="mt-1 sm:mt-2 text-[#A1A1AA] text-[10px] sm:text-xs font-mono opacity-80 uppercase tracking-widest">
                    Total: {totalCapofolUnits} un. CAPOFOL
                  </div>
                  <div className="mt-4 sm:mt-6 inline-flex flex-wrap items-center gap-1.5 sm:gap-2 text-[#D946EF] bg-[#D946EF]/10 px-3 py-1.5 sm:py-2 rounded-md text-[10px] sm:text-xs font-medium tracking-wide border border-[#D946EF]/30 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
                    <Scale className="w-3.5 h-3.5" />
                    Peso da Produção: {totalCapofolWeight.toFixed(2)} kg
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="bg-[#282832]/50 border border-white/10 rounded-md p-4 sm:p-6 md:p-8 flex-1 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
                 <h3 className="text-[11px] sm:text-xs font-medium text-[#A1A1AA] tracking-wider uppercase">
                   SOBRAS
                 </h3>
                 <div className="text-[9px] sm:text-[10px] text-[#A1A1AA] font-mono tracking-widest flex items-center gap-1.5 bg-black/20 px-2.5 py-1.5 rounded-md border border-white/10 w-max uppercase">
                   <Scale className="w-3 h-3" />
                   Peso: <span className="text-white font-medium">{Math.max(0, leftoverWeight).toFixed(2)} kg</span>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                <LeftoverCard label="ÓPIO" value={leftovers.opium} unitWeight={WEIGHTS.opium} colorClass="text-[#D946EF]" />
                <LeftoverCard label="FOLHAS" value={leftovers.leaves} unitWeight={WEIGHTS.leaves} colorClass="text-[#22C55E]" />
                <LeftoverCard label="SERINGA" value={leftovers.syringe} unitWeight={WEIGHTS.syringe} colorClass="text-[#3B82F6]" />
                <LeftoverCard label="AGULHA" value={leftovers.needle} unitWeight={WEIGHTS.needle} colorClass="text-white" />
              </div>
            </div>

          </section>
        </div>
        
      </div>
    </div>
  );
}

function InputCard({ 
  icon, 
  label, 
  value, 
  onChange, 
  recipeCost,
  color,
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number | ''; 
  onChange: (val: string) => void;
  recipeCost: number;
  color: 'fuchsia' | 'green' | 'blue' | 'white';
}) {
  const colorMap = {
    fuchsia: {
      accent: 'text-[#D946EF]',
      bg: 'bg-[#D946EF]/5 hover:bg-[#D946EF]/10',
      focus: 'focus-within:border-[#D946EF]/50 focus-within:ring-[#D946EF]/20 border-[#D946EF]/10'
    },
    green: {
      accent: 'text-[#22C55E]',
      bg: 'bg-[#22C55E]/5 hover:bg-[#22C55E]/10',
      focus: 'focus-within:border-[#22C55E]/50 focus-within:ring-[#22C55E]/20 border-[#22C55E]/10'
    },
    blue: {
      accent: 'text-[#3B82F6]',
      bg: 'bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10',
      focus: 'focus-within:border-[#3B82F6]/50 focus-within:ring-[#3B82F6]/20 border-[#3B82F6]/10'
    },
    white: {
      accent: 'text-white',
      bg: 'bg-white/5 hover:bg-white/10',
      focus: 'focus-within:border-white/40 focus-within:ring-white/20 border-white/10'
    },
  };

  const style = colorMap[color];

  return (
    <label className={`flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 p-2 sm:p-3 rounded-md border transition-all duration-300 focus-within:ring-2 ${style.bg} ${style.focus} cursor-text bg-[#282832]/40 backdrop-blur-md`}>
      <div className={`p-1.5 sm:p-2 rounded-md border bg-black/30 border-white/10 flex items-center justify-center ${style.accent}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start w-full">
        <div className="text-[9px] sm:text-sm font-medium text-[#A1A1AA] sm:text-white tracking-widest sm:tracking-wide truncate sm:mb-0.5 uppercase">{label}</div>
        <div className="hidden sm:block text-[9px] sm:text-[10px] text-[#A1A1AA] font-mono leading-tight uppercase tracking-wider">{recipeCost} un/farm</div>
      </div>
      <input 
        type="text" 
        inputMode="numeric"
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder="0"
        className="w-full sm:w-16 md:w-24 text-center sm:text-right bg-transparent text-sm sm:text-lg md:text-xl font-mono font-medium text-white focus:outline-none placeholder:text-[#A1A1AA]/30 mt-0.5 sm:mt-0"
      />
    </label>
  );
}

function LeftoverCard({ label, value, unitWeight, colorClass }: { label: string; value: number; unitWeight: number; colorClass: string }) {
  const isZero = value === 0;
  
  return (
    <div className={`p-3 sm:p-4 rounded-md border border-white/10 bg-[#282832]/50 flex flex-col justify-between transition-opacity duration-300 ${isZero ? 'opacity-40' : 'opacity-100'}`}>
       <span className="text-[9px] sm:text-[10px] text-[#A1A1AA] font-medium uppercase tracking-wider mb-2 sm:mb-3 truncate">{label}</span>
       <div>
         <div className={`text-base sm:text-lg font-mono font-medium ${isZero ? 'text-[#A1A1AA]' : colorClass}`}>
           {value}
         </div>
         <div className="text-[9px] sm:text-[10px] text-[#A1A1AA] mt-1 sm:mt-1.5 flex items-center gap-1 font-mono uppercase tracking-widest truncate">
           <Scale className="w-2.5 h-2.5 sm:w-3 h-3 shrink-0" />
           <span className="truncate">{Number((value * unitWeight).toFixed(3))}kg</span>
         </div>
       </div>
    </div>
  );
}
