import React, { useState, useMemo } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CompoundInterest = ({ tool }) => {
  // Using strings for inputs so the "0" can be completely cleared
  const [principal, setPrincipal] = useState('1000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [monthlyContribution, setMonthlyContribution] = useState('100');

  // Parse strings to numbers for math
  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const y = parseFloat(years) || 0;
  const m = parseFloat(monthlyContribution) || 0;
  const n = y * 12;

  // Calculate Graph Data
  const data = useMemo(() => {
    let currentData = [];
    let currentPrincipal = p;
    let currentTotal = p;

    for (let i = 0; i <= y; i++) {
      currentData.push({
        year: `Year ${i}`,
        Invested: Math.round(currentPrincipal),
        Interest: Math.round(currentTotal - currentPrincipal)
      });
      // Advance by 1 year (12 months)
      for (let month = 1; month <= 12; month++) {
        currentTotal = (currentTotal + m) * (1 + r);
        currentPrincipal += m;
      }
    }
    return currentData;
  }, [p, r, y, m]);

  const finalData = data[data.length - 1] || { Invested: 0, Interest: 0 };
  const totalAmount = finalData.Invested + finalData.Interest;

  return (
    <ToolPageWrapper tool={tool}>
      <div className="space-y-8 max-w-5xl">
        
        {/* Top Section: Inputs & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 space-y-6 shadow-sm">
            {[
              { label: 'Initial Investment ($)', val: principal, set: setPrincipal },
              { label: 'Monthly Contribution ($)', val: monthlyContribution, set: setMonthlyContribution },
              { label: 'Annual Interest Rate (%)', val: rate, set: setRate },
              { label: 'Years to Grow', val: years, set: setYears },
            ].map(field => (
              <div key={field.label} className="space-y-2">
                <label className="text-sm font-semibold dark:text-zinc-300">{field.label}</label>
                <input 
                  type="number" 
                  value={field.val} 
                  onChange={e => field.set(e.target.value)} 
                  className="w-full h-12 px-4 rounded-xl bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 outline-none text-zinc-950 dark:text-zinc-50 focus:border-primary/50 transition-colors" 
                />
              </div>
            ))}
          </div>

          <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 flex flex-col justify-center space-y-8 shadow-sm">
            <div>
              <p className="text-sm text-zinc-500 font-semibold mb-2">FUTURE BALANCE</p>
              <h2 className="text-5xl font-extrabold text-emerald-500">${totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-zinc-200 dark:border-white/5 pb-2">
                <span className="text-zinc-500">Total Principal</span>
                <span className="font-semibold dark:text-white">${finalData.Invested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Total Interest Earned</span>
                <span className="font-semibold text-emerald-400">+ ${finalData.Interest.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Graph */}
        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 shadow-sm h-96">
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-6">Growth Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.2} vertical={false} />
              <XAxis dataKey="year" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val.toLocaleString()}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Area type="monotone" dataKey="Invested" stackId="1" stroke="#3b82f6" strokeWidth={3} fill="url(#colorInvested)" />
              <Area type="monotone" dataKey="Interest" stackId="1" stroke="#10b981" strokeWidth={3} fill="url(#colorInterest)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </ToolPageWrapper>
  );
};

export default CompoundInterest;