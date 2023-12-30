const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const Jimp = require('jimp');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-qr', async (req, res) => {
    try {
        const { url, logo } = req.body;

        // Generate QR Code
        const qrCodeImage = await QRCode.toDataURL(url);

        // Load QR code and logo images
        const qrImage = await Jimp.read(Buffer.from(qrCodeImage.split(",")[1], 'base64'));
        const logoImage = await Jimp.read(logo);

        // Resize logo and composite it over the QR code
        logoImage.resize(15, 15); // Adjust size as needed
        qrImage.composite(logoImage, (qrImage.bitmap.width / 2) - (logoImage.bitmap.width / 2), (qrImage.bitmap.height / 2) - (logoImage.bitmap.height / 2));

        // Convert back to data URL
        const finalQrCode = await qrImage.getBase64Async(Jimp.MIME_PNG);

        res.json({ src: finalQrCode });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error occurred");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
