# utemplate
Currently available on
[github](https://github.com/Announcement/utemplate)
and
[npm](https://www.npmjs.com/package/utemplate)

Templates are supported by default in HTML5, this is a single lightweight script to prepare them for you.

1. Create your template, it won't be rendered
2. Decide where it belongs
3. Prepare the template with some data
4. Insert the prepared template into the DOM

# install
## npm
`npm i --save utemplate`
## git
`git clone git@github.com:Announcement/utemplate.git`
## html > head
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

It doesn't *have* to be in the head, put it wherever you want, just make sure it's loaded before the script is run.


## html > body
~~~ html
<section id="messages">
</section>
~~~

This is where we're going to put it.

##
~~~ javascript
// get an element with a querySelector(or provide an element, jQuery object)
template = new Template("#message");

data = {
  title: 'Hello, world!',
  published: new Date(),
  message: 'How are you today?'
};

post = template.prepare(data);

document.getElementById("messages").appendChild(post);
~~~


## That's nice, but why is it useful?

In the real world, data is going to be from a source. In my environment it's a couchdb document, but yours can be whatever you want it to be.

## Where does my data come from?

The properties directly correspond to the text inside of the template and are automatically filled with those keys.

## Why wouldn't I use Angular, Meteor, or something *better*

If you enjoy reading and learning new things, then those will probably better for you. But if you want something small, fast and want it to just work, then microTemplates are for you.

Oh, did I mention ours is less than 100 lines of clean code?
