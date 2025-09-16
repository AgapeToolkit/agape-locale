# @agape/locale

Simple locale management with global state.

## Installation

```bash
npm install @agape/locale
```

## Usage

```typescript
import { getLocale, setLocale } from '@agape/locale';

// Get current locale
const locale = getLocale(); // "en-US"

// Set locale
setLocale('fr-FR');
console.log(getLocale()); // "fr-FR"

// Reset to system locale
setLocale(null);
```

## API

### `getLocale(): string`

Returns the current locale. If no locale has been set, returns the system locale.

### `setLocale(locale: string | null | undefined): void`

Sets the current locale. Pass `null` or `undefined` to reset to system locale.

Throws an error if the locale is invalid.

## Examples

```typescript
// Basic usage
setLocale('es-ES');
const current = getLocale(); // "es-ES"

// Reset to system
setLocale(null);
const system = getLocale(); // "en-US" (or your system locale)

// Error handling
try {
  setLocale('invalid');
} catch (error) {
  console.error(error.message);
}
```

---

## 📚 Documentation

See the full API documentation at [agape.dev/api](https://agape.dev/api).

## 📦 Agape Toolkit

This package is part of the [Agape Toolkit](https://github.com/AgapeToolkit/AgapeToolkit) - a comprehensive collection of TypeScript utilities and libraries for modern web development.