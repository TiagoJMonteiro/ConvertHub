import React from 'react';
import { 
  LayoutDashboard, Star, Scale, Ruler, MapPin, Thermometer, 
  HeartPulse, Flame, DollarSign, TrendingUp, Key, Type, 
  ArrowRightLeft, Sun, Moon, Hexagon, Palette, Timer 
} from 'lucide-react';

export const AppIcon = () => <Hexagon fill="currentColor" className="text-white bg-primary p-1.5 rounded-lg w-8 h-8" strokeWidth={2.5} />;
export const SunIcon = () => <Sun className="w-5 h-5" />;
export const MoonIcon = () => <Moon className="w-5 h-5" />;
export const DashboardIcon = () => <LayoutDashboard className="w-5 h-5" />;
export const FavoritesIcon = ({ className }) => <Star className={`w-5 h-5 ${className}`} />;

export const ScalesIcon = ({ className }) => <Scale className={`text-sky-500 bg-sky-100 dark:text-sky-400 dark:bg-sky-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const RulerIcon = ({ className }) => <Ruler className={`text-indigo-500 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const LocationIcon = ({ className }) => <MapPin className={`text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-blue-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const ThermometerIcon = ({ className }) => <Thermometer className={`text-amber-500 bg-amber-100 dark:text-amber-400 dark:bg-amber-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const HeartIcon = ({ className }) => <HeartPulse className={`text-pink-500 bg-pink-100 dark:text-pink-400 dark:bg-pink-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const FlameIcon = ({ className }) => <Flame className={`text-red-600 bg-red-100 dark:text-red-500 dark:bg-red-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const CurrencyIcon = ({ className }) => <DollarSign className={`text-emerald-500 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const GraphIcon = ({ className }) => <TrendingUp className={`text-teal-500 bg-teal-100 dark:text-teal-400 dark:bg-teal-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const KeyIcon = ({ className }) => <Key className={`text-purple-500 bg-purple-100 dark:text-purple-400 dark:bg-purple-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const TextIcon = ({ className }) => <Type className={`text-fuchsia-500 bg-fuchsia-100 dark:text-fuchsia-400 dark:bg-fuchsia-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const PaletteIcon = ({ className }) => <Palette className={`text-rose-500 bg-rose-100 dark:text-rose-400 dark:bg-rose-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const TimerIcon = ({ className }) => <Timer className={`text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-blue-950/50 p-2 rounded-xl w-10 h-10 ${className}`} strokeWidth={2} />;
export const SwapIcon = ({ className = "" }) => <ArrowRightLeft className={`w-5 h-5 ${className}`} />;