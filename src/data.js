import { 
  ScalesIcon, RulerIcon, ThermometerIcon, HeartIcon, FlameIcon, 
  CurrencyIcon, GraphIcon, KeyIcon, TextIcon, PaletteIcon, TimerIcon 
} from './components/Icons';

export const categories = {
  unit: { id: 'unit', name: "UNIT CONVERTERS", tools: [] },
  health: { id: 'health', name: "HEALTH CALCULATORS", tools: [] },
  finance: { id: 'finance', name: "FINANCE TOOLS", tools: [] },
  utility: { id: 'utility', name: "UTILITY TOOLS", tools: [] }
};

export const tools = [
  { id: 'distance', path: '/unit/distance', name: 'Distance Converter', desc: 'Convert meters, miles, feet & more.', category: 'unit', icon: RulerIcon, type: 'custom' },
  { id: 'weight', path: '/unit/weight', name: 'Weight Converter', desc: 'Convert kilos, pounds, ounces & more.', category: 'unit', icon: ScalesIcon, type: 'custom' },
  { id: 'temperature', path: '/unit/temperature', name: 'Temperature Converter', desc: 'Convert Celsius, Fahrenheit & Kelvin.', category: 'unit', icon: ThermometerIcon, type: 'custom' },
  
  { id: 'bmi', path: '/health/bmi', name: 'BMI Calculator', desc: 'Body Mass Index with category.', category: 'health', icon: HeartIcon, type: 'custom' },
  { id: 'calories', path: '/health/calories', name: 'Daily Calories', desc: 'Maintenance, bulk, and cut.', category: 'health', icon: FlameIcon, type: 'custom' },
  { id: 'pomodoro', path: '/health/pomodoro', name: 'Pomodoro Timer', desc: 'Focus timer for productivity.', category: 'health', icon: TimerIcon, type: 'custom' },
  
  { id: 'currency', path: '/finance/currency', name: 'Currency Converter', desc: 'Real-time exchange rates.', category: 'finance', icon: CurrencyIcon, type: 'custom' },
  { id: 'interest', path: '/finance/interest', name: 'Compound Interest', desc: 'Grow your savings over time.', category: 'finance', icon: GraphIcon, type: 'custom' },
  
  { id: 'color', path: '/utility/color', name: 'Color Converter', desc: 'HEX to RGB and HSL values.', category: 'utility', icon: PaletteIcon, type: 'custom' },
  { id: 'password', path: '/utility/password', name: 'Password Generator', desc: 'Strong, customizable passwords.', category: 'utility', icon: KeyIcon, type: 'custom' },
  { id: 'characters', path: '/utility/characters', name: 'Character Counter', desc: 'Words, lines & reading time.', category: 'utility', icon: TextIcon, type: 'custom' },
];

tools.forEach(tool => categories[tool.category].tools.push(tool));