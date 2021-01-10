const axios = require('axios');

const disciplineUrl = 'https://backend-staging.epicuramed.it/disciplines/';

const part2 = (disciplineIdList, cb) => {

    const disciplineResult = [];

    let axioCallList = [];
    for(let disciplineId of disciplineIdList) {
        console.log('id: ', disciplineId);
        
        axioCallList.push(axios.get(disciplineUrl + disciplineId));
    }
    
    Promise.all(axioCallList).then((res) => {

        res.map((element, index) => {
            disciplineResult.push(element.data);
        })
        
        cb(null, disciplineResult);

    }).catch(e => cb(e));
    
   


}

module.exports = part2;