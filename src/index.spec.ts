/* eslint-disable @typescript-eslint/no-explicit-any */

import { getLocale, setLocale } from './index';

const LOCALE_KEY = Symbol.for("@agape/locale");

beforeEach(() => {
  delete (globalThis as any)[LOCALE_KEY];
});

describe('@agape/locale', () => {
  describe('getLocale', () => {
    it('should return system locale when no locale has been set', () => {
      const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
      const result = getLocale();

      expect(result).toBe(systemLocale);
      expect(typeof result).toBe('string');
    });

    it('should return the previously set locale', () => {
      setLocale('fr-FR');
      const result = getLocale();

      expect(result).toBe('fr-FR');
    });

    it('should return system locale after resetting with null', () => {
      setLocale('de-DE');
      setLocale(null);

      const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
      const result = getLocale();

      expect(result).toBe(systemLocale);
    });

    it('should return system locale after resetting with undefined', () => {
      setLocale('ja-JP');
      setLocale(undefined);

      const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
      const result = getLocale();

      expect(result).toBe(systemLocale);
    });
  });

  describe('setLocale', () => {
    it('should set a valid locale', () => {
      setLocale('es-ES');
      expect(getLocale()).toBe('es-ES');
    });

    it('should throw error for invalid locale', () => {
      expect(() => setLocale('')).toThrow('Invalid locale: "". Must be a valid BCP 47 locale string.');
      expect(() => setLocale('123')).toThrow('Invalid locale: "123". Must be a valid BCP 47 locale string.');
      expect(() => setLocale('en-')).toThrow('Invalid locale: "en-". Must be a valid BCP 47 locale string.');
    });

    it('should reset to system locale when passed null', () => {
      setLocale('fr-FR');
      setLocale(null);

      const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
      expect(getLocale()).toBe(systemLocale);
    });

    it('should reset to system locale when passed undefined', () => {
      setLocale('de-DE');
      setLocale(undefined);

      const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;
      expect(getLocale()).toBe(systemLocale);
    });

    it('should accept various valid locale formats', () => {
      const validLocales = ['en-US', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN', 'en', 'es-419'];

      validLocales.forEach(locale => {
        setLocale(locale);
        expect(getLocale()).toBe(locale);
      });
    });
  });

  describe('integration', () => {
    it('should maintain state across multiple calls', () => {
      // Start with system locale
      const systemLocale = getLocale();
      expect(typeof systemLocale).toBe('string');

      // Set a custom locale
      setLocale('it-IT');
      expect(getLocale()).toBe('it-IT');

      // Set another locale
      setLocale('pt-BR');
      expect(getLocale()).toBe('pt-BR');

      // Reset to system
      setLocale(null);
      expect(getLocale()).toBe(systemLocale);
    });

    it('should handle rapid successive calls', () => {
      setLocale('en-US');
      expect(getLocale()).toBe('en-US');

      setLocale('fr-FR');
      expect(getLocale()).toBe('fr-FR');

      setLocale('de-DE');
      expect(getLocale()).toBe('de-DE');
    });
  });
});
