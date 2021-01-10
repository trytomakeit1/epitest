const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const part1 = require('./part1');
const part2 = require('./part2');


if(dotenv.error) {
    console.error('.env Problem', dotenv.error);
}
part1((err, disciplineIdList) => {
    if(err)
        console.error(err);
    else
        console.log(disciplineIdList);
        part2(disciplineIdList, (err, disciplineData) => {
            if(err)
                console.error(err);
            else
                console.log(disciplineData);

        });

});
//console.log(process.env);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});