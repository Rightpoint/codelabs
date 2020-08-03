---
eleventyExcludeFromCollections: true
---
# Rightpoint Codelabs

## Usage

First and foremost, in order to build your own custom codelab you need to have Google's [CLaaT (Codelabs as a Thing)][claat] tool installed. Following the directions on the Github page should get you up and running. Once you have CLaaT installed you should be able to run all of the build commands.

To add a new codelab you can just follow [the formatting guidelines for creating a new codelab][guidelines]; for this project specifically we are using Markdown files, not Google Docs. All the codelab Markdown files are located in the [`_codelabs`][codelabs_dir] directory. Once you've completed your codelab you can test your changes by running the following commands:

  1. `npm install`: installs the necessary project dependencies
  2. `npm run build`: will build the project but if you want to actually run it locally then use
  3. `npm run dev`: will run the project on your localhost

If nothing has gone wrong you should see a message from Browsersync providing the access URLs to your local build.

[claat]: https://github.com/googlecodelabs/tools/tree/master/claat
[guidelines]: https://github.com/googlecodelabs/tools/blob/master/FORMAT-GUIDE.md
[codelabs_dir]: ./_codelabs/
