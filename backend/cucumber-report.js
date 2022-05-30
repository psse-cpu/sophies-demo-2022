#!/usr/bin/env node

const report = require('multiple-cucumber-html-reporter')

report.generate({
  jsonDir: './cypress/.run',
  reportPath: './cucumber-reports/',
  metadata: {
    os: 'Liux',
    browser: {
      name: 'chrome',
      version: '102',
    },
    device: 'Local test machine',
    platform: {
      name: 'linux',
      version: '5.15',
    },
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Sophies Demo 2022' },
      { label: 'Release', value: '0.0.1' },
    ],
  },
})
