import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';

const app = express();
dotenv.config();

//db connection
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log(err));

//middleware
app.use(morgan('dev'));
app.use(express.json());

//route middlewares
app.use('/api', authRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log('Server started on port ' + port));
