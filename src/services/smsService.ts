export const sendSMS = async (to: string, message: string) => {
  try {
    const response = await fetch('http://localhost:3000/api/send-sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message }),
    });
    const data = await response.json();
    console.log('SMS sent:', data);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};
