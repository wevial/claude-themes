// The Pink slip backdrop: a haze after spectra's haze background, redrawn
// for a CSS-only SVG. Two soft bands of smoke, each a row of overlapping
// radial-gradient blobs, lean across the ground, drift slowly and cycle
// through colors, fading toward the bottom, under a fine film grain. Light
// mode: cyan, yellow and white smoke over the subdued pink. Dark mode: rainbow
// smoke over warm black. Gradients and a tiled grain rather than blur or noise
// filters, so the frame stays cheap to repaint.
const BLOB_X = [-120, 180, 480, 780, 1080, 1380, 1680]

// Film grain: one tile of scattered specks, half dark and half light, from a
// fixed seed so every load draws the same grain. A pattern repeats the tile.
const GRAIN_TILE = 120
const GRAIN_SPECKS = 640
const GRAIN_SIZE = 0.6

const grain = (() => {
  let seed = 0x2f6e2b1
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0

    return seed / 0x100000000
  }
  const specks: string[] = []

  for (let i = 0; i < GRAIN_SPECKS; i++) {
    const x = (random() * GRAIN_TILE).toFixed(1)
    const y = (random() * GRAIN_TILE).toFixed(1)
    specks.push(`<rect class="${i % 2 === 0 ? 'gd' : 'gl'}" x="${x}" y="${y}" width="${GRAIN_SIZE}" height="${GRAIN_SIZE}"/>`)
  }

  return specks.join('')
})()

const band = (gradients: [string, string]) =>
  BLOB_X.map(
    (x, i) =>
      `<ellipse cx="${x}" cy="${i % 2 === 0 ? 0 : 40}" rx="300" ry="${i % 2 === 0 ? 130 : 105}" fill="url(#${gradients[i % 2]})"/>`,
  ).join('')

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
  .base{fill:#f6aecd}
  .fade{stop-color:#f6aecd}
  .a{stop-color:#3fdcf7;animation:lightA 70s linear infinite}
  .b{stop-color:#fff3a0;animation:lightB 90s linear infinite}
  .c{stop-color:#ffffff;animation:lightC 80s linear infinite}
  @keyframes lightA{0%,100%{stop-color:#3fdcf7}33%{stop-color:#fff3a0}66%{stop-color:#ff6fb8}}
  @keyframes lightB{0%,100%{stop-color:#fff3a0}33%{stop-color:#ffffff}66%{stop-color:#3fdcf7}}
  @keyframes lightC{0%,100%{stop-color:#ffffff}33%{stop-color:#7fe8fa}66%{stop-color:#fff3a0}}
  @media (prefers-color-scheme: dark){
    .base{fill:#0a0710}
    .fade{stop-color:#0a0710}
    .a{stop-color:#6a2fb8;animation:darkA 70s linear infinite}
    .b{stop-color:#f06a9a;animation:darkB 90s linear infinite}
    .c{stop-color:#f08a3c;animation:darkC 80s linear infinite}
    @keyframes darkA{0%,100%{stop-color:#6a2fb8}25%{stop-color:#1a7f8c}50%{stop-color:#2f6fe0}75%{stop-color:#d65270}}
    @keyframes darkB{0%,100%{stop-color:#f06a9a}25%{stop-color:#6a2fb8}50%{stop-color:#55b5a6}75%{stop-color:#f08a3c}}
    @keyframes darkC{0%,100%{stop-color:#f08a3c}25%{stop-color:#d65270}50%{stop-color:#9b5cff}75%{stop-color:#1a7f8c}}
  }
  .back{animation:driftBack 46s ease-in-out infinite alternate}
  .front{animation:driftFront 34s ease-in-out infinite alternate}
  @keyframes driftBack{from{transform:translate(-60px,-20px)}to{transform:translate(70px,30px)}}
  @keyframes driftFront{from{transform:translate(80px,25px)}to{transform:translate(-70px,-30px)}}
  .breathe{animation:breathe 22s ease-in-out infinite alternate}
  @keyframes breathe{from{opacity:.75}to{opacity:1}}
  .gd{fill:#3a1028;opacity:.09}
  .gl{fill:#ffffff;opacity:.13}
  @media (prefers-color-scheme: dark){
    .gd{fill:#000000;opacity:.18}
    .gl{fill:#fff4ea;opacity:.05}
  }
  @media (prefers-reduced-motion: reduce){*{animation:none!important}}
</style>
<defs>
  <radialGradient id="ga"><stop offset="0" class="a" stop-opacity=".85"/><stop offset=".55" class="a" stop-opacity=".35"/><stop offset="1" class="a" stop-opacity="0"/></radialGradient>
  <radialGradient id="gb"><stop offset="0" class="b" stop-opacity=".85"/><stop offset=".55" class="b" stop-opacity=".35"/><stop offset="1" class="b" stop-opacity="0"/></radialGradient>
  <radialGradient id="gc"><stop offset="0" class="c" stop-opacity=".9"/><stop offset=".5" class="c" stop-opacity=".35"/><stop offset="1" class="c" stop-opacity="0"/></radialGradient>
  <pattern id="grain" width="${GRAIN_TILE}" height="${GRAIN_TILE}" patternUnits="userSpaceOnUse">${grain}</pattern>
  <linearGradient id="fadeDown" x1="0" y1="0" x2="0" y2="1">
    <stop offset=".2" class="fade" stop-opacity="0"/><stop offset="1" class="fade" stop-opacity=".95"/>
  </linearGradient>
</defs>
<rect class="base" width="1600" height="1000"/>
<g transform="translate(800 330) rotate(-14) translate(-800 0)"><g class="back breathe">${band(['ga', 'gb'])}</g></g>
<g transform="translate(800 560) rotate(-22) translate(-800 0)"><g class="front">${band(['gb', 'gc'])}</g></g>
<rect width="1600" height="1000" fill="url(#fadeDown)"/>
<rect width="1600" height="1000" fill="url(#grain)"/>
</svg>`
