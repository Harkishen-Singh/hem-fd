const express=require('express'),
    app=express(),
    mongo=require('mongodb').MongoClient,
    port=process.env.PORT || 8888,
    host='0.0.0.0',
    datetime=new Date(),
    bodyParser=require('body-parser');
var IP='',
    fileAddr=__dirname
;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(express.static('public'))

app.get('/', (req, res) => {
    IP=req.connection.remoteAddress;
    console.warn('  IP : '+IP+' requested for home page');
    res.sendFile(fileAddr+'/templates/index.html')
})




const server = app.listen(port,host, e=>{
    if(e) throw e;
    console.warn('Running at\n\tHOST : '+server.address().address+'\t // universally accepted\n\tPORT : '+server.address().port);
})
