function JsonBuilder(props) {
    const [textValue, setTextValue] = React.useState(JSON.stringify(props.value || {}));
    const [objectValue, setObjectValue] = React.useState(props.value || {});

    function handleChange(evt) {
        setTextValue(evt.target.value);
        try {
            setObjectValue(JSON.parse(evt.target.value));
        } catch (err) {
            console.log("Invalid json. Not printing.", err);
        }
    }

    return React.createElement(
        React.Fragment,
        {},
        React.createElement("textarea", {
            className: "json-input",
            rows: "10",
            onChange: handleChange,
            value: textValue
        }),
        React.createElement(JsonObject, { value: objectValue })
    );
}

function JsonObject(props) {
    const elements = Object.entries(props.value).map(function([key, val], index, arr) {
        const Elem = getElementType(val);
        return React.createElement(
            "span",
            { className: "json-object-pair" },
            React.createElement("span", { className: "json-key" }, `"${key}": `),
            React.createElement(Elem, { value: val }),
            index < arr.length - 1
                ? React.createElement("span", { className: "json-comma" }, ",")
                : null
        );
    });

    return React.createElement(
        "div",
        { className: "json-container" },
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
