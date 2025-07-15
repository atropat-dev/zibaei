const https = require('https');

const data = JSON.stringify({
    'to': '09123456789'
});

const options = {
    hostname: 'console.melipayamak.com',
    port: 443,
    path: '/api/send/otp/63a64551d8cd42f189251dc55299af41',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, res => {
    console.log('statusCode: ' + res.statusCode);

    res.on('data', d => {
        process.stdout.write(d)
    });
});

req.on('error', error => {
    console.error(error);
});

req.write(data);
req.end();
