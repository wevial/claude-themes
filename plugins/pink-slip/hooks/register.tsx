import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { SCENE } from './scene.js'

// A bold poster: a white chat column with a slow haze of colored smoke on
// either side, black ink and cyan accents.
// Dark mode is the same poster printed on black, with plum sidebars.
const { theme, problems } = makeColors({
  label: 'Pink slip',
  contrast: 'more',
  roles: { accent: '#12b8db', danger: '#e5383b', success: '#2fbf71', warning: '#f5d63d', pro: '#ff4fa8' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#f6aecd',
        'surface-1': '#ffffff',
        'surface-2': '#ffffff',
        'surface-3': '#ffffff',
        'text-primary': '#111111',
        'text-secondary': '#2e2a2c',
        'text-muted': '#4a3f45',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#1c1119',
        'surface-1': '#221a21',
        'surface-2': '#2a2229',
        'surface-3': '#30272f',
        'text-primary': '#fff4fa',
        'text-secondary': '#f0d4e2',
        'text-muted': '#c9a9b9',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  // The glass veils the chat column (and the sidebars) in the panel color,
  // solid: white, or ink in dark mode. The haze shows beside the column.
  backdrop: { scene: 'pink-slip', glass: { blur: 0, opacity: 1 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    // Clears a reason left from a start before the app attached.
    $.ui.status(set.isDrawn ? undefined : set.reason)

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.scene !== 'pink-slip') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="Two soft bands of colored smoke drifting across a pink ground" isInteractive />
  })
}
