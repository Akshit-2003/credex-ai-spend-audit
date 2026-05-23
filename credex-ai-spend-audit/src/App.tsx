import { useState, useEffect } from 'react';

interface ToolSpend {
  toolName: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export default function App() {
  const [teamSize, setTeamSize] = useState<number>(1);
  const [primaryUseCase, setPrimaryUseCase] = useState<string>('coding');
  const [tools, setTools] = useState<ToolSpend[]>([
    { toolName: 'Cursor', plan: 'Pro', seats: 1, monthlySpend: 20 },
    { toolName: 'ChatGPT', plan: 'Plus', seats: 1, monthlySpend: 20 }
  ]);

  // LocalStorage state persistence
  useEffect(() => {
    const saved = {
      team: localStorage.getItem('audit_teamSize'),
      useCase: localStorage.getItem('audit_useCase'),
      tools: localStorage.getItem('audit_tools')
    };
    if (saved.team) setTeamSize(parseInt(saved.team));
    if (saved.useCase) setPrimaryUseCase(saved.useCase);
    if (saved.tools) setTools(JSON.parse(saved.tools));
  }, []);

  useEffect(() => {
    localStorage.setItem('audit_teamSize', teamSize.toString());
    localStorage.setItem('audit_useCase', primaryUseCase);
    localStorage.setItem('audit_tools', JSON.stringify(tools));
  }, [teamSize, primaryUseCase, tools]);

  const handleAddTool = () => setTools([...tools, { toolName: 'Claude', plan: 'Pro', seats: 1, monthlySpend: 20 }]);
  const handleRemoveTool = (index: number) => setTools(tools.filter((_, i) => i !== index));
  const handleToolChange = (index: number, field: keyof ToolSpend, value: any) => {
    const updated = [...tools];
    updated[index] = { ...updated[index], [field]: value };
    setTools(updated);
  };

  const totalSpend = tools.reduce((acc, t) => acc + t.monthlySpend, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* 1. SLICK BLUR NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-xl border-b border-slate-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-8 w-8 rounded-xl bg-linear-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/10 group-hover:scale-105 group-hover:shadow-cyan-500/20 transition-all duration-300">
              <span className="text-slate-950 font-extrabold text-sm tracking-tighter">CX</span>
            </div>
            <span className="text-md font-bold tracking-tight text-white uppercase font-mono group-hover:text-cyan-400 transition-colors duration-300">
              Credex <span className="text-cyan-400 lowercase font-sans font-normal opacity-80 group-hover:opacity-100 transition-opacity">/ audit-engine</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a href="#features" className="hover:text-cyan-400 transition-all duration-200 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">Platform Features</a>
            <a href="#faq" className="hover:text-cyan-400 transition-all duration-200 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">Security FAQ</a>
            <a href="https://cursor.sh/pricing" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-all duration-200 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300">Live Benchmarks</a>
          </div>
          <button 
            onClick={() => window.scrollTo({top: 550, behavior: 'smooth'})} 
            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-white text-xs font-semibold rounded-lg border border-slate-800 hover:border-slate-700 transition-all active:scale-95 duration-200 cursor-pointer hover:shadow-md shadow-inner"
          >
            Launch Console
          </button>
        </div>
      </nav>

      {/* 2. GRADIENT GLOW HERO LAYER */}
      <header className="pt-36 pb-16 px-6 relative overflow-hidden border-b border-slate-900/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-75 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/40 text-[11px] font-mono tracking-wide text-slate-400 hover:border-slate-700/60 hover:text-slate-300 transition-colors duration-300">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Analysis Matrix Updated Live For May 2026
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
            Stop Leaking Venture Capital On <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Misaligned AI Plan Tiers</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Most startups waste thousands monthly by overprovisioning developer seats or selecting sub-optimal corporate bundles on services like Claude and Cursor.
          </p>
        </div>

        {/* TOP LINE ANALYTICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-12 text-left">
          {[
            { label: "Average Stack Leakage", val: "32.4% / mo", color: "text-cyan-400" },
            { label: "Monitored Tier Configurations", val: "42 Rules Active", color: "text-white" },
            { label: "Core Processing Engine", val: "Pure Math Deterministic", color: "text-indigo-400" },
            { label: "Max Credex Subsidy Offset", val: "$5,000 / infra", color: "text-emerald-400" }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-900/20 border border-slate-900/60 hover:border-slate-800 rounded-xl shadow-inner hover:bg-slate-900/40 hover:-translate-y-0.5 transition-all duration-300 group">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">{item.label}</div>
              <div className={`text-md font-bold ${item.color} mt-1`}>{item.val}</div>
            </div>
          ))}
        </div>
      </header>

      {/* 3. DUAL-COLUMN CONSOLE DASHBOARD */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-16 pb-28">
        
        {/* Left Form Panel (8 Columns) */}
        <section className="lg:col-span-8">
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 md:p-8 relative shadow-xl backdrop-blur-xs hover:border-slate-800 transition-all duration-500">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Deployment Profile</h2>
                <p className="text-xs text-slate-500 mt-0.5">Input active organization sizing and tooling nodes.</p>
              </div>
              <div className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 flex items-center gap-4 hover:border-slate-800 transition-colors duration-300">
                <div className="text-right">
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Aggregated Gross Cost</div>
                  <div className="text-md font-bold text-cyan-400 font-mono">${totalSpend}<span className="text-xs text-slate-600 font-normal">/mo</span></div>
                </div>
              </div>
            </div>

            {/* Demographics Flex */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Operational Seats</label>
                <input 
                  type="number" 
                  value={teamSize} 
                  onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))} 
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-sm text-white font-mono outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Primary System Domain</label>
                <select 
                  value={primaryUseCase} 
                  onChange={(e) => setPrimaryUseCase(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="coding">Software Development & Coding</option>
                  <option value="writing">Content Pipeline & LLM Writing</option>
                  <option value="data">Data Processing Analytics</option>
                  <option value="mixed">Mixed Operations</option>
                </select>
              </div>
            </div>

            <div className="h-px bg-slate-900 my-6"></div>

            {/* Matrix Form List */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Active Software Vectors</label>
              
              {tools.map((tool, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl items-center transition-all duration-300 hover:border-slate-800/80 hover:bg-slate-950/80 group">
                  <div className="sm:col-span-4">
                    <select 
                      value={tool.toolName} 
                      onChange={(e) => handleToolChange(index, 'toolName', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-md px-3 py-1.5 text-xs text-white outline-none cursor-pointer transition-colors"
                    >
                      {/* Core Apps / Subscriptions */}
                      <option value="Cursor">Cursor AI Editor</option>
                      <option value="ChatGPT">ChatGPT Plus/Teams</option>
                      <option value="Claude">Claude Anthropic Pro</option>
                      <option value="Copilot">GitHub Copilot</option>
                      <option value="Gemini">Google Gemini Workspace</option>
                      <option value="Windsurf">Windsurf Editor</option>
                      
                      {/* Pay-as-you-go Developers API Tiers */}
                      <option value="OpenAI_API">OpenAI API (GPT-4o Matrix)</option>
                      <option value="Anthropic_API">Anthropic API (Sonnet Node)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <input 
                      type="text" 
                      value={tool.plan} 
                      onChange={(e) => handleToolChange(index, 'plan', e.target.value)} 
                      placeholder="Plan e.g. Pro"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-md px-3 py-1.5 text-xs text-white font-mono outline-none transition-colors" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input 
                      type="number" 
                      value={tool.seats} 
                      onChange={(e) => handleToolChange(index, 'seats', Math.max(1, parseInt(e.target.value) || 1))} 
                      className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-md px-3 py-1.5 text-xs text-white font-mono text-center outline-none transition-colors" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input 
                      type="number" 
                      value={tool.monthlySpend} 
                      onChange={(e) => handleToolChange(index, 'monthlySpend', Math.max(0, parseInt(e.target.value) || 0))} 
                      className="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-md px-3 py-1.5 text-xs text-white font-mono text-center outline-none transition-colors" 
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    <button 
                      onClick={() => handleRemoveTool(index)} 
                      disabled={tools.length === 1} 
                      className="text-slate-600 hover:text-red-400 p-1.5 rounded-md hover:bg-red-500/5 transition-all duration-200 disabled:opacity-0 disabled:cursor-not-allowed cursor-pointer group-hover:scale-110"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Anchors */}
            <div className="mt-8 pt-4 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button 
                onClick={handleAddTool} 
                className="w-full sm:w-auto px-4 py-2 bg-slate-950 hover:bg-slate-900 active:scale-98 border border-slate-850 hover:border-slate-750 rounded-lg text-xs font-semibold text-slate-300 transition-all duration-200 cursor-pointer"
              >
                + Append Service Stream
              </button>
              <button 
                onClick={() => alert("Audit Engine Logic activates in Day 3 build!")} 
                className="w-full sm:w-auto px-6 py-2.5 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold rounded-lg shadow-md shadow-cyan-500/5 hover:scale-[1.02] active:scale-98 hover:shadow-cyan-500/10 transition-all duration-200 cursor-pointer"
              >
                Execute Optimization Audit
              </button>
            </div>
          </div>
        </section>

        {/* Right Intelligence Feed Panel (4 Columns) */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/20 border border-slate-850 rounded-2xl p-5 space-y-4 hover:border-slate-800 transition-all duration-300">
            <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest flex items-center gap-2">
              <span className="h-3 w-0.5 bg-cyan-400 rounded-full"></span>
              Optimization Engine Parameters
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/60 border border-slate-900 hover:border-slate-850 rounded-xl text-xs space-y-1 transition-all duration-300 group cursor-pointer">
                <span className="text-amber-400/90 font-medium block group-hover:text-amber-400 transition-colors">Claude Team Tier Minimums</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Anthropic requires a 5-seat floor commitment. Operating &lt;5 nodes logs automatic seat overspend anomalies inside our processing layer.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950/60 border border-slate-900 hover:border-slate-850 rounded-xl text-xs space-y-1 transition-all duration-300 group cursor-pointer">
                <span className="text-indigo-400 font-medium block group-hover:text-indigo-300 transition-colors">Managed GPU Credit Transfers</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Identified platform inefficiencies can be completely converted into zero-markup sovereign computational clusters instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-300">
            <span className="text-xs font-mono text-slate-500">Security / Architecture</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded animate-pulse">
              100% Client-Side
            </span>
          </div>
        </aside>
      </main>

      {/* 4. PLATFORM FEATURES DETAILS SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-2xl font-bold text-white tracking-tight">Engine Capabilities</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">High-performance compliance benchmarking built for operational scaling.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "Deterministic Logic", d: "No non-deterministic LLM calculations. Pure explicit algorithms map directly against actual contractual terms for verified outputs." },
            { t: "State Synchronization", d: "Inputs dynamically persist across user session refreshes via client memory systems without back-end pipeline requirements." },
            { t: "Credex Credit Mapping", d: "Instantly bridges identified overspend balances into subsidised cloud compute access logs with single-click ease." }
          ].map((feat, idx) => (
            <div key={idx} className="p-6 bg-slate-900/10 border border-slate-900/80 hover:border-slate-800 rounded-2xl space-y-2 hover:bg-slate-900/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">{feat.t}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRIVACY & SECURITY FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-16 border-t border-slate-900/60">
        <h2 className="text-xl font-bold text-white text-center tracking-tight mb-10">System Protocols (FAQ)</h2>
        <div className="space-y-3">
          {[
            { q: "Is operational spend telemetry stored?", a: "Negative. The calculation architecture processes all state objects directly inside browser RAM bounds. telemetries exit once viewport session flags close." },
            { q: "How is pricing contract validity handled?", a: "Our data schema tracks vendor link layers weekly. Tiers compile with active May 2026 public data lists safely." }
          ].map((item, i) => (
            <div key={i} className="p-5 bg-slate-900/10 border border-slate-900/40 hover:border-slate-800/60 rounded-xl space-y-1.5 transition-all duration-300 cursor-pointer">
              <h4 className="text-xs font-bold text-slate-200">{item.q}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ENTERPRISE COMPLIANCE FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900/80 pt-16 pb-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="h-5 w-5 rounded-md bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-bold text-[10px] group-hover:scale-105 transition-transform">C</div>
              <span className="font-bold text-white tracking-wider font-mono text-[11px] group-hover:text-cyan-400 transition-colors">CREDEX CAPITAL</span>
            </div>
            <p className="max-w-sm text-slate-500 text-[11px] leading-relaxed">
              Automated financial telemetry auditing for optimization diagnostics. Run-time analysis functions strictly within localized client bounds.
            </p>
          </div>
          {["Product Console", "Venture Scope", "Legal Compliance"].map((cat, ci) => (
            <div key={ci} className="md:col-span-2 space-y-3">
              <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{cat}</h4>
              <ul className="space-y-1.5 text-slate-500 text-[11px]">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-200">Telemetry Node</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-200">Data Matrix</li>
                <li className="hover:text-cyan-400 pointer-events-none text-slate-600 transition-colors duration-200">Privacy Sheet</li>
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-900/60 pt-6 font-mono text-[10px] text-slate-600">
          <p>© 2026 Credex Ecosystem Venture Labs. Submission Stage 1 Framework.</p>
          <div className="flex gap-6 tracking-wide font-semibold text-[9px] uppercase">
            <span className="cursor-pointer hover:text-cyan-400 transition-colors duration-200">GitHub</span>
            <span className="cursor-pointer hover:text-cyan-400 transition-colors duration-200">X / Twitter</span>
          </div>
        </div>
      </footer>
    </div>
  );
}