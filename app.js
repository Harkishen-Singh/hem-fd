const express=require('express'),
    app=express(),
    port=process.env.PORT || 5000,
    host='0.0.0.0',
    datetime=new Date(),
    cluster=require('cluster'),
    numCPUs = require('os').cpus().length;
    signUps = require('./node/signUps'),
    bodyParser=require('body-parser'),
    patientsMods = require('./node/patients')
    
var IP='',
    fileAddr=__dirname
;
console.warn('No of cpu threading async : '+numCPUs)
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    IP=req.connection.remoteAddress;
    console.warn('  IP : '+IP+' requested for home page');
    res.sendFile(fileAddr+'/templates/index.html')
});
app.get('/index.html', (req, res) => {
    IP=req.connection.remoteAddress;
    console.warn('  IP : '+IP+' requested for home page');
    res.sendFile(fileAddr+'/templates/index.html')
});
app.get('/gallery.html', (req, res)=>{
    res.sendFile(fileAddr+'/templates/gallery.html')
})
app.get('/about-us.html', (req, res)=>{
    res.sendFile(fileAddr+'/templates/about-us.html')
})
app.get('/event.html',(req,res)=>{
    res.sendFile(fileAddr+'/templates/event.html')
})
app.get('/contact.html',(req,res)=>{
    res.sendFile(fileAddr+'/templates/contact.html')
})

/* Registration */
app.get('/regisPatient', (req, res)=>{
    res.sendFile(fileAddr+'/templates/registration/patient.html')
})
app.get('/regisVolunteer', (req, res)=>{
    res.sendFile(fileAddr+'/templates/registration/volunteer.html')
})
app.post('/patientFormRegis', (req, res)=>{
    signUps.patient(req,res)
})
app.post('/volunteerFormRegis', (req, res) => {
    signUps.volunteer(req,res)
})
/* endregistration */
/* from admin panel */
    app.post('/getPatients', (req, res)=>{
        console.warn('getPatients called in server')
        patientsMods.retriveAll(req,res);
    })
    app.post('/patientsViewMore', (req, res) => {
        console.warn('patientsViewMore called in server')
        patientsMods.viewMore(req,res);
    })
/* end admin panel */




const server = app.listen(port,host, e=>{
    if(e) throw e;
    console.warn('Running at\n\tHOST : '+server.address().address+'\t // universally accepted\n\tPORT : '+server.address().port);
})
