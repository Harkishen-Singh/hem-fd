const mongo=require('mongodb').MongoClient,
    //   url='mongodb://127.0.0.1:27017/';
        url='mongodb+srv://harkishen:bbsr131@cluster0-rfidk.mongodb.net/hemalata_foundation?retryWrites=true';

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

function volunteerSignups(req, res) {
    let timeClient = req.body.currentTimeClient,
        dayClient = req.body.currentDayClient,
        // disease = req.body.typedisease,
        gender = req.body.gender,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        mobile = req.body.mobile,
        dob=req.body.dob,
        address = req.body.address,
        aadhaar = req.body.aadhaar,
        educational = req.body.educationalQualifications;
    let pusher = {
        'timeclient':timeClient,
        'dayclient':dayClient,
        'gender':gender,
        'firstname':firstName,
        'lastname':lastName,
        'mobile':mobile,
        'dob':dob,
        'address':address,
        'aadhaar':aadhaar,
        'educationalqualifications':educational,
    };
    console.warn('agent signUp')
    console.warn(pusher)
    mongo.connect(url, (e, dbo) => {
        if(e) throw e;
        let db = dbo.db('hemalata_foundation');
        db.collection('volunteer').findOne({'aadhaar':aadhaar}, (e, result)=>{
            if(e) {
                throw e;
            }
            console.warn(result)
            if(result==null) {
                db.collection('volunteer').insertOne(pusher,(e)=>{
                    if(e) throw e;
                    console.warn('[SUCCESS] created collection for volunteer '+aadhaar)
                    res.render(__dirname+'/responseTemplates/volunteerRegis_success.ejs', {
                        aadhaar:aadhaar,
                    })
                })
            }
            else{
                console.error('[ERR] collection for volunteer '+aadhaar+' already exists')
                res.render(__dirname+'/responseTemplates/volunteerRegis_err.ejs',{
                    aadhaar:aadhaar,
                })

            }
            dbo.close();
            
        });
    })
}


module.exports ={
    patient:patientSignUp,
    volunteer:volunteerSignups,
}