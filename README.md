# Angular JSON API Interface 

This is an angular implementation of the [MicroStrategy JSON Data API](https://lw.microstrategy.com/msdz/MSDL/_CurrentGARelease/docs/projects/WebSDK/default.htm#topics/json/JSON_Data_API.htm), introduced in [MicroStrategy 10.4](https://community.microstrategy.com/t5/Tech-Corner/New-in-10-4-native-JSON-data-support-through-RESTful-APIs/ba-p/301774).

The interface is built using bootstrap components, brought to life using Angular JS, driven via the MicroStrategy JSON Data API.

# Live Demo
A live demo of this website can be seen here:
https://tiagosiebler.github.io/Angular_JSONAPI_Interface/build/index.html

This demo is a live implementation of the latest code in this repository.

# Basic Usage
## Development 
1. Install gulp dependencies

	```
	$ npm install -d
	```
2. Install remaining frontend JS dependencies

	```
	$ bower install
	```
3. Run with gulp

	```
	$ gulp
	```

## Production Build
The production build produces a zip file, or can be access directly via the build directory.

1. Install gulp dependencies

	```
	$ npm install -d
	```
2. Install remaining frontend JS dependencies

	```
	$ bower install
	```
3. Build with gulp

	```
	$ gulp build
	```
	
# Project Structure
##### src
Contains all source code that is modified and should be optimized/minified during build process:
* HTML
* JavaScript modules
* CSS

##### build
Contains production-ready project with heavy code optimization.

##### dev
Contains development project with unminified code. Will be launched automatically in browser if gulp is called without arguments.

##### gulpfile.js
Gulp tasks used to automate build & optimization process. 
* Minify HTML
* Concatenate and minify JS resources into two files
* Concatenate, optimize and minify custom CSS files
* Archive production-ready zip of project

For information on gulp refer to: https://github.com/gulpjs/gulp

##### package.json
npm depencenies for project, primarily used for gulp.

For information on npm refer to: https://www.npmjs.com/

##### bower.json
Bower dependencies for project, used for frontend JS code.

For information on Bower refer to: https://bower.io/

