export const diffExample = {
    character: {
        oldData: 'booopsssssa',
        newData: 'oopsssssabb'
    },
    word: {
        oldData: 'Axios is a simple promise based HTTP client for the browser and node.js.',
        newData: 'Axios is a complex promise for the browser and node.js.'
    },
    line: {
        // eslint-disable-next-line
        oldData: `var MyApp = san.defineComponent({\n    template: '<p>Hello {{name}}!</p>',\n\n    initData: function () {\n        return {\n            name: 'San'\n        };\n    }\n});\n\n\nvar myApp = new MyApp();\nmyApp.attach(document.body);\n`,
        // eslint-disable-next-line
        newData: `var MyApp = san.defineComponent({\n    template: '<ul><li s-for="item in list">{{item}}</li></ul>',\n\n    attached: function () {\n        this.data.set('list', ['san', 'er', 'esui', 'etpl', 'esl']);\n    }\n});\n\nvar myApp = new MyApp();\nmyApp.attach(document.body);`
    }
};
