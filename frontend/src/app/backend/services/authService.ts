// src/services/authService.ts
import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

// Replace with your Sign Protocol client ID and redirect URI
const CLIENT_ID = 'your_sign_protocol_client_id';
const CLIENT_SECRET = 'your_sign_protocol_client_secret';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback'; // Update to your frontend URI

// Step 1: Redirect to Sign Protocol Login
router.get('/login', (req: Request, res: Response) => {
  const signProtocolAuthURL = `https://signprotocol.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid`;
  res.redirect(signProtocolAuthURL);
});

// Step 2: Handle Sign Protocol Callback
router.get('/callback', async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const response = await axios.post('https://signprotocol.com/oauth/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const { access_token } = response.data;

    // Store access token in session or cookie
    req.session.token = access_token; // Using session for simplicity

    res.redirect('/create-capsule'); // Redirect to capsule creation page
  } catch (error) {
    console.error('Error during Sign Protocol callback:', error);
    res.status(500).send('Authentication failed. Please try again.');
  }
});

export default router;
