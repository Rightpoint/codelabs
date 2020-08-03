const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.setTemplateFormats([
        "md",
        "html",
        "css",
        "jpg"
    ]);

    return {
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            output: "docs"
        },
        pathPrefix: "/codelabs/"
    };
};