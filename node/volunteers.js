const mongo=require('mongodb').MongoClient,
    //   url='mongodb://127.0.0.1:27017'
    url='mongodb+srv://harkishen:bbsr131@cluster0-rfidk.mongodb.net/hemalata_foundation?retryWrites=true';
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

function retriveVolunteers(req ,res) {
    mongo.connect(url, (e, dbo)=>{
        if(e) throw e;
        let db = dbo.db('hemalata_foundation');
        db.collection('volunteer').find({}).toArray((e, result) => {
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
    let adhaar = req.body.adhaar;

    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        let db = dbo.db('hemalata_foundation');
        db.collection('volunteer').findOne({'aadhaar':adhaar}, (e, result) => {
            if(e) throw e;
            console.warn('info extracted from db for volunteer with adhaar '+adhaar)
            console.debug(result);
            responseServer.value = result;
            isErr=false;
            sendRes(res);
            dbo.close();
        } )
    })
}






module.exports = {
    retriveAll: retriveVolunteers,
    viewMore: viewMore,
}