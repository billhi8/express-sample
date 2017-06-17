var express = require('express');
var app = express();

var loki = require("lokijs");
var db = new loki('mydb.json');
/*db.loadDatabase({});*/
var notes = db.addCollection('notes');
for (var i = 1; i <= 10; i++) {
    notes.insert({
        text: "筆記" + i
    });
}
//db.saveDatabase();

// 加入靜態檔案資料夾路徑
app.use(express.static(__dirname + '/www'));

app.set('views', __dirname + '/views');
// 設定使用的引擎為ejs
app.set('view engine', 'ejs');
// 設定使用的引擎為jade
//app.set('view engine', 'jade');

app.get('/Home', function (req, res) {
    //res.send('這是透過get跟你say hi');
    //res.render('home');  //此處Home為指向home.ejs
    res.render('home', {
        title: "Hi EJS",
        notes: notes.find({})   //利用lokijs語法
        //notes:[{text:'筆記xx'},{text:'筆記zz'}]
    });
    res.end();
});

app.listen(1234);
