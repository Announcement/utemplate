lsc -o bin -bc src/pseudo
coffee -o bin -bc src/test.coffee
webpack bin/test.js test/test.js
mocha
