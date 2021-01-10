const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const part1 = require('./part1');
const part2 = require('./part2');
const part3 = require('./part3');

if(dotenv.error) {
    console.error('.env Problem', dotenv.error);
}
part1((err, dataFromPart1) => {
    if(err)
        console.error(err);
    else{
        console.log(dataFromPart1.uniqueDisciplineId);
        part2(dataFromPart1.uniqueDisciplineId, (err, disciplineList) => {
            if(err)
                console.error(err);

            else{
                console.log(disciplineData);
                part3({uniqueOperationList: dataFromPart1.uniqueOperationList, disciplineList});
            }
        });
    }

});
//console.log(process.env);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});