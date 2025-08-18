require('dotenv').config();
const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/db'); 
const menuItemsAdminRouter = require('./web/menuItemsAdminRoutes');
const categoriesAdminRouter = require('./web/categoriesAdminRoutes');
const orderAdminRouter = require('./web/ordersAdminRoutes');
const userAdminRoutes = require('./web/usersAdminRoutes');
const authRoutes = require('./web/authRoutes');
const dashboardRouter = require('./web/dashboardAdminRoutes');

app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
    
connectDB();  
app.use('/images', express.static(path.join(__dirname, 'images')));
// routes for admin 
app.use(menuItemsAdminRouter);
app.use(categoriesAdminRouter);
app.use(orderAdminRouter);
app.use(userAdminRoutes);
app.use(authRoutes);
app.use(dashboardRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log("Server is running on port 3000");
});