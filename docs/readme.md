# Documentation

[![npm version](https://badge.fury.io/js/utemplate.svg)](https://badge.fury.io/js/utemplate)
[![dependencies](https://david-dm.org/Announcement/utemplate/status.svg)](https://david-dm.org/Announcement/utemplate?view=list)
[![devDependencies](https://david-dm.org/Announcement/utemplate/dev-status.svg)](https://david-dm.org/Announcement/utemplate?type=dev&view=list)
[![Build Status](https://travis-ci.org/Announcement/utemplate.svg?branch=master)](https://travis-ci.org/Announcement/utemplate)
[![npm downloads](https://img.shields.io/npm/dt/utemplate.svg?maxAge=2592000)]()

## Preface

## Tips and tricks

### template pipe calls are chainable.

~~~ javascript
template
.pipe({message: 'Hello, world!'})
.pipe("#messages");
~~~

### parasites are your friend.

~~~ javascript
(new Parasite(=> 'ishygddt')).infect(element);
~~~


## Developer Guide

### Codebase regulations

1. Please try to write **docs** and tests as you go
2. Keep your code nice and readable
3. The more lines the better
4. Add functionality as long as it isn't application specific

### Documentation is...
- jsdoc
- comments
- readme
- changelog
- git commit
- any *additional* form over papertrail

### Getting started with ECMA6

#### To compile es2015 to es5

1. [babel](https://babeljs.io/)
2. [traceur](https://github.com/google/traceur-compiler)

#### Preparing modules

1. [rollup](//rollupjs.org/)
2. [webpack](//webpack.github.io/)
3. [browserify](//browserify.org/)

## Microlibraries

- [Alchemist](./alchemist.md) -- Elemental transformation
- [Parasite](./parasite.md) -- Tools to modify an element
- [Template](./template.md) -- Interface for manipulating from a source

## Future tasks

- More tests, (template doesn't have any)
- Fix **Code Coverage**
- Multidimensional indexing
- Finish writing [jsdoc](//usejsdoc.org/) scripts
- Make a [gh-pages](//github.com/Announcement/utemplate/tree/gh-pages) branch

## Changelog

### 1.1 "Tophat"

- Deep property accessors

### 2.0 "Bloodsucker"

- Internally left es5 for es6
- Introduction of parasites

### 2.1 "Dusty"

- Allowed querySelectors in the pipeline

### 2.2 "Permiscuous"

- Multiple children per template
- Alchemist is now basically useless...
- [2.2.3] No more nudism / exposure.
