const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const app = express();


app.use(cors());
// Use helmet middleware for security headers
// app.use(helmet());
// // Use Helmet with hidePoweredBy option
// app.use(helmet({ hidePoweredBy: true }));
// app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
// // Use Helmet with CSP directives
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
//             styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
//             imgSrc: ["'self'", 'http://165.22.219.69:5002', 'data:'],
//             fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
//             connectSrc: ["'self'", 'http://165.22.219.69:5002'],
//             // Add other directives as needed
//         },
//     })
// );



// Disable the x-powered-by header
app.disable('x-powered-by');

// Use helmet middleware for security headers
app.use(
    helmet({
        hidePoweredBy: true, // Hide the X-Powered-By header
        hideServer: true,    // Hide the Server header
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
                styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
                imgSrc: ["'self'", 'http://165.22.219.69:5002', 'data:'],
                fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
                connectSrc: ["'self'", 'http://165.22.219.69:5002'],
                // Add other directives as needed
            },
        },
    })
);












app.use(express.static(path.join(__dirname, 'build')));

// Add security-related headers
app.use((req, res, next) => {
    res.setHeader('Server', ''); // Set Server header to an empty string
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000);