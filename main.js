(function() {
    var obj = {
        "num": 1,
        "str": "blah",
        "nul": null,
        "arr": [1, 2, 3],
        "bool": false,
        'blah': {
            "hello": {
                "test": 1
            },
            "another": {
                "lksjdfjkls": 42
            }
        },
        "a": 'b',
        "nestedArr": [
            [1,2,3],
            [4,5,6],
            {
                a: 1,
                b: 2,
                c: 3
            }
        ]
    };

    init(document.getElementById("main"));

    function init(entry) {
        entry.innerHTML = buildJson(obj);
    }

    function buildJson(obj) {
        var html = '<span class="json-object-open">{</span>';
        html += '<span class="json-object-body">';
        Object.keys(obj).forEach(function(key, index) {
            var val = obj[key];
            html += `<span class="json-pair">`;
            html += `<span class="json-key">"${key}": </span>`;

            if (typeof val === "number" || typeof val === "boolean") {
                html += buildJsonNumber(val);
            } else if (typeof val === "string") {
                html += buildJsonString(val);
            } else if (val === null) {
                html += buildJsonNull(val);
            } else if (Array.isArray(val)) {
                html += buildJsonArray(val);
            } else {
                html += `${buildJson(val)}`;
            }

            if (index < Object.keys(obj).length - 1) {
                html += `<span class="json-comma">,</span>`;
            }
            html += `</span>`;
        });
        html += `</span>`;

        html += `<span class="json-object-close">}</span>`;

        return html;
    }

    function buildJsonArray(val) {
        var html = `<span class="json-array-open">[</span>`;
        html += `<span class="json-array-body">`;
        val.forEach(function(item, index) {
            html += `<span class="json-array-item">`;

            if (typeof item === "number" || typeof item === "boolean") {
                html += buildJsonNumber(item);
            } else if (typeof item === "string") {
                html += buildJsonString(item);
            } else if (item === null) {
                html += buildJsonNull(item);
            } else if (Array.isArray(item)) {
                html += buildJsonArray(item);
            } else {
                html += `${buildJson(item)}`;
            }

            if (index < val.length-1) {
                html += `<span class="json-comma">,</span>`;
            }

            html += `</span>`;
        });
        html += `</span>`;
        html += `<span class="json-array-close">]</span>`;

        return html;
    }

    function buildJsonNumber(val) {
        return `<span class="json-number">${val.toString()}</span>`;
    }

    function buildJsonString(val) {
        return `<span class="json-string">"${val}"</span>`;
    }

    function buildJsonNull(val) {
        return `<span class="json-null">null</span>`;
    }

})();
