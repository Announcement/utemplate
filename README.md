# µtemplate
Currently available on
[github](https://github.com/Announcement/utemplate)
and
[npm](https://www.npmjs.com/package/utemplate)

[![npm version](https://badge.fury.io/js/utemplate.svg)](https://badge.fury.io/js/utemplate)
[![dependencies](https://david-dm.org/Announcement/utemplate/status.svg)](https://david-dm.org/Announcement/utemplate?view=list)
[![devDependencies](https://david-dm.org/Announcement/utemplate/dev-status.svg)](https://david-dm.org/Announcement/utemplate?type=dev&view=list)
[![Build Status](https://travis-ci.org/Announcement/utemplate.svg?branch=master)](https://travis-ci.org/Announcement/utemplate)
[![npm downloads](https://img.shields.io/npm/dt/express.svg?maxAge=2592000)]()
Templates are supported by default in HTML5, this is a single lightweight script to prepare them for you.

1. Create your template, it won't be rendered
2. Decide where it belongs
3. Prepare the template with some data
4. Insert the prepared template into the DOM

## install

### npm

 `npm i --save utemplate`

### git

`git clone git@github.com:Announcement/utemplate.git`

## usage

### head

It doesn't *have* to be in the head, put it wherever you want, just make sure it's loaded before the script is run.
We chose this location because if you don't have a `<head>` and `<body>` tags, most parsers throw the `<template>` in there by default.

~~~ html
<template id="message">
  <article>
    <header>
      <h2>{title}</h2>
      <time datetime="{published}"></time>
    </header>
    <p>{message}</p>
  </article>
</template>
~~~


### body

This is where we're going to put it for all to see

~~~ html
<section id="messages">
</section>
~~~

### script

~~~ javascript
// string:querySelector, Elemental (see Alchemist)
template = new Template("#message");

// some sample data
data = {
  title: 'Hello, world!',
  published: new Date(),
  message: 'How are you today?'
};

// prepare the template with some data
template.pipe(data);

// attach it to the DOM (now via a querySelector)
template.pipe('#messages');

// friendly reminder that pipes are chainable
// template.pipe(data).pipe(messages);
~~~

## frequently asked questions
### That's nice, but why is it useful?

In the real world, data is going to be from a source.
My environment has a couchdb document, but yours can be whatever you want it to be

- avoid writing *html* inside of *javascript*
- don't `document.createElement` or `document.createTextNode` by hand
- no more writing stringified json to the document.


### Where does my data come from?

The properties directly correspond to the text inside of the template and are automatically filled with those keys.

As of version **utemplate@1.1.0** they can be multiple levels deep such as `{a: {b: {c: 'd'}}}` and the template requests `{a.b.c}`

### Why wouldn't I use Angular, Meteor, or something *better*

If you enjoy reading and learning new things, then those will probably better for you. But if you want something small, fast and want it to just work, then microTemplates are for you.

Ours is very small and easy to learn, so if you're a *beginner* (or a *minimalist* like myself), then you should **definately** start here.
