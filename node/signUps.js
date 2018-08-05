const mongo=require('mongodb').MongoClient,
      url='mongodb://127.0.0.1:27017/';

function patientSignUp(req, res) {
    let timeClient = req.body.currentTimeClient,
        dayClient = req.body.currentDayClient,
        disease = req.body.typedisease,
        gender = req.body.gender,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        fatherName = req.body.fatherName,
        motherName = req.body.motherName,
        mobile = req.body.mobile,
        dob=req.body.dob,
        address = req.body.address,
        aadhaar = req.body.aadhaar;
    let pusher = {
        'timeclient':timeClient,
        'dayclient':dayClient,
        'disease':disease,
        'gender':gender,
        'firstname':firstName,
        'lastname':lastName,
        'fathername':fatherName,
        'mothername':motherName,
        'mobile':mobile,
        'dob':dob,
        'address':address,
        'aadhaar':aadhaar,
    };
    console.warn('patient signUp')
    console.warn(pusher)
    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        let db = dbo.db('hemalata_foundation');
        db.collection('patient').findOne({'aadhaar':aadhaar}, (e, result)=>{
            if(e) {
                throw e;
            }
            console.warn(result)
            if(result==null) {
                db.collection('patient').insertOne(pusher,(e)=>{
                    if(e) throw e;
                    console.warn('[SUCCESS] created collection for patient '+aadhaar)
                    res.render(__dirname+'/responseTemplates/patientRegis_success.ejs', {
                        aadhaar:aadhaar,
                    })
                })
            }
            else{
                console.error('[ERR] collection for patient '+aadhaar+' already exists')
                res.render(__dirname+'/responseTemplates/patientRegis_err.ejs',{
                    aadhaar:aadhaar,
                })

            }
            dbo.close();
            
        });
    })

}


module.exports ={
    patient:patientSignUp,
}