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
        React.createElement(
            "div",
            { className: "json-container" },
            React.createElement(JsonObject, { value: objectValue })
        )
    );
}

function JsonObject(props) {
    const elements = Object.entries(props.value).map(function([key, val], index, arr) {
        const [visible, setVisible] = React.useState(true);
        const Elem = getElementType(val);

        return React.createElement(
            "span",
            { className: "json-object-pair" },
            Elem !== JsonPrimitive
                ? React.createElement(
                      "button",
                      { className: "json-collapse", onClick: () => setVisible(!visible) },
                      visible ? "▼" : "►"
                  )
                : null,
            React.createElement("span", { className: "json-key" }, `"${key}": `),
            React.createElement(Elem, { value: val, visible: visible }),
            index < arr.length - 1
                ? React.createElement("span", { className: "json-comma" }, ",")
                : null
        );
    });

    return React.createElement(
        React.Fragment,
        {},
        React.createElement("span", { className: "json-object-open" }, "{"),
        props.visible === false
            ? React.createElement("span", {}, "…")
            : React.createElement("span", { className: "json-object-body" }, ...elements),
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
        props.visible === false
            ? React.createElement("span", {}, "…")
            : React.createElement("span", { className: "json-array-body" }, ...elements),
        React.createElement("span", { className: "json-array-close" }, "]")
    );
}

function JsonPrimitive(props) {
    const val = props.value === null ? "NULL" : props.value;
    return React.createElement(
        "span",
        { className: `json-primitive json-pimitive--${typeof val}` },
        typeof props.value === "string" ? `"${val}"` : val.toString()
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
