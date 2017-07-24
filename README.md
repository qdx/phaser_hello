# My first attempt in building a web game

## pre-requisites
Install node-js
`brew install node`

Install [gulp-cli](https://www.npmjs.com/package/gulp-cli) globally, [why?](https://stackoverflow.com/questions/35571679/what-does-gulp-cli-stands-for)
`npm install -g gulp-cli`

Install [typings](https://github.com/typings/typings) globally.
`npm insatll -g typings`

Install [bower](https://bower.io/) globally.
`npm insatll -g bower`

Install [serve](https://www.npmjs.com/package/serve) globally.
`npm install -g serve`

## Now change directory into project directory

### npm dependencies
Install npm dependencies(local gulp install happens here).

`npm install`

npm will look at `package.json` and install the dependencies described.
To add more packages, do

`npm install --save-dev <package_name>`

when installing package
If you don't have a `package.json` yet, it can be created via `npm init`

### type definition dependencies
Install typescript type definitions(for phaser).

`typings install`

typings will look at `typings.json` and install the dependencies described.
To add more type definitions, do

`typings install <type_def_name> --save`

If you don't have a `typings.json`, it can be created via `typings init`

### js lib dependencies
Install libs.

`bower install`

bower will look at `bower.json` and install the dependencies described.
To add more dependencies to `bower.json`, do

`bower install <package> --save`

If you don't have a `bower.json`, create it via `bower init`


References:
https://www.typescriptlang.org/docs/handbook/gulp.html
https://github.com/jojoee/phaser-examples
