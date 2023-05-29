const express = require('express')
const bodyParser = require('body-parser');
var multer = require('multer');
var log4js = require("log4js");
// log4js.configure({
//     appenders: { clinton: { type: "file", filename: "api-clinton-entrydata.log" } },
//     categories: { default: { appenders: ["clinton"], level: "debug" } },
// });
global.logger = log4js.getLogger();
logger.level = "debug"
logger.debug("Some debug messages");

var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            cb( null, `${ GUID() }.${ file.originalname.split('.').slice(-1) }`);
        }
    }
);

var upload = multer({ storage });
const app = express();
const port = 3000

const cors = require('cors')
const {GUID} = require("./app/helper/constants");
app.use(cors())
app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('image'));

app.post('/', function (req, res) {
    console.log(req.file)
    res.send('Hello World! Version 1.1')
})

require('./app/routes')(app);



app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})
