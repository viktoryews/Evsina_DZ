const express = require('express');
const path = require('path');
const fs = require('fs');
const idUniq = require('uuid');
const uuidValidate = require('uuid-validate');
const {userSchema, idSchema} = require('./validation/sheme');
const {checkBody, checkParams} = require('./validation/validator');

const app = express();
app.use(express.json());

const pathFile = path.join(__dirname, 'users.json');

const port = 3000;

const id = idUniq.v4();
const isValid = uuidValidate(id);
console.log(`The UUID ${id} is ${isValid ? 'valid' : 'invalid'}.`);

/**
 * Получение всех пользователей
 */
app.get('/users', (req, res) => {
    res.send(fs.readFileSync(pathFile));
});

/**
 * Получение конкретного пользователя по id
 */
app.get('/users/:id', checkParams(idSchema), (req, res) => {

    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find(user => user.id === req.params.id);
    if (user) {
        res.send({user});
    }
    else {
        res.status(404);
        res.send({user: null});
    }
});

/**
 * Добавление нового пользователя
 */
app.post('/users',checkBody(userSchema), (req, res) => {

    const users = JSON.parse(fs.readFileSync(pathFile));

    users.push(
        {
            id,
            ...req.body,
        }
    );

    fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));
    res.send({id});
});

/**
 * Изменение конкретного пользователя
 */
app.put('/users/:id', checkParams(idSchema), checkBody(userSchema), (req, res) => {

    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find(user => user.id === req.params.id);
    if (user) {
        user.name = req.body.name;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));
        res.send({user});
    }
    else {
        res.status(404);
        res.send({user: null});
    };
});

/**
 *      Удаление конкретного пользователя
 */
app.delete('/users/:id', checkParams(idSchema), (req, res) => {

    const users = JSON.parse(fs.readFileSync(pathFile));
    const user = users.find(user => user.id === req.params.id);
    if (user) {
       const userIndex = users.indexOf(user);
       users.splice(userIndex, 1);
        fs.writeFileSync(pathFile, JSON.stringify(users, null, 2));
        res.send({user});
    }
    else {
        res.status(404);
        res.send({user: null});
    };
});


app.listen(port)