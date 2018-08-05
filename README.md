# Frontwork

Tools for Front End Web Developers Work.

[![NPM](https://nodei.co/npm/frontwork.png)](https://nodei.co/npm/frontwork/)
[![Build Status](https://travis-ci.org/isaxxx/frontwork.svg?branch=master)](https://travis-ci.org/isaxxx/frontwork)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Specification

* Compile the EJS

* Compile the SCSS

* Transpile the JavaScript

* Compress the Images

* Generate the Iconfont

* Generate the Styleguide

* Prepared SCSS and JS - [Frontwork CSS](https://frontwork.isaxxx.com)

## Installation

### npm

```bash
$ npm install --save frontwork
```

## Usage

```bash
Options:
  --init         whether to initialize. [boolean] [default: false]
  --watch        whether to watch the files. [boolean] [default: false]
  --production   whether to product. [boolean] [default: false]
  --version, -v  show this version. [boolean]
  --help, -h     show this help. [boolean]
```

### Initialize

Install the source files.

```bash
$ npx frontwork --init
```

### Watch

Watch the source files and processes the task if there are changes.

```bash
$ npx frontwork --watch
```

### Production

Delete unnecessary files and Compress all files.

```bash
$ npx frontwork --production
```

### Version

```bash
$ npx frontwork --version
```

### Help

```bash
$ npx frontwork --help
```

## Configuration

```bash
src
├── ejs
│   ├── _common
│   │   ├── _footer.ejs
│   │   └── _header.ejs
│   ├── about
│   │   └── index.ejs
│   ├── index.ejs
│   └── options.json
├── images
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   └── og-image.png
├── js
│   ├── app
│   │   ├── app.js
│   │   └── styleguide.js
│   └── vendor
│       └── sample.js
├── scss
│   ├── app
│   │   ├── _components-editor.scss
│   │   ├── _components-modules.scss
│   │   ├── _config.scss
│   │   ├── _iconfont.scss
│   │   ├── _theme-aside.scss
│   │   ├── _theme-footer.scss
│   │   ├── _theme-header.scss
│   │   ├── _theme-main.scss
│   │   ├── app.scss
│   │   └── styleguide.scss
│   └── vendor
│       └── sample.css
└── svg
    └── sample.svg
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
