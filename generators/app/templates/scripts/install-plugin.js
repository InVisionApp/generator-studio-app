#!/usr/bin/env node

const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const bundleDir = 'bundle';
const pluginName = '<%= name %>';
const pluginsBaseDir = path.join(os.homedir(), '.invision-studio', 'plugins');
const pluginDir = path.join(pluginsBaseDir, pluginName);

fs.ensureDir(pluginDir, (err) => {
  if (!err) {
    fs.copy(bundleDir, pluginDir, (err) => {
      if (!err) {
        console.log(`Plugin "${pluginName}" installed to ${pluginDir} successfully!`);
      } else {
        console.error(err);
      }
    });
  } else {
    console.error(err);
  }
});
