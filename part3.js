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
        
        //TODO if operation types and discipline already exist
        Promise.all([
            db.collection(operationTypeCollection).insertMany(uniqueOperationList),
            db.collection(disciplineCollection).insertMany(disciplineList)
        ]).then((res1, res2) => {
            console.log("Operation type and discipline inserted successfully");
        }).catch(
            e=> console.log(e))
        .finally(
            ()=> {mongoclient.close();});

    })

}


module.exports = dbCall;