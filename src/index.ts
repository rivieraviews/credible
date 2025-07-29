import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cardRoutes from './routes/cardRoutes';
import loungeRoutes from './routes/loungeRoutes';  
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cards', cardRoutes); 
app.use('/api/auth', authRoutes);

app.use('/api/cards', loungeRoutes);

app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
})