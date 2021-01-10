let express = require('express');
let app = express();
let path = require('path');
const dotenv = require('dotenv').config();
const part1 = require('./part1');

if(dotenv.error) {
    console.error('.env Problem', dotenv.error);
}
part1((err, disciplineIdList) => {
    if(err)
        console.error(err);
    else
        console.log(disciplineIdList);

});
//console.log(process.env);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});