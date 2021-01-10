let mongodb = require('mongodb').MongoClient;

// modify .env
const connectionUrl = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const operationTypeCollection = 'operationType';
const disciplineCollection = 'discipline';



const dbCall = (arguments) => {

    mongodb.connect(connectionUrl, (err, mongoclient) => {
        if(err){
            console.error("Problem connecting to DB");
            mongoclient.close();
        }

        let db = mongoclient.db(dbName);
        const {uniqueOperationList, disciplineList} = arguments;
        //insert many
        //collection operationType and discipline
        

        let operationTypeIdList =[];
        for(let element of uniqueOperationList) {
            operationTypeIdList.push(element._id);
        }

        let disciplineIdList =[];
        for(let element of disciplineList) {
            disciplineIdList.push(element._id);
        }

        let operationTypesToAdd = [];
        let disciplinesToAdd = [];

        Promise.all([db.collection(operationTypeCollection).find({_id: {$in: operationTypeIdList}}).toArray((err, res) => {
            
            if(res && res.length > 0 ) {
                for(let el of res) {
                    if (!operationTypeIdList.includes(el._id))
                    operationTypesToAdd.push(el);

                }
            } else {
                operationTypesToAdd = uniqueOperationList;
            }
            if(operationTypesToAdd.length > 0 ) {
                db.collection(operationTypeCollection).insertMany(operationTypesToAdd).then((res)=>{

                }).catch(e => console.log(e))
            }
                            
        }),db.collection(disciplineCollection).find({_id: {$in: disciplineIdList}}).toArray((err, res) => {
            
            if(res && res.length > 0 ) {
                for(let el of res) {
                    if (!disciplineIdList.includes(el._id))
                    disciplinesToAdd.push(el);
                }
            } else {
                disciplinesToAdd = disciplineList;
            }
            
            if(disciplinesToAdd.length > 0) {
                db.collection(disciplineCollection).insertMany(disciplinesToAdd).then((res) => {

                }).catch(e => console.log(e))
            }
                            
        })
        ]).then((res1, res2) => {

            console.log("Operation type and discipline inserted successfully");    

        }).catch(e => console.log(e));
         
    })

}


module.exports = dbCall;