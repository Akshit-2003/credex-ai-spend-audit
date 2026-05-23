import { useState, useEffect } from 'react';
import { runSpendAudit } from './utils/auditEngine';
import type { AuditSummary } from './utils/auditEngine';

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
    { toolName: 'cursor', plan: 'Business', seats: 2, monthlySpend: 80 },
    { toolName: 'claude', plan: 'Team', seats: 3, monthlySpend: 150 }
  ]);

  const [auditResult, setAuditResult] = useState<AuditSummary | null>(null);

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

  const handleAddTool = () => setTools([...tools, { toolName: 'chatgpt', plan: 'Plus', seats: 1, monthlySpend: 20 }]);
  const handleRemoveTool = (index: number) => setTools(tools.filter((_, i) => i !== index));
  const handleToolChange = (index: number, field: keyof ToolSpend, value: any) => {
    const updated = [...tools];
    updated[index] = { ...updated[index], [field]: value };
    setTools(updated);
  };

  const handleExecuteAudit = () => {
    const summary = runSpendAudit(tools, teamSize);
    setAuditResult(summary);
    
    // Smooth scroll down to results container after calculation state updates
    setTimeout(() => {
      const element = document.getElementById('audit-results-node');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const totalSpend = tools.reduce((acc, t) => acc + t.monthlySpend, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* 1. BLUR NAVBAR */}
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

      {/* 2. HERO HEADER */}
      <header className="pt-36 pb-16 px-6 relative overflow-hidden border-b border-slate-900/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-75 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/40 text-[11px] font-mono tracking-wide text-slate-400">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            Deterministic Optimization Engine Active
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
            Stop Leaking Venture Capital On <br />
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Misaligned AI Plan Tiers</span>
          </h1>
        </div>
      </header>

      {/* 3. CONSOLE INTERFACE CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 pb-28">
        
        {/* Input Block Section */}
        <section className="lg:col-span-8 space-y-8">
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 md:p-8 relative shadow-xl backdrop-blur-xs">
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Deployment Profile</h2>
                <p className="text-xs text-slate-500 mt-0.5">Input active organization sizing and tooling nodes.</p>
              </div>
              <div className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-2.5 flex items-center gap-4">
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Gross Cost</div>
                  <div className="text-md font-bold text-cyan-400 font-mono">${totalSpend}<span className="text-xs text-slate-600 font-normal">/mo</span></div>
                </div>
              </div>
            </div>

            {/* Demographics Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Company Headcount</label>
                <input 
                  type="number" 
                  value={teamSize} 
                  onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))} 
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-sm text-white font-mono outline-none focus:border-cyan-500/80" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Primary Domain</label>
                <select value={primaryUseCase} onChange={(e) => setPrimaryUseCase(e.target.value)} className="w-full bg-slate-950 border border-slate-850 rounded-lg px-4 py-2 text-sm text-white outline-none cursor-pointer">
                  <option value="coding">Software Development & Coding</option>
                  <option value="writing">Content Pipeline & LLM Writing</option>
                </select>
              </div>
            </div>

            <div className="h-px bg-slate-900 my-6"></div>

            {/* Form Rows Pipeline */}
            <div className="space-y-3">
              {tools.map((tool, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl items-center group">
                  <div className="sm:col-span-4">
                    <select value={tool.toolName} onChange={(e) => handleToolChange(index, 'toolName', e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-white outline-none">
                      <option value="cursor">Cursor AI Editor</option>
                      <option value="chatgpt">ChatGPT Plus/Teams</option>
                      <option value="claude">Claude Anthropic Pro</option>
                      <option value="copilot">GitHub Copilot</option>
                      <option value="gemini">Google Gemini Workspace</option>
                      <option value="windsurf">Windsurf Editor</option>
                      <option value="openai_api">OpenAI API Engine</option>
                      <option value="anthropic_api">Anthropic API Engine</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <input type="text" value={tool.plan} onChange={(e) => handleToolChange(index, 'plan', e.target.value)} placeholder="Plan e.g. Team/Pro" className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-white font-mono outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <input type="number" value={tool.seats} onChange={(e) => handleToolChange(index, 'seats', Math.max(1, parseInt(e.target.value) || 1))} className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-white font-mono text-center outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <input type="number" value={tool.monthlySpend} onChange={(e) => handleToolChange(index, 'monthlySpend', Math.max(0, parseInt(e.target.value) || 0))} className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs text-white font-mono text-center outline-none" />
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    <button onClick={() => handleRemoveTool(index)} disabled={tools.length === 1} className="text-slate-600 hover:text-red-400 p-1.5 rounded-md disabled:opacity-0 cursor-pointer">✕</button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Triggers */}
            <div className="mt-8 pt-4 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button onClick={handleAddTool} className="w-full sm:w-auto px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-lg text-xs font-semibold text-slate-300">
                + Append Service Stream
              </button>
              <button onClick={handleExecuteAudit} className="w-full sm:w-auto px-6 py-2.5 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold rounded-lg shadow-md cursor-pointer transition-all">
                Execute Optimization Audit
              </button>
            </div>
          </div>

          {/* DYNAMIC REPORT DISPLAY OUTPUT LAYER */}
          {auditResult && (
            <div id="audit-results-node" className="bg-slate-900/40 border border-emerald-500/20 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Audit Execution Summary
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Deterministic evaluation records based on May 2026 specs.</p>
                </div>
                <div className="bg-slate-950 border border-slate-850 px-4 py-2 rounded-xl text-center">
                  <div className="text-[9px] uppercase tracking-wider font-mono text-slate-500">Net Monthly Savings</div>
                  <div className="text-xl font-black text-emerald-400 font-mono">${auditResult.netMonthlySavings}</div>
                </div>
              </div>

              {/* Stats Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">System Efficiency Index</div>
                  <div className="text-lg font-bold text-white mt-1">{auditResult.efficiencyScore}%</div>
                </div>
                {auditResult.credexSubsidyEligible && (
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <div className="text-[10px] font-mono text-emerald-500 uppercase">Credex Annualized Subsidy Offset</div>
                    <div className="text-lg font-bold text-emerald-400 mt-1">${auditResult.credexSubsidyAmount} / yr</div>
                  </div>
                )}
              </div>

              {/* Recommendations Feed Blocks */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Vector Adjustments:</div>
                {auditResult.recommendations.map((rec, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${rec.potentialSavings > 0 ? 'bg-slate-950/60 border-slate-850' : 'bg-slate-900/10 border-slate-900/60'}`}>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider block">{rec.toolName}</span>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rec.reasoning}</p>
                      </div>
                      {rec.potentialSavings > 0 && (
                        <span className="text-xs font-mono font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded shrink-0">
                          Save ${rec.potentialSavings}/mo
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Info Sidebar */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/20 border border-slate-850 rounded-2xl p-5 space-y-4">
            <h3 className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
              Live Console Diagnostics
            </h3>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed">
              <p>🎯 **How to test optimization results:**</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Set row 1 to **Cursor AI Editor** + Plan **Business** + Seats **2** + Spend **80**.</li>
                <li>Set row 2 to **Claude Anthropic Pro** + Plan **Team** + Seats **3** + Spend **150**.</li>
                <li>Click the **Execute Optimization Audit** button.</li>
              </ul>
              <p className="pt-2 border-t border-slate-900 text-[11px] text-amber-400">
                The core math algorithm will automatically flag minimum billing seat floors and compute the target savings stream below!
              </p>
            </div>
          </div>
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900/80 py-8 text-center text-[10px] font-mono text-slate-600">
        © 2026 Credex Ecosystem Venture Labs. All data computation stays inside RAM bounds safely.
      </footer>
    </div>
  );
}