import { ScalesIcon, RulerIcon, LocationIcon, ThermometerIcon, HeartIcon, FlameIcon, CurrencyIcon, GraphIcon, KeyIcon, TextIcon } from './components/Icons';

export const categories = {
  unit: { name: "UNIT CONVERTERS", tools: [] },
  health: { name: "HEALTH CALCULATORS", tools: [] },
  finance: { name: "FINANCE TOOLS", tools: [] },
  utility: { name: "UTILITY TOOLS", tools: [] }
};

export const tools = [
  { id: 'kg-lbs', path: '/unit/kg-lbs', name: 'Kg ↔ Lbs', desc: 'Convert kilograms and pounds.', category: 'unit', icon: ScalesIcon, type: 'basicUnit', from: 'Kg', to: 'Lbs', factor: 2.20462 },
  { id: 'cm-inches', path: '/unit/cm-inches', name: 'Cm ↔ Inches', desc: 'Convert centimeters and inches.', category: 'unit', icon: RulerIcon, type: 'basicUnit', from: 'Cm', to: 'Inches', factor: 0.393701 },
  { id: 'km-miles', path: '/unit/km-miles', name: 'Km ↔ Miles', desc: 'Convert kilometers and miles.', category: 'unit', icon: LocationIcon, type: 'basicUnit', from: 'Km', to: 'Miles', factor: 0.621371 },
  { id: 'c-f', path: '/unit/c-f', name: 'Celsius ↔ Fahrenheit', desc: 'Convert temperature units.', category: 'unit', icon: ThermometerIcon, type: 'placeholder' },
  { id: 'bmi', path: '/health/bmi', name: 'BMI Calculator', desc: 'Body Mass Index with category.', category: 'health', icon: HeartIcon, type: 'custom' },
  { id: 'calories', path: '/health/calories', name: 'Daily Calories', desc: 'Maintenance, bulk, and cut.', category: 'health', icon: FlameIcon, type: 'placeholder' },
  { id: 'currency', path: '/finance/currency', name: 'Currency Converter', desc: 'Real-time exchange rates.', category: 'finance', icon: CurrencyIcon, type: 'custom' },
  { id: 'interest', path: '/finance/interest', name: 'Compound Interest', desc: 'Grow your savings over time.', category: 'finance', icon: GraphIcon, type: 'placeholder' },
  { id: 'password', path: '/utility/password', name: 'Password Generator', desc: 'Strong, customizable passwords.', category: 'utility', icon: KeyIcon, type: 'placeholder' },
  { id: 'characters', path: '/utility/characters', name: 'Character Counter', desc: 'Words, lines & reading time.', category: 'utility', icon: TextIcon, type: 'placeholder' },
];

tools.forEach(tool => categories[tool.category].tools.push(tool));