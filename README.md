# Chirashi

## Intro

Chirashi is a minimalist, lightweight, modular DOM and events manager library focused on performances.

Most methods names are inspired from jQuery equivalent for easier learning.

Chirashi won't bother with legacies browsers support, if you need it, you'll have to use polyfills.

All Chirashi's methods are designed to go straight to the goal with very few tests, no library-specific logic and no object creation. That's why there is no chaining but that's also why it's faster.

## Getting Started

In all examples I'll presume that your using ES2015 syntax with imports.

### Installation

Install Chirashi using npm:

```
npm install --save chirashi
```

### Basic usage

You can import and use chirashi in your project:

```js
import $ from 'chirashi'

$.ready(() => {
  alert('Hello World!')
})
```

### Advanced usage

The purpose of this library is to be as lightweight as possible. The common build once minified and gziped is less than 5kB. The whole library being modular, you can still reduce the weight of your build importing only needed dependencies thanks to `babel-chirashi-plugin`.