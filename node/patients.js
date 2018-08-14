const mongo=require('mongodb').MongoClient,
      url='mongodb://127.0.0.1:27017'
;
var responseServer = {
    'Success':'Y',
    'err':'none',
    'value':[],
}, isErr=false,isUniq=false

function sendRes(res) {
    if(isErr==false)
        res.send(responseServer)
    else if(isErr==true)
        {   
            responseServer.Success='N';
            responseServer.err = ' err while retiriving info from db mongo'
            res.send(responseServer)
            
        }
    responseServer.value=[]
    }

function retrivePatients(req ,res) {
    mongo.connect(url, (e, dbo)=>{
        if(e) throw e;
        let db = dbo.db('hemalata_foundation');
        db.collection('patient').find({}).toArray((e, result) => {
            if(e) {isErr=true; throw e}
            else{
                console.warn('successfully retrived from db');
                console.debug(result)
                responseServer.value = result;
                sendRes(res)
                dbo.close();
            }
        })
    } )
    
}
function viewMore(req ,res) {
    let adhaar = req.body.adhaar,
        disease = req.body.disease;

    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        let db = dbo.db('hemalata_foundation');
        db.collection('patient').findOne({'aadhaar':adhaar,'disease':disease}, (e, result) => {
            if(e) throw e;
            console.warn('info extracted from db for patient with adhaar '+adhaar)
            console.debug(result);
            responseServer.value = result;
            isErr=false;
            sendRes(res);
            dbo.close();
        } )
    })
}






module.exports = {
    retriveAll: retrivePatients,
    viewMore: viewMore,
}