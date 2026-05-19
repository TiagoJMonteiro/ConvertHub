import React, { useState } from 'react';
import ToolPageWrapper from '../components/ToolPageWrapper';

const DailyCalories = ({ tool }) => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState(1.55); // Moderate

  // Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  const maintenance = Math.round(bmr * activity);

  return (
    <ToolPageWrapper tool={tool}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 space-y-6">
          <div className="flex gap-4">
            <button onClick={() => setGender('male')} className={`flex-1 py-3 rounded-xl font-medium border transition-all ${gender === 'male' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-black/20 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10'}`}>Male</button>
            <button onClick={() => setGender('female')} className={`flex-1 py-3 rounded-xl font-medium border transition-all ${gender === 'female' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-black/20 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10'}`}>Female</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-semibold dark:text-zinc-300">Age</label><input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white dark:bg-black/20 border dark:border-white/10 outline-none" /></div>
            <div className="space-y-2"><label className="text-sm font-semibold dark:text-zinc-300">Weight (kg)</label><input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white dark:bg-black/20 border dark:border-white/10 outline-none" /></div>
            <div className="space-y-2 col-span-2"><label className="text-sm font-semibold dark:text-zinc-300">Height (cm)</label><input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white dark:bg-black/20 border dark:border-white/10 outline-none" /></div>
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-semibold dark:text-zinc-300">Activity Level</label>
              <select value={activity} onChange={e => setActivity(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-white dark:bg-black/20 border dark:border-white/10 outline-none dark:text-white">
                <option value="1.2">Sedentary (Little to no exercise)</option>
                <option value="1.375">Light (Exercise 1-3 days/week)</option>
                <option value="1.55">Moderate (Exercise 3-5 days/week)</option>
                <option value="1.725">Active (Exercise 6-7 days/week)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200/50 dark:border-white/10 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-zinc-500 font-semibold mb-2">MAINTENANCE</p>
            <h2 className="text-6xl font-extrabold text-orange-500">{maintenance}</h2>
            <p className="text-zinc-400 mt-2">Calories / day</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-6 rounded-3xl border border-zinc-200/50 dark:border-white/10 text-center">
              <p className="text-sm text-zinc-500 font-semibold mb-1">MILD WEIGHT LOSS</p>
              <h3 className="text-2xl font-bold text-sky-400">{maintenance - 250}</h3>
            </div>
            <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl p-6 rounded-3xl border border-zinc-200/50 dark:border-white/10 text-center">
              <p className="text-sm text-zinc-500 font-semibold mb-1">WEIGHT GAIN</p>
              <h3 className="text-2xl font-bold text-emerald-400">{maintenance + 500}</h3>
            </div>
          </div>
        </div>
      </div>
    </ToolPageWrapper>
  );
};

export default DailyCalories;