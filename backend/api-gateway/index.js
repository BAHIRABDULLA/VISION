"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var dotenv_1 = __importDefault(require("dotenv"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, morgan_1.default)('combined'));
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later'
});
// app.use(limiter)
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
var targets = {
    user: process.env.USER_API_BASE_URL,
    mentor: process.env.MENTOR_API_BASE_URL,
    admin: process.env.ADMIN_API_BASE_URL,
    course: process.env.COURSE_API_BASE_URL,
    payment: process.env.PAYMENT_API_BASE_URL,
    messaging: process.env.MESSAGING_API_BASE_URL
};
app.use('/user', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.user,
    changeOrigin: true
}));
app.use('/mentor', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.mentor,
    changeOrigin: true
}));
app.use('/admin', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.admin,
    changeOrigin: true
}));
app.use('/course', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.course,
    changeOrigin: true
}));
app.use('/payment', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.payment,
    changeOrigin: true
}));
app.use('/messages', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: targets.messaging,
    changeOrigin: true,
    ws: true,
    pathRewrite: { '^/messages': '/messages' }
}));
var port = process.env.GATEWAY_PORT;
app.listen(port, function () { return console.log("server running on http://localhost:".concat(port)); });
