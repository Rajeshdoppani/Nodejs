const Express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = Express();
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// importing Routes
const postsRoute = require('./routes/posts');
const employeeRoute = require('./routes/employee');
const userRoute = require('./routes/users');
const orderRoute = require('./routes/orders');

//Router Middlewares
app.use('/posts', postsRoute);
app.use('/employee', employeeRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);

//Route
app.get('/', (req, res) => {
    res.send('Welcome to Nodejs');
})

mongoose.connect(config.url, { useNewUrlParser: true }, () => {
    console.log('connected to database');
});

app.listen(3000, () => { });