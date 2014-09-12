// JSON especifiation, in a nutshell:
//
// Values:
//   Object
//   Array
//   String
//   Number
//   Boolean
//   null
//
// Key-value:
//   String : Value
//
// Object:
//   Collection of key-values
//
// Array:
//   Collection of values
//
// Number:
//   [-]999[.99999][[eE][+-]999]
//
// String, Boolean, null:
//   the usual

(function (context) {

    function processValueTemplate (value) {
        if (value instanceof Array) {
            return processArrayTemplate(value);
        }

        if (typeof value === "object") {
            return processObjectTemplate(value);
        }

        if (typeof value === "string" || typeof value === "number") {
            return processStringOrNumberTemplate(value);
        }

        if (typeof value === "boolean") {
            return processBooleanTemplate(value);
        }

        return processNullTemplate(value);
    }

    function processKeyValueTemplate (key, value) {
        var template = JRE.templates["keyvalue"];

        return template({
            key : key,
            value : processValueTemplate(value)
        });
    }

    function processArrayTemplate (array) {
        var template = JRE.templates["value-array"],
            data = {};

        data.elements = [];

        array.forEach(function (el) {
            data.elements.push({ value : processValueTemplate(el) });
        });

        return template(data);
    }

    function processBooleanTemplate (bool) {
        var template = JRE.templates["value-boolean"];

        return template({ value : (bool ? "true" : null) });
    }

    function processNullTemplate () {
        var template = JRE.templates["value-null"];

        return template({ value : "null" });
    }

    function processObjectTemplate (obj) {
        var template = JRE.templates["value-object"],
            keys = Object.keys(obj),
            result = []
        ;

        keys.forEach(function (key) {
            result.push(processKeyValueTemplate(key, obj[key]));
        });

        return template({ content : result.join("") });
    }

    function processStringOrNumberTemplate (string) {
        var template = JRE.templates["value-stringornumber"];

        return template({ value : string });
    }





    var EditorGenerator;

    EditorGenerator = function (json) {
        this.json = json;
        this.content = "";
        this.init();
    };

    EditorGenerator.fn = EditorGenerator.prototype;

    EditorGenerator.fn.init = function () {
        var template = JRE.templates["form"],
            html,
            json;

        // try {
            json = JSON.parse(this.json);
            html = template({ content : processValueTemplate(json) });

            $("#json-editor").html(html);
        // } catch (err) {
        //     console.log(err);
        // }
    };

    context.EditorGenerator = EditorGenerator;

})(this);

new EditorGenerator($("textarea").val());