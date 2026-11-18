// /card screen router. Each screen module exports:
//   mount(el, ctx)  — called once at start with its <section data-screen="…"> element
//   enter?(ctx)     — called every time the screen is shown (optional)
//   leave?(ctx)     — called when navigating away (optional)
// ctx = { go(screenName), store, sports }

import * as store from './store.js';
import * as sports from './sports.js';
import * as start from './screens/start.js';
import * as setup from './screens/setup.js';
import * as game from './screens/game.js';
import * as result from './screens/result.js';
import * as composer from './screens/composer.js';
import * as done from './screens/done.js';

const SCREENS = { start, setup, game, result, composer, done };
let current = null;

const ctx = {
  store,
  sports,
  go(name) {
    if (!SCREENS[name]) throw new Error(`Unknown screen: ${name}`);
    if (current && SCREENS[current].leave) SCREENS[current].leave(ctx);
    document.querySelectorAll('[data-screen]').forEach(el => { el.hidden = el.dataset.screen !== name; });
    current = name;
    if (name !== 'start') store.update(s => { s.screen = name; });
    if (SCREENS[name].enter) SCREENS[name].enter(ctx);
    window.scrollTo(0, 0);
    const heading = document.querySelector(`[data-screen="${name}"] h1, [data-screen="${name}"] h2`);
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  },
};

for (const [name, mod] of Object.entries(SCREENS)) {
  const el = document.querySelector(`[data-screen="${name}"]`);
  mod.mount(el, ctx);
}

// Always open on start; start offers "Resume" when a game is in progress.
ctx.go('start');
