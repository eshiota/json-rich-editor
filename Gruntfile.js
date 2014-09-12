module.exports = function(grunt) {
    var packageVersion = grunt.file.readJSON("package.json").version;
    var config = {};
    var tasks = [
        "grunt-contrib-jshint",
        "grunt-contrib-sass",
        "grunt-contrib-watch",
        "grunt-contrib-concat",
        "grunt-contrib-uglify",
        "grunt-contrib-handlebars"
    ];

    //==========================================================

    config.jshint = {};

    config.jshint.run = {
        options : {
            jshintrc : ".jshintrc",
            ignores : [
                "lib/*"
            ]
        }
    };

    //==========================================================

    config.sass = {};

    config.sass.compile = {
        files : {
            "build/json-rich-editor.css" : "src/scss/json-rich-editor.scss"
        },
        options : {
            style : "nested",
            require : "sass-globbing"
        }
    };

    config.sass.build = {
        files : {
            "build/json-rich-editor.min.css" : "src/scss/json-rich-editor.scss"
        },
        options : {
            style : "compressed",
            require : "sass-globbing"
        }
    };

    //==========================================================

    config.concat = {};

    config.concat.bundle = {
        src : [
            "lib/handlebars.runtime-v1.3.0.js",
            "src/js/templates.js",
            "src/js/json-rich-editor.js"
        ],
        dest : "build/json-rich-editor.js"
    };

    //==========================================================

    config.uglify = {
        main : {
            files : {
                "build/json-rich-editor.min.js" : ["build/json-rich-editor.js"]
            }
        }
    };

    //==========================================================

    config.watch = {};

    config.watch.css = {
        files : ["src/scss/**/*.scss"],
        tasks : ["sass:compile"]
    };

    config.watch.js = {
        files : ["src/js/**/*.js", "src/hbs/**/*.hbs", "!src/js/templates.js"],
        tasks : ["jshint", "handlebars", "concat"]
    };

    //==========================================================

    config.handlebars = {};

    config.handlebars.compile = {
        options : {
            namespace : "JRE.templates",
            partialsUseNamespace : true,
            partialRegex: /^_.*\.hbs$/,
            processName: function(fileName) {
            var bits = fileName.split("/");
            return bits[bits.length - 1].replace(".hbs", "");
          },

          processPartialName: function(fileName) {
            var bits = fileName.split("/");
            return bits[bits.length - 1].slice(1).replace(".hbs", "");
          }
        },
        src : "src/hbs/**/*.hbs",
        dest : "src/js/templates.js"
    };

    //==========================================================

    grunt.initConfig(config);
    tasks.forEach(grunt.loadNpmTasks);
    grunt.registerTask("default", ["sass:compile", "jshint", "handlebars", "concat", "watch"]);
};