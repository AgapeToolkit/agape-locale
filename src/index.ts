// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
const LOCALE_KEY = Symbol.for("@agape/locale");

/**
 * Validates if a locale string is valid according to what Intl.DateTimeFormat supports.
 *
 * @param locale - The locale string to validate
 * @returns True if the locale is valid, false otherwise
 */
function isValidLocale(locale: string): boolean {
  if (!locale || typeof locale !== 'string' || locale.trim() === '') {
    return false;
  }

  try {
    // Simply test if Intl.DateTimeFormat can use this locale
    new Intl.DateTimeFormat(locale);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the current locale.
 *
 * - Returns the locale previously set with {@link setLocale} or the system locale
 * if no locale has been set.
 */
export function getLocale(): string {

  if (g[LOCALE_KEY]) return g[LOCALE_KEY];

  g[LOCALE_KEY] = Intl.DateTimeFormat().resolvedOptions().locale;
  return g[LOCALE_KEY];
}

/**
 * Set the current locale.
 *
 * @param locale - The BCP 47 locale string to use (e.g. "en-US", "fr-FR"), or null/undefined to reset to system locale.
 * @throws Error if the locale string is invalid
 */
export function setLocale(locale: string | null | undefined): void {
  if (locale === null || locale === undefined) {
    // Reset to system locale
    g[LOCALE_KEY] = Intl.DateTimeFormat().resolvedOptions().locale;
    return;
  }

  if (!isValidLocale(locale)) {
    throw new Error(`Invalid locale: "${locale}". Must be a valid BCP 47 locale string.`);
  }

  g[LOCALE_KEY] = locale;
}
