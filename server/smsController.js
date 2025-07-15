const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/send-sms', async (req, res) => {
  const { to } = req.body;
  const url = 'https://console.melipayamak.com/api/send/otp/63a64551d8cd42f189251dc55299af41';
  const data = { to };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }), // برای حل مشکل SSL
    });

    console.log('SMS sent successfully:', response.data);
    res.status(200).json({ success: true, response: response.data });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
