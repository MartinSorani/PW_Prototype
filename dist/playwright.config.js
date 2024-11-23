"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    use: {
        baseURL: 'http://localhost:3000', // Replace with your app's URL
        headless: true,
    },
});
