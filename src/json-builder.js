function JsonBuilder(props) {
    const [objectValue, setObjectValue] = React.useState(props.value || {});

    return React.createElement(
        React.Fragment,
        {},
        React.createElement(JsonInput, { setObjectValue: setObjectValue, value: props.value }),
        React.createElement(
            "div",
            { className: "json-container" },
            React.createElement(JsonObject, { value: objectValue })
        )
    );
}

function JsonInput(props) {
    const [textValue, setTextValue] = React.useState(JSON.stringify(props.value || {}));

    function handleChange(evt) {
        setTextValue(evt.target.value);
        try {
            props.setObjectValue(JSON.parse(evt.target.value));
        } catch (err) {
            console.log("Invalid json. Not printing.", err);
        }
    }

    return React.createElement("textarea", {
        className: "json-input",
        onChange: handleChange,
        value: textValue
    });
}

function JsonObject(props) {
    const elements = Object.entries(props.value).map(function([key, val], index, arr) {
        return React.createElement(JsonObjectPair, {
            objKey: key,
            objVal: val,
            isLast: index < arr.length - 1,
            elementType: getElementType(val)
        });
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

// Ideally, this would be the body of the JsonObject entries map callback, however hooks cannot be
// used in functions that are not components.
function JsonObjectPair(props) {
    const [visible, setVisible] = React.useState(true);

    return React.createElement(
        "span",
        { className: "json-object-pair" },
        props.elementType !== JsonPrimitive
            ? React.createElement(
                  "button",
                  { className: "json-collapse", onClick: () => setVisible(!visible) },
                  visible ? "▼" : "►"
              )
            : null,
        React.createElement("span", { className: "json-key" }, `"${props.objKey}": `),
        React.createElement(props.elementType, { value: props.objVal, visible: visible }),
        props.isLast ? null : React.createElement("span", { className: "json-comma" }, ",")
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
