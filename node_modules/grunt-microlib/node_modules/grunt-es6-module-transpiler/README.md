# grunt-es6-module-transpiler

> A Grunt task for processing ES6 module import/export syntax into one of AMD, CommonJS or globals using the es6-module-transpiler. Also allows you to temporarily enable ES6 modules for other tasks.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-es6-module-transpiler --save-dev
```

To use add the `transpile` task to your Grunt configuration.

### Using with RequireJS/CommonJS:

```js
grunt.loadNpmTasks('grunt-es6-module-transpiler');

grunt.initConfig({
  transpile: {
    main: {
      type: "cjs", // or "rjs"
      files: [{
        expand: true,
        cwd: 'lib/',
        src: ['**/*.js'],
        dest: 'tmp/'
      }]
    }
  }
});
```

### Using with Globals

```js
grunt.loadNpmTasks('grunt-es6-module-transpiler');

grunt.initConfig({
  transpile: {
    main: {
      type: "globals",
      imports: { bar: "Bar" },
      files: {
        'tmp/globals.js': ['test/fixtures/input.js'],
        'tmp/globals-bar.js': ['test/fixtures/bar.js']
      }
    }
  }
});
```

### Transpiling your files

Manually run the task with `grunt transpile` or include it as part of your build task:

```js
grunt.registerTask('build', ['clean', 'transpile', '...']);
```

## Using modules in other node scripts

Sometimes during the course of building an app, your grunt tasks will call out to other node scripts that interpret your files, but don't transpile them first. For example, running tests via [Mocha](http://visionmedia.github.io/mocha): you cannot use ES6 modules within your Mocha tests unless you specifically enable it before your tests run. You can now do that with a grunt task. For example:

```javascript
grunt.registerTask('test', ['transpile:enable', 'simplemocha']);
```

This will run your tests through the transpiler, automatically converting imports/exports to CommonJS. You could also chain tasks on the command line like:

```
grunt transpile:enable loadData
```

### Caveat

The module transpiler forces strict mode; there is no option to turn this off. If, like me, you typically use Mocha with [Chai](http://chaijs.com), this can cause a problem because Chai attempts to access `arguments.callee`, which violates strict mode. I switched to using [expect.js](https://github.com/LearnBoost/expect.js/) and it works great.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
05/28/2013 v0.3.0 - Add callback for dynamically specifying AMD modulename
05/02/2013 v0.2.0 - Fixes for globals, CoffeeScript, transpile:enable task for node scripts
04/17/2013 v0.1.0 - Initial release, supports basic transpile task
