// load the things we need
const express = require('express'),
  app = express(),
  router = express.Router(),
  multer = require('multer'),
  upload = multer({ 
    dest: 'tmp/',
    limits: {
      fileSize: 1048576 * 3,
    }
  }),
  fs = require('fs');

// set the view engine to ejs
app.set('views', './views')
  .set('view engine', 'ejs')
  .use(router);

// use res.render to load up an ejs view file
// index page
router
  .get('/', (req, res) => {
      res.render('index');
  })
  .post('/uploaddufichier', upload.array('monfichier'), function (req, res, next) {
    console.log("req files =>", req.files);
    for (let i = 0; i < req.files.length; i++) {
      fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname, function(err){
        if (err) {
            res.send('problème durant le déplacement');
        } 
      });
    }
    res.send('Fichiers uploadés avec succès');
  })
  




app.listen(8000, () => {
  console.log('App is listenning on port 8000');
});