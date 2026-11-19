# claude-themes

Themes for the Claude desktop and mobile apps, each one a Claude Code plugin.

## Pink slip

A white chat column on bubblegum pink, black ink and cyan accents. Beside the column, two soft bands of colored smoke drift slowly under a fine, static film grain: cyan, yellow and white over pink in light mode, rainbow over warm black in dark mode. The smoke stops when Reduce motion is on.

## Install

At the prompt of a terminal session:

```
/plugin install pink-slip --marketplace wevial/claude-themes
```

Answer `y` to add the marketplace, then pick a scope (user, the first, applies it everywhere).

From a shell:

```bash
claude plugin install pink-slip --marketplace wevial/claude-themes
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `wevial/claude-themes`, then Add plugin.

Themes draw in the desktop and mobile apps; the terminal keeps its own look.

## License

MIT, see [LICENSE](LICENSE). `plugins/*/hooks/make-colors.js` and `plugins/*/hooks/make-colors.d.ts` are a helper and its types from Claude Code's mod-authoring kit, copied in unchanged; they are not covered by this license.
