function JsonObject(props) {
    const elements = Object.entries(props.value).map(function([key, val], index) {
        const Elem = getElementType(val);

        return React.createElement(
            "span",
            { className: "json-object-pair" },
            React.createElement("span", { className: "json-key" }, `"${key}": `),
            React.createElement(Elem, { value: val }),
            index < Object.keys(props.value).length - 1
                ? React.createElement("span", { className: "json-comma" }, ",")
                : null
        );
    });

    return React.createElement(
        React.Fragment,
        {},
        React.createElement("span", { className: "json-object-open" }, "{"),
        React.createElement("span", { className: "json-object-body" }, ...elements),
        React.createElement("span", { className: "json-object-close" }, "}")
    );
}

function JsonArray(props) {
    const elements = props.value.map(function(val, index) {
        const Elem = getElementType(val);
        return React.createElement(
            "span",
            { className: "json-array-item" },
            React.createElement(Elem, { value: val }),
            index < props.value.length - 1
                ? React.createElement("span", { className: "json-comma" }, ",")
                : null
        );
    });

    return React.createElement(
        React.Fragment,
        {},
        React.createElement("span", { className: "json-array-open" }, "["),
        React.createElement("span", { className: "json-array-body" }, ...elements),
        React.createElement("span", { className: "json-array-close" }, "]")
    );
}

function JsonPrimitive(props) {
    const val = props.value === null ? "NULL" : props.value;
    return React.createElement(
        "span",
        { className: "json-primitive" },
        typeof val === "string" ? `"${val}"` : val.toString()
    );
}

function getElementType(val) {
    if (["number", "boolean", "string"].includes(typeof val) || val === null) {
        return JsonPrimitive;
    } else if (Array.isArray(val)) {
        return JsonArray;
    } else {
        return JsonObject;
    }
}

const testObject = {
    num: 1,
    str: "blah",
    null: null,
    arr: [1, 2, 3],
    bool: false,
    blah: {
        hello: {
            test: 1
        },
        another: {
            lksjdfjkls: 42
        }
    },
    a: "b",
    nestedArr: [
        [1, 2, 3],
        [4, 5, 6],
        {
            a: 1,
            b: 2,
            c: 3
        }
    ]
};

ReactDOM.render(
    React.createElement(JsonObject, { value: testObject }),
    document.getElementById("main")
);
