import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', '..', 'data');
const SETTINGS_FILE = join(DATA_DIR, 'settings.json');

export interface SiteSettings {
  parameters: {
    heroSlideDuration: number; // seconds
  };
  visual: {
    primaryColor: string;   // hex
    secondaryColor: string; // hex
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  parameters: {
    heroSlideDuration: 6,
  },
  visual: {
    primaryColor: '#FF4D00',
    secondaryColor: '#00FFB2',
  },
};

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function loadSettings(): SiteSettings {
  ensureDataDir();
  if (!existsSync(SETTINGS_FILE)) {
    writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
    return { ...DEFAULT_SETTINGS };
  }
  const raw = JSON.parse(readFileSync(SETTINGS_FILE, 'utf-8'));
  return {
    parameters: { ...DEFAULT_SETTINGS.parameters, ...raw.parameters },
    visual: { ...DEFAULT_SETTINGS.visual, ...raw.visual },
  };
}

export function saveSettings(settings: SiteSettings) {
  ensureDataDir();
  writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

export function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, ((num >> 16) & 0xFF) + amount);
  const g = Math.min(255, ((num >> 8) & 0xFF) + amount);
  const b = Math.min(255, (num & 0xFF) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase()}`;
}
