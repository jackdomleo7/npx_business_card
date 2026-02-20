#!/usr/bin/env node

// ─── ANSI helpers ─────────────────────────────────────────────────────────────

const R = '\x1b[0m'
const italic = (t: string): string => `\x1b[3m${t}${R}`
const grey   = (t: string): string => `\x1b[90m${t}${R}`

function hexColor(hex: string, t: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `\x1b[38;2;${r};${g};${b}m${t}${R}`
}

function boldHex(hex: string, t: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `\x1b[1m\x1b[38;2;${r};${g};${b}m${t}${R}`
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function stripAnsi(s: string): string {
// eslint-disable-next-line no-control-regex
  return s.replace(/\x1b\[[0-9;]*m/g, '')
}

function visibleLength(s: string): number {
  return stripAnsi(s).length
}

function wordWrap(text: string, width: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if (current.length === 0) {
      current = word
    } else if (current.length + 1 + word.length <= width) {
      current += ' ' + word
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  return lines
}

// ─── Box renderer ─────────────────────────────────────────────────────────────

interface BoxOptions {
  padding: number
  margin: number
  borderColor: string
}

function box(lines: string[], { padding, margin, borderColor }: BoxOptions): string {
  const pad      = ' '.repeat(padding)
  const maxWidth = Math.max(...lines.map(visibleLength))
  const inner    = maxWidth + padding * 2

  const b      = (t: string) => hexColor(borderColor, t)
  const top    = b('╭' + '─'.repeat(inner) + '╮')
  const bottom = b('╰' + '─'.repeat(inner) + '╯')
  const blank  = b('│') + ' '.repeat(inner) + b('│')

  const content = lines.map(line => {
    const fill = ' '.repeat(maxWidth - visibleLength(line))
    return b('│') + pad + line + fill + pad + b('│')
  })

  const vertPad     = Array<string>(padding).fill(blank)
  const marginLines = '\n'.repeat(margin)

  return [
    marginLines,
    top,
    ...vertPad,
    ...content,
    ...vertPad,
    bottom,
    marginLines,
  ].join('\n')
}

// ─── Card data ────────────────────────────────────────────────────────────────

const name    = 'Jack Domleo'
const url     = 'https://jackdomleo.dev'
const title   = 'Lead Frontend Engineer'
const company = 'Ocean Finance'
const bio     = 'Engineering accessible, scalable, high-performance web experiences in the Vue.js ecosystem with TypeScript, SCSS, Vite, Storybook, and PlayWright.'
const social  = {
  linkedin: 'jackdomleo7',
  github:   'jackdomleo7',
  codepen:  'jackdomleo7',
}

// ─── Render ───────────────────────────────────────────────────────────────────

console.log(box([
  boldHex('#e69e6b', name),
  grey(url),
  '',
  `${title} at ${company}`,
  '',
  `LinkedIn: ${grey(`https://linkedin.com/in/${social.linkedin}`)}`,
  `GitHub:   ${grey(`https://github.com/${social.github}`)}`,
  `CodePen:  ${grey(`https://codepen.io/${social.codepen}`)}`,
  '',
  ...wordWrap(bio, 50).map(italic),
], {
  padding: 1,
  margin: 1,
  borderColor: '#f75c20',
}))