# Front end Boilerplate

This is an opinionated and simple starter kit that contains the basic structure
and code files to quickly start developing web pages or apps.

## Getting started

To install this project follow the next steps:

* Use `git clone` to clone this git repo on your local machine
* (or Download as zip this git repo on your local machine)
* Navigate to the root directory of the project
* Install devDependencies with `npm install`
* Build the project and start the local server with `gulp serve` and the project
is ready to take your changes.

---

## HTML (index.html)
The [index file](index.html) contains the basic skeleton of a typical web page and a few
TODO comments to help identify the missing values.

The following are included in the HEAD:
1. `normalize.css`: "v8.0.1" - stylesheet through jsDelivr CDN
2. `main.css` - the main stylesheet file
3. `index.css` - the index specific stylesheet file
4. Open graph starter code
5. Schema data script placeholder

The `BODY` element contains a basic markup which includes `header`, `main`, and
`footer`and at the end of the `body` is already linked the `main.js` file.

## STYLES
The [styles](styles) folder contains:
1. The `scss` folder, which includes all the structure and files about the styles.
This folder is compiled into normal CSS from the task runner. 
2. The `vendor` folder, which will contain all the extra stylesheets from third
party components.
3. The `index.scss` file, which is a stylesheet specific to the index page.
4. The `main.scss` file, which contains all the global style rules.

*Both `index.scss` and `main.scss` and all .css or .scss files are compiled by
the task runner and they are placed in the styles folder when the project gets
build.*

### SCSS Structure
The [scss](styles/scss) folder structure is based on the [7-1 architecture pattern](http://sass-guidelin.es/#architecture),
and consists of the following folders:
* **base**
> The `base/` folder holds what we might call the boilerplate code for the project.
In there, you might find the reset file, some typographic rules, and probably a
stylesheet defining some standard styles for commonly used HTML elements.
* **components**
> For smaller components, there is the `components/` folder. While `layout/` is macro
(defining the global wireframe), `components/` is more focused on widgets. It contains
all kind of specific modules like a slider, a loader, a widget, and basically
anything along those lines. There are usually a lot of files in `components/` since
the whole site/application should be mostly composed of tiny modules.
* **layout**
> The `layout/` folder contains everything that takes part in laying out the site or
application. This folder could have stylesheets for the main parts of the site (header,
footer, navigation, sidebar…), the grid system or even CSS styles for all the forms.
* **utilities**
> The `utilities/` folder gathers all Sass tools and helpers used across the project.
Every global variable, function, mixin and placeholder should be put in here. The rule
of thumb for this folder is that it should not output a single line of CSS when compiled
on its own. These are nothing but Sass helpers.

Each folder contains a partial with the same name that is imported to the `main.scss`
and it is used to hold the rest of the partials of that folder.

## SCRIPTS
The [scripts](scripts) folder contains:
1. The `vendor` folder, which is reserved for any third party script file.
2. The `main.js` file, which holds all the logic that is used across the project.

The `main.js` script should contain only code that is used in all pages (ie. menu
toggles, scroll events, animations etc) and not page specific code, these code
snippets should be on a separate file and linked to each page, so we can avoid
loading unnecessary code.

## TASK RUNNER
Bundled with the project is the task runner [`gulpfile.js`](gulpfile.js), which is
responsible for compiling, minification, image optimization, copying files, starting
the local server and watching for file changes and lastly for building the
distribution folder of the project.

It includes the following tasks:
<pre>
  ├── html
  ├── styles
  ├── scripts
  ├── images
  ├─┬ watch
  │ └─┬ (parallel)
  │   ├── watchFiles
  │   └── browserSync
  ├─┬ build
  │ └─┬ (parallel)
  │   ├── html
  │   ├── styles
  │   ├── scripts
  │   ├── images
  │   └── copy
  ├── clean
  └─┬ serve
    └─┬ (series)
      ├─┬ (parallel)
      │ ├── html
      │ ├── styles
      │ ├── scripts
      │ ├── images
      │ └── copy
      └─┬ (parallel)
        ├── watchFiles
        └── browserSync
</pre>

### `gulp serve`
This is the most usefull and commonly used task, which basically runs everything.
It builds the complete `dist` folder and a `css` folder inside the `src/styles`
directory that contains the compiled stylesheets without minification and autoprefixing
and then it starts a local server and begins to watch the critical files for changes.
It is the combination of the next two tasks, `build` and `watch`.

### `gulp build`
This task builds the final `dist` folder, that contains all the necessary project
files ready for deployment.

### `gulp watch`
This task starts a local server at port 3000 and watches for any changes made in the
html, styles, scripts or images files, if a change is made then the appropriate task is
executed and the browser automaticaly refreshes to reflect it.

### `gulp clean`
This task deletes any file or folder the task runner has created.

### `gulp html`
This task minifies any html file it finds in the `src` root directory, the minification
collapses the whitespace, minify any internal CSS and removes the comments.

### `gulp styles`
This task handles the styles folder for scss compiling and css minification and creates
a `css` folder inside the `src/styles` right after it compiles the scss files. Also,
it autoprefixes rules to support the last 2 browsers versions and internet explorer
9 and up.

### `gulp scripts`
This task uglifies any javascript file it finds inside the `src/scripts` directory
and outputs them to the corresponding folders in the `dist` folder.

### `gulp images`
This task optimizes all `.jpeg`, `.jpg`, `.gif`, `.png` and `.svg` files inside the
`src/images` directory and outputs them to the corresponding folders in the `dist`.

For `.jpeg` and `.jpg` it uses lossless conversion to progressive and it interlaces
`.gif` for progressive rendering.

## Additional files and folders

### [assets folder](assets)
The assets folder will contain all files related to the project, such as psd files,
stock/placeholder photos, icon sets, txt notes etc.

This folder isn't tracked by the task runner and it shouldn't contain any code files
that are intended for distribution.

### [humans.txt](src/humans.txt)
In this file you can provide any informations about the authors, the techonologies
used and any other information that describes the project. It is encoded in UTF-8.

For more informations visit [humanstxt.org](http://humanstxt.org/).

### [robots.txt](src/robots.txt)
In this file you can specify which search engine robots can crawl your website. It
is already set to allow any robot to scan any page and it can be used in conjuction
with the robots meta tag in the `head` of the HTML pages. It is encoded in ANSI.

for more informations visit [robotstxt.org](http://www.robotstxt.org/).

### [sitemap.xml](src/sitemap.xml)
You can use this file to list all available URLs of the website for crawling from the
search engines.

For more informations read this [wikipedia](https://en.wikipedia.org/wiki/Sitemaps) article.

---

## devDependencies
* browser-sync: "^2.26.3",
* del: "^4.0.0",
* gulp: "^4.0.0",
* gulp-autoprefixer: "^6.0.0",
* gulp-cssnano: "^2.1.3",
* gulp-htmlmin: "^5.0.1",
* gulp-imagemin: "^5.0.3",
* gulp-sass: "^4.0.2",
* gulp-uglify: "^3.0.2"

## Project structure

<pre>
  boileplate
  ├── assets
  ├── <i>dist (Handled from gulp tasks)</i>
  ├── <i>node_modules (Will be created by npm install)</i>
  ├── src
  │   │
  │   ├── images
  │   │   ├── backgrounds
  │   │   ├── icons
  │   │   └── logos
  │   │
  │   ├── scripts
  │   │   ├── vendor
  │   │   └── main.js
  │   │
  │   ├── styles
  │   │   ├── scss
  │   │   │   ├── base
  │   │   │   │   ├── _base.scss
  │   │   │   │   ├── _reset.scss
  │   │   │   │   └── _typography.scss
  │   │   │   │
  │   │   │   ├── components
  │   │   │   │   └── _components.scss
  │   │   │   │
  │   │   │   ├── layout
  │   │   │   │   ├── _grid.scss
  │   │   │   │   ├── _helpers.scss
  │   │   │   │   └── _layout.scss
  │   │   │   │
  │   │   │   └── utilites
  │   │   │       ├── _utilities.scss
  │   │   │       └── _variables.scss
  │   │   ├── vendor
  │   │   └── main.js
  │   │
  │   ├── humans.txt
  │   ├── index.html
  │   ├── robots.txt
  │   └── sitemap.xml
  │
  ├── gulpfile.js
  ├── LICENSE.md
  ├── package.json
  └── README.md
</pre>

---

## Author
**John Mantas** - *Initial Work*

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.