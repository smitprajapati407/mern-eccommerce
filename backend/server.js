const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
connectDB();
const User = require('./models/User');
const authroutes = require('./routes/authroutes');
const protect = require('./middleware/authMiddleware');
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");








const app = express();
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API');
});
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/orders", orderRoutes);

app.get('/create-user', async (req, res) => {
    const users = await User.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
    });
    res.json(users);
});
app.get('/protected', protect, (req, res) => {
    res.json({ message: 'you are authorized', userId: req.user });
});
app.use('/api/auth', authroutes);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});