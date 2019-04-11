<img align="right" width="256" height="256" src="https://user-images.githubusercontent.com/1903876/54630167-7699ef80-4a36-11e9-9dfb-37eecc5ae69d.png">

# generator-studio-app

[![Version][npm-version-shield]][npm-our-package]
[![Travis Build Status][travis-badge]][travis]
[![codecov][codecov-badge]][codecov]
[![Dependency Status][david-dm-shield]][david-dm]
[![LICENSE][license-badge]](LICENSE)
[![Downloads][npm-stats-shield]][npm-stats]

> Yeoman generator for InVision Studio Apps

<!-- toc -->
* [🗒 Description](#-description)
<!-- tocstop -->

## 🗒 Description

This is a generator for making Studio apps using Node.js. This framework was built using Yeoman.

## Installation

First, install [Yeoman][yeoman] and generator-studio-app using
[npm][npm] (we assume you have pre-installed [node.js][nodejs]).

**$** `npm install -g yo`

**$** `npm install -g generator-studio-app`

Then generate your new app:

**$** `cd /path/to/where/you/want/to/write/your/apps`

Run **$** `yo`, and select the `Studio App` option in the 'Run a generator' list.

## Composability

> Composability is a way to combine smaller parts to make one large thing.
> Sort of [like Voltron®][voltron]
> — [Yeoman docs][yeoman-docs]

### Install
**$** `npm install --save generator-studio-app`

### Compose

```js
this.composeWith(require.resolve('generator-studio-app')/*, options */)
```

#### Options

```js
{
    // supply alternative defaults
    appId: 'my-app',
    description: 'My description',
    name: 'My user',
    email: 'my@email.tld',
}
```

## License

MIT © [InVision, Inc.][invision-studio]

[codecov-badge]:        https://codecov.io/gh/InVisionApp/generator-studio-app/branch/master/graph/badge.svg?token=I9IGBzprlC
[codecov]:              https://codecov.io/gh/InVisionApp/generator-studio-app
[david-dm-shield]:      https://david-dm.org/InVisionApp/generator-studio-app/status.svg
[david-dm]:             https://david-dm.org/InVisionApp/generator-studio-app
[invision-studio]:      https://www.invisionapp.com/studio
[license-badge]:        https://img.shields.io/badge/license-MIT-orange.svg
[nodejs]:               https://nodejs.org/
[npm-our-package]:      https://www.npmjs.com/package/generator-studio-app
[npm-stats-shield]:     https://img.shields.io/npm/dt/generator-studio-app.svg?maxAge=2592000
[npm-stats]:            http://npm-stat.com/charts.html?package=generator-studio-app&author=&from=&to=
[npm-version-shield]:   https://img.shields.io/npm/v/generator-studio-app.svg
[npm]:                  https://www.npmjs.com/
[travis-badge]:         https://travis-ci.org/InVisionApp/generator-studio-app.svg?branch=master
[travis]:               https://travis-ci.com/InVisionApp/generator-studio-app
[voltron]:              http://25.media.tumblr.com/tumblr_m1zllfCJV21r8gq9go11_250.gif
[yeoman-docs]:          http://yeoman.io/authoring/composability.html
[yeoman]:               http://yeoman.io
