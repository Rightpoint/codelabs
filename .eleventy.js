const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.setTemplateFormats([
        "md",
        "html",
        "css",
        "json",
        "jpg"
    ]);

    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };
};