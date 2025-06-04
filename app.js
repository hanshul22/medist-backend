const express = require('express');
const ejs = require('ejs');
const errorHandler = require('./Controller/errorController')
const cors = require('cors');
const path = require('path');
const authRouter = require('../ecommerce-backend/ecommerce-backend/Router/authRoutes');
const appPolicyRouter = require('../ecommerce-backend/ecommerce-backend/Router/appPolicyRoutes');
const contactRouter = require('../ecommerce-backend/ecommerce-backend/Router/contactRoutes');
const adminRouter = require('../ecommerce-backend/ecommerce-backend/Router/adminRoutes');
const notificationRouter = require('../ecommerce-backend/ecommerce-backend/Router/notificationRoutes');
const userRouter = require('../ecommerce-backend/ecommerce-backend/Router/userRoutes');
const offerBannerRouter = require('../ecommerce-backend/ecommerce-backend/Router/offerBannerRoutes');
const BlogRouter = require('../ecommerce-backend/ecommerce-backend/Router/blogRoutes');
const ServiceRouter = require('../ecommerce-backend/ecommerce-backend/Router/serviceRoutes');


 
const app = express();
app.use(cors());
app.set("trust proxy");

app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));
app.use('/invoices', express.static(path.join(__dirname, 'invoices')));
app.use('/Img', express.static(path.join(__dirname, '..', 'Img')));



//app.use('/upload', express.static('upload'));
app.use(express.json());


console.log("app js file")

app.use(errorHandler);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/app', appPolicyRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/banner', offerBannerRouter);
app.use('/api/v1/blog', BlogRouter);
app.use('/api/v1/service', ServiceRouter);



module.exports =app;