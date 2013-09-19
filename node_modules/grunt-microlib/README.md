# grunt-microlib

Shared tooling between microlibraries that use the ES6 module transpiler and a compatible folder structure. Currently used in [rsvp.js](https://github.com/tildeio/rsvp.js).

## Developing

Any package that uses grunt-microlib has the following tasks:

* `grunt build` - Output AMD, CommonJS, and loader-wrapped (browser) versions of the project.
* `grunt tests` - Build AMD and CommonJS tests.
* `grunt test` - Run QUnit tests on the command-line.
* `grunt server` - Runs a server from the server's root. Navigate to `localhost:8000/test/` to run tests in the browser. Also auto-rebuilds the project when a file is changed.
