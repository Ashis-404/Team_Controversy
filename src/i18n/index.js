import translations from './translations.json';

export function t(key, lang = 'en', params = {}) {
  const keys = key.split('.');
  let s = translations[lang];
  for (const k of keys) {
    if (!s) break;
    s = s[k];
  }
  if (!s) s = translations['en']?.[key] || key;
  if (typeof s === 'string') {
    return s.replace(/\{(\w+)\}/g, (_, p) => params[p] ?? `{${p}}`);
  }
  return key;
}