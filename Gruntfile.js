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
        files : ["src/js/**/*.js"],
        tasks : ["jshint", "concat"]
    };

    //==========================================================

    config.handlebars = {};

    config.handlebars.compile = {
        files : {
            "src/js/templates.js" : ["hbs/**/*"]
        }
    };

    //==========================================================

    grunt.initConfig(config);
    tasks.forEach(grunt.loadNpmTasks);
    grunt.registerTask("default", ["sass:compile", "jshint", "concat", "watch"]);
};