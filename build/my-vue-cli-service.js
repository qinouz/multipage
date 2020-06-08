#!/usr/bin/env node

const {semver, error} = require('@vue/cli-shared-utils');
const requiredVersion = require('@vue/cli-service/package.json').engines.node;

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}

const Service = require('@vue/cli-service/lib/Service');
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());

const rawArgv = process.argv.slice(2)
// console.log(rawArgv)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
const command = args._[0];

module.exports = () => {
  return new Promise((resolve) => {
    service.run(command, args, rawArgv).then(res => {
      resolve(res)
    }).catch(err => {
      error(err);
      process.exit(1)
    });
  })

};
