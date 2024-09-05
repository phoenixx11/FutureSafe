// src/server.ts
import express from 'express';
import session from 'express-session';
import authRoutes from './services/authService';

const app = express();

// Use session to store user authentication state
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
