const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/documents', { useNewUrlParser: true, useUnifiedTopology: true });

const documentSchema = new mongoose.Schema({
    serialNumber: Number,
    referenceID: String,
    dateOfDocument: Date,
    timeOfDocument: String,
    subject: String,
    fromEntity: String,
    pdfPath: String,
    actions: [
        {
            actionName: String,
            deadline: Date,
            pendingDate: Date
        }
    ]
});

const Document = mongoose.model('Document', documentSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/documents', upload.single('pdf'), (req, res) => {
    const newDocument = new Document({
        serialNumber: req.body.serialNumber,
        referenceID: req.body.referenceID,
        dateOfDocument: req.body.dateOfDocument,
        timeOfDocument: req.body.timeOfDocument,
        subject: req.body.subject,
        fromEntity: req.body.fromEntity,
        pdfPath: req.file.path,
        actions: JSON.parse(req.body.actions)
    });

    newDocument.save()
        .then(doc => res.status(201).json(doc))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/documents', (req, res) => {
    Document.find()
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(400).json({ error: err.message }));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
