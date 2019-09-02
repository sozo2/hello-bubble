var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Bubble', {useNewUrlParser: true});

var PORT = process.env.PORT || 8000;
var app = express();
app.use(bodyParser.json());

//IMAGE COLLECTION MODEL
var ImageSchema = new mongoose.Schema({
    source: {
        type: String
    }},
    {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
var Image = mongoose.model('Image', ImageSchema);

//WHITELISTING
app.use(express.static(path.join(__dirname, 'build')));
var whitelisted = ['http://localhost:3000',
                  'http://localhost:8000',
                  'https://hello-bubble.herokuapp.com',
                  'https://hello-bubble.s3.us-east-2.amazonaws.com'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(whitelisted.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

//MULTER (IMAGE UPLOAD) CONFIG
var multer  = require('multer');
const uuid = require('uuid/v4');
var aws = require('aws-sdk');
var s3 = new aws.S3({
    region: 'us-east-2',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    bucket: 'hello-bubble'
});
var upload = multer({destination: '/'});

//ROUTING AND API FUNCTIONS
app.post('/api/upload', upload.single("imageFile"), function(req, res) {
    if (req.body.imageFile != '') {
        console.log("Starting upload...")
        let newfilename = uuid() + req.file.originalname;
        const params = {
            Bucket: 'hello-bubble',
            Key: newfilename,
            ACL: 'public-read',
            Body: req.file.buffer
        };
        s3.putObject(params, function (err, data) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log(data);
            }
        });
        console.log("Image uploaded successfully to: " + newfilename);
        image = new Image({source: "https://hello-bubble.s3.us-east-2.amazonaws.com/" + newfilename})
        image.save(function(err, image){
            if(err) {
                console.log(err)
                res.json([]);
            } else {
                res.json(image);
            }
        });
    }
    else if(req.body.imageLink!=''){
        image = new Image({source: req.body.imageLink})
        image.save(function(err, image){
            if(err) {
                console.log(err)
                res.json([]);
            } else {
                res.json(image);
            }
        });
    } else {
        console.log("No images uploaded")
        res.json([]);
    }
});

app.get('/api/all-images', (req, res) => {
    Image.find(function(err,images){
        if(err) {
            console.log(err);
            res.json([]);
        } else{
            res.json(images);
        }
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

var server = app.listen(PORT, function () {
    console.log("🤘 listening on port " + PORT);
});
