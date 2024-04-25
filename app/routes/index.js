const authRouter = require('./auth');
const nxbRouter = require('./nhaxuatban');
const bookRouter = require('./sach');
const borrowRouter = require('./muonsach');
function route(app) {
    app.use('/auth', authRouter);
    app.use('/nxb', nxbRouter);
    app.use('/book', bookRouter);
    app.use('/borrow', borrowRouter);
}
module.exports = route;