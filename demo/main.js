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
    React.createElement(JsonBuilder, { value: testObject }),
    document.getElementById("main")
);
