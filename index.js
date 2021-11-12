require('dotenv').config();
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/sounds', async (req, res) => {
  res.json(fs.readdirSync('./sounds'));
});

app.get('/sounds/:file', async (req, res) => {
  // console.log(`/sounds/${req.params.file}`)
  var stat = fs.statSync('./sounds/' + req.params.file);
  res.writeHead(200, {
    'Content-Type': 'audio/mp3',
    'Content-Length': stat.size,
  });
  var readStream = fs.createReadStream('./sounds/' + req.params.file);
  readStream.pipe(res);
  // res.send(__dirname + `/sounds/${req.params.file}`);
});

app.post('/upload', upload.single('sound'), async (req, res) => {
  // this route is protected with a special key -- sorry people
  if (req.body.pass != process.env.UPLOADKEY) {
    res.status(401).json('sorry pal..');
    return;
  }

  if (req.file && req.file.mimetype == 'audio/mpeg') {
    let existing = fs.readdirSync('./sounds');
    if (existing.includes(req.file.originalname)) {
      fs.unlink(`./tmp/${req.file.filename}`);
      res.status(409).json('file exist');
      return;
    }

    fs.renameSync(`./tmp/${req.file.filename}`, `./sounds/${req.file.originalname}`);
  }

  res.json('thanks');
});

app.get('*', (req, res) => {
  res.sendFile(__dirname, 'public/index.html');
});

const server = app.listen(8085, function () {
  console.log('Server started at 8085');
});
