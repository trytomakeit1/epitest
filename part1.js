
let axios = require('axios');
const operationUrl = 'https://backend-staging.epicuramed.it/operationtasks';


const part1 = (cb) => {

    let operationList = [];
    let uniqueOperationId = [];
    let uniqueOperationList = [];
    // call operation task
    axios.get(operationUrl).then(resultObj => {
        let operationResult = [...resultObj.data];

        operationResult.map((element, index) => {
            //return operationList
            operationList.push(element.operationType);
            
        });
        uniqueOperationList = operationList.filter(element => {
            if(!uniqueOperationId.includes(element.id)){
                uniqueOperationId.push(element.id);
                return element;
            }
        });

        console.log(finalResult);


        // discipline
        
        let uniqueDisciplineId = [];
        for(let element of operationList) {
            if(!uniqueDisciplineId.includes(element.discipline))
                uniqueDisciplineId.push(element.discipline);
        }
        cb(null, {uniqueOperationList, uniqueDisciplineId});
        


    }).catch(e => {
        console.log(e);
        cb(e);
    })
}


module.exports = part1;