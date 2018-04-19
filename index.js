'use strict';

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Невозможно подключиться к серверу MongoDB. Ошибка:', err);
  } else {

    console.log('Соединение установлено для', url);
    
    const collection = db.collection('test');
    collection.insert({name: 'Aleksey', gender: 'm'});

    const user1 = {name: 'Tanya', gender: 'f'};
    const user2 = {name: 'Nastya', gender: 'f'};
    const user3 = {name: 'Anya', gender: 'f'};
    
    collection.insert([user1, user2, user3], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Добавленные:', result.ops);
      }
    });

    collection.find({gender: 'f'}).toArray((err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Найденный:', result);
      } else {
        console.log('Нет документов с данным условием поиска');
      }
    });

    collection.update({name: 'Anya'}, {$set: {name: 'Lena'}}, {multi: true});

    collection.find().toArray((err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Найденный:', result);
      } else {
        console.log('Нет документов с данным условием поиска');
      }
    });

    collection.remove({name: 'Nastya'});

    collection.remove();

    db.close();

  }
});


