const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // index.html'i public klasörüne koyarsanız otomatik sunar

// Nodemailer ile e-posta gönderme ayarları
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Gönderici Gmail adresiniz
        pass: 'your-email-password'   // Gmail şifreniz veya uygulama şifresi
    }
});

app.post('/submit', (req, res) => {
    const { name, number } = req.body;

    // E-posta içeriği
    const mailOptions = {
        from: 'your-email@gmail.com', // Gönderici e-posta
        to: 'pomer9991@gmail.com',   // Alıcı e-posta
        subject: 'Yeni Oyun Kaydı',
        text: `Ad: ${name}\nSayı: ${number}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('E-posta gönderilirken bir hata oluştu.');
        }
        res.status(200).send('Bilgiler başarıyla gönderildi.');
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
