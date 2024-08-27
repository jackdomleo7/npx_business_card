#!/usr/bin/env node

import boxen from 'boxen'
import chalk from 'chalk'
import splitText from 'split-text'
import data from './data.json'

console.log(boxen([
  chalk.hex('#e69e6b').bold(data.name),
  chalk.grey(data.urls.personal),
  '',
  `${chalk.white(data.occupation.title)} at ${chalk.white(data.occupation.company)}`,
  '',
  `LinkedIn: ${chalk.grey(`https://linkedin.com/in/${data.social.linkedin}`)}`,
  `GitHub: ${chalk.grey(`https://github.com/${data.social.github}`)}`,
  `CodePen: ${chalk.grey(`https://codepen.io/${data.social.codepen}`)}`,
  '',
  ...splitText(data.message, 50).map(text => chalk.italic(text))
].join('\n'), {
  margin: 1,
  padding: 1,
  float: 'center',
  borderStyle: 'round',
  borderColor: '#f75c20'
}))