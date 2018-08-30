---
title: Getting started with Webpack
subTitle: Simple is good
cover: photo-webpack-cover.png
---

Webpack is used to compile JavaScript modules. Once installed, we can interface with webpack either from its CLI or API.

In this post, we will walk through some steps to understand the basic way of using Webpack in a simple project.

### Creating a project without Webpack

1. Creating npm project

```js
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

2. Create project structure, and files

```js
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+ |- index.js
```

We created folder *src* and new file *index.js*, *index.html*. 

- The index.html is the file we open to view output of the project.
- The index.js is the JavaScript file, include JavaScript code.

3. We are going to use a third-party module *lodash* for our JavaScript code. 

We can include *lodash* directly in index.html, as belowing code:

```html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

In the index.js file, we can use functions expored by *lodash* modules:

```js
function component() {
  let element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
document.body.appendChild(component());
```

The index.js did not explicitly declare a need for *lodash*; it just assumes library usage by the global variable *_* exists (provided by lodash).

4. Open the index.html, the result should be:

```
Hello webpack
```

In those steps, we point out some limitation:

- It is not clear that the index.js depends on an external library
- If a dependency is missing or included incorrectly, the application will not funcion properly
- If a dependency is included but not used,  the browser will be forced to download unnecessary code

### One further step 

We are going to modify our previous project a bit to apply Webpack. 

1. Let add *lodash* to npm project

```
npm install --save lodash
```

Note:

+ With *—save* option, the installed package will be bundled into the production bundle. 
+ With *—save-dev* option, the installed package is applied only for development purpose (such as: linter, testing libraries)

2. Modify the index.js file

Since we now using the *lodash* from npm libraries, we need to modify index.js to import that library directly:

```js
import _ from 'lodash';

function component() {
	let element = document.createElement('div');
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
   return element;
}

document.body.appendChild(component());
```

3. Running Webpack cli command, generate the optimized JavaScript file from index.js

```
npx webpack
```

This command (shipped with Node 8.2, npm 5.2.0 or higher), which will take our script *src/index.js* as the entry point, and will generate *dist/main.js* as the output.

The output of the command like:

```
⇒  npx webpack --config webpack.config.js 
Hash: 3510baa6270c734bf58f
Version: webpack 4.17.1
Time: 339ms
Built at: 08/29/2018 8:06:02 PM
  Asset      Size  Chunks             Chunk Names
main.js  70.5 KiB       0  [emitted]  main
Entrypoint main = main.js
[1] ./src/index.js 312 bytes {0} [built]
[2] (webpack)/buildin/global.js 489 bytes {0} [built]
[3] (webpack)/buildin/module.js 497 bytes {0} [built]
    + 1 hidden module
```

4. In the last step, we copy our index.html, into the *dist* folder, modify it so it will point to the main.js file that is just genarated.

```html
  <!doctype html>
  <html>
   <head>
     <title>Getting Started</title>
   </head>
   <body>
		<script src="main.js"></script>
   </body>
  </html>
```

Note that we also remove the including of lodash library in the index.html file.

Now, we can open this index.html file, and see the same output as the first project we did. However, in this method, we have made some optimization for generated JavaScript, and clearly define the dependency between our JavaScript code with external libraries.

### Using configuration

We can use Webpack without any configuration, but in most cases, project will need a more complex setup, which requires a configuration file. So we create a new file in the project structure

```
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Now we can run the webpack command again with input configuration file, and get the result

```
npx webpack --config webpack.config.js

Hash: dabab1bac2b940c1462b
Version: webpack 4.12.0
Time: 283ms
Built at: 13/06/2018 11:53:51
  Asset      Size  Chunks             Chunk Names
main.js  70.4 KiB       0  [emitted]  main
[1] (webpack)/buildin/module.js 497 bytes {0} [built]
[2] (webpack)/buildin/global.js 489 bytes {0} [built]
[3] ./src/index.js 216 bytes {0} [built]
    + 1 hidden module
```

Note: if webpack.config.js is present, the webpack command picks it up by default.

A configuration file allows far more flexibility than simple CLI usage. We can specify loader rules, plugins, resolve option and many other enhancements.

### NPM Script

We can make another way rather than using CLI command as previous steps. We can use Webpack API, and include it in the *package.json* file:

```js
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "main": "src/index.js",
  "license": "MIT",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },  
  "dependencies": {
    "lodash": "^4.17.10",
    "webpack": "^4.17.1",
    "webpack-cli": "^3.1.0"
  }
}
```

Now, we run the npm script command and get the same result

```
npm run build
```

### Asset Management

In the previous sections, we see how Webpack can manage the JavaScript files and libraries. In next section, we will see how use Webpack to manage other types of resource (or asset), like images, css files, font

Prior the webpack, front-end developers have to use different tools like **grunt** or **gulp** to process the assets file, and move them from */src* folder into */dist* or */build* directories. But with Webpack, it now helps us to dynamically bundle all dependencies (by creating a depedency graph). Every modules now explicitly states its dependencies, and we will avoid bundling modules that aren’t in use.

In order to include any other types of file (beside the JavaScript), Webpack invoke the help from **loader**. Let start with CSS to see how it works.

1. Create new css file, and update JavaScript to use new css

```
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

**src/style.css**

```css
.hello {
  color: red;
}
```

**src/index.js**

```js
import _ from 'lodash';
import './style.css';

function component() {
	var element = document.createElement('div');
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.classList.add('hello');
	return element;
}

document.body.appendChild(component());
```

2. Now, we adding some libraries and update webpack configure file to use css loader.

```
npm install --save-dev style-loader css-loader
```

**webpack.config.js**

```js
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

Notice about `test: /\.css$/,`, Webpack uses a regular expression to determine which files it should look for and serve to a specific loader. With our defined rule, any files ending with *.css* file will be handled by *style-loader* and *css-loader*.

3. Now, running npm build script to get output as below:

```
⇒  npm run build

> webpack-demo@1.0.0 build /Users/anh.le/NoEasy/webpack-demo
> webpack

Hash: e8cf386cbf62e4c2935f
Version: webpack 4.17.1
Time: 3436ms
Built at: 08/29/2018 9:43:33 PM
  Asset      Size  Chunks             Chunk Names
main.js  76.4 KiB       0  [emitted]  main
Entrypoint main = main.js
[1] ./src/index.js 370 bytes {0} [built]
[2] (webpack)/buildin/global.js 489 bytes {0} [built]
[3] (webpack)/buildin/module.js 497 bytes {0} [built]
[4] ./src/style.css 1.05 KiB {0} [built]
[5] ./node_modules/css-loader!./src/style.css 189 bytes {0} [built]
    + 4 hidden modules

```

4. Logic to handle other resources is similar.

- With image file, font file, we apply the *file-loader*
- JSON file has built-in loader
- CSVs, TSVs and XML, we use *cvs-loader* and *xml-loader*

**webpack.config.js**

```js
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
```

### Output Management

When the project become more complex, we have multiple JavaScript code, we can modify the webpack configure files to handle multiple entry file, and output file.

1. Let add one more JavaScript file:

**src/print.js**

```js
export default function printMe() {
  console.log('I get called from print.js!');
}
```

Then update **src/index.js** to use new exported function

```js
import _ from 'lodash';
import printMe from './print.js';
import './style.css';

function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    // Adding button
    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;

    element.appendChild(btn);
  
    return element;
  }
  
  document.body.appendChild(component());
```

2. Then, modify Webpack configuration for multiple entry files and output files (assume we want to do that)

```js
const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    ...
};
```

3. Running `npm run build` script to get new generated files in *dist* folder:

```
⇒  npm run build

> webpack-demo@1.0.0 build /Users/anh.le/NoEasy/webpack-demo
> webpack

Hash: d323be0c12fe3be877d7
Version: webpack 4.17.1
Time: 3422ms
Built at: 08/30/2018 9:02:38 AM
                               Asset      Size  Chunks             Chunk Names
f074caef71f27ea004b6deb0a5b533b0.png    57 KiB          [emitted]  
                       app.bundle.js  76.7 KiB    0, 1  [emitted]  app
                     print.bundle.js  1.02 KiB       1  [emitted]  print
Entrypoint app = app.bundle.js
Entrypoint print = print.bundle.js
[0] ./src/print.js 84 bytes {0} {1} [built]
[2] ./src/icon.png 82 bytes {0} [built]
[3] ./src/index.js 745 bytes {0} [built]
[4] (webpack)/buildin/global.js 489 bytes {0} [built]
[5] (webpack)/buildin/module.js 497 bytes {0} [built]
[6] ./src/style.css 1.05 KiB {0} [built]
[7] ./node_modules/css-loader!./src/style.css 189 bytes {0} [built]
    + 4 hidden modules
```

In the output files, we have created two new  bundle files: *app.bundle.js* and *print.bundle.js*, therefore, we have to modify the index.html files in *dist* folder to point the new files correctly:

```html
<!doctype html>
<html>

<head>
    <title>Output Management</title>
    <script src="./print.bundle.js"></script>
</head>

<body>
    <script src="./app.bundle.js"></script>
</body>

</html>
```

4. The issue with aboves steps (step 1 - 3) is that every time we modify the entry files, or even creating the new one, then we have to update *index.html*, therefore, we can use an extra plugin to handle this dynamically.

Now, let install new plugin:

```
npm install --save-dev html-webpack-plugin
```

And update the Webpack configuration:

**webpack.config.js**

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    ...
};
```

Then, we re-run the build command, and see the new *index.html* is generated automatically in *dist* folder withouth touch any finger.

```
⇒  npm run build                                                                 

> webpack-demo@1.0.0 build /Users/anh.le/NoEasy/webpack-demo
> webpack

Hash: b4b6370b7e29f5b5e994
Version: webpack 4.17.1
Time: 697ms
Built at: 08/30/2018 9:19:00 AM
                               Asset       Size  Chunks             Chunk Names
f074caef71f27ea004b6deb0a5b533b0.png     57 KiB          [emitted]  
                       app.bundle.js   76.7 KiB    0, 1  [emitted]  app
                     print.bundle.js   1.02 KiB       1  [emitted]  print
                          index.html  254 bytes          [emitted]  
Entrypoint app = app.bundle.js
Entrypoint print = print.bundle.js
[0] ./src/print.js 84 bytes {0} {1} [built]
[2] ./src/icon.png 82 bytes {0} [built]
[3] ./src/index.js 745 bytes {0} [built]
[4] (webpack)/buildin/global.js 489 bytes {0} [built]
[5] (webpack)/buildin/module.js 497 bytes {0} [built]
[6] ./src/style.css 1.05 KiB {0} [built]
[7] ./node_modules/css-loader!./src/style.css 189 bytes {0} [built]
    + 4 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [2] (webpack)/buildin/global.js 489 bytes {0} [built]
    [3] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 2 hidden modules

```

We can learn more about this plugin from this link: [GitHub - jantimon/html-webpack-plugin: Simplifies creation of HTML files to serve your webpack bundles](https://github.com/jantimon/html-webpack-plugin)

Another helpful plugin is **clean-webpack-plugin**. This plugin supports us to clean up the dist folder every time we run the build script.  The setup is quite easy with few steps.

Install the plugin:

```
npm install --save-dev clean-webpack-plugin
```

Then, update the webpack configure file as belowing:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
	  ...
};
```

> Note: Webpack use *manifest file* to keep track how all modules, plugins map to output bundles. That why we see plugins know what files they can generate.  

### Development

This section is dedicated to provide guideline to setup environment to make development more easier. It should not be applied in the production.

1. Using source map

Source map supports developer to track down the origin files that cause an errors after creating bundle files. In this sample, we use *inline-source-map* for that purpose:

**webpack.config.js**

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    ...
};
```


