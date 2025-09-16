// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any;
const LOCALE_KEY = Symbol.for("@agape/locale");

/**
 * Get the current locale.
 *
 * - Returns the locale previously set with `setLocale` or the system locale
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
 * @param locale - The BCP 47 locale string to use (e.g. "en-US", "fr-FR").
 */
export function setLocale(locale: string): void {
  g[LOCALE_KEY] = locale;
}
