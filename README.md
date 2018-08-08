# Frontwork

Tools for Front End Web Developers Work.

[![NPM](https://nodei.co/npm/frontwork.png)](https://nodei.co/npm/frontwork/)
[![Build Status](https://travis-ci.org/isaxxx/frontwork.svg?branch=master)](https://travis-ci.org/isaxxx/frontwork)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Specification

* Compile EJS & Lint HTML

* Compile & Lint SCSS

* Transpile & Bundle & Lint JavaScript (Webpack)

* Compress Images

* Generate Iconfont

* Generate Styleguide

* Live Reload (Browsersync)

* Prepared SCSS and JavaScript - [Frontwork CSS](https://frontwork.isaxxx.com)

## Installation

### NPM

```bash
$ npm install --save frontwork
```

## Usage

### CLI

```bash
Options:
  --init         whether to initialize. [boolean] [default: false]
  --watch        whether to watch the files. [boolean] [default: false]
  --production   whether to product. [boolean] [default: false]
  --version, -v  show this version. [boolean]
  --help, -h     show this help. [boolean]
```

#### Initialize

Install the source files.

```bash
$ npx frontwork --init
```

#### Watch

Watch the source files and processes the task if there are changes.

```bash
$ npx frontwork --watch
```

#### Production

Delete unnecessary files and Compress all files.

```bash
$ npx frontwork --production
```

### JavaScript

```js
frontwork({
  init: true,
  watch: false,
  production: false
}).then(() => {
  console.log('Complete!!');
});
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
