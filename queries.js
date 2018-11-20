'use strict';

const { DATABASE } = require('./config');
const knex = require('knex')(DATABASE);

// get all restaurants
knex('restaurants')
  .select()
  .then(console.log);

// get italian restaurants
knex('restaurants')
  .select()
  .where({cuisine: 'Italian'})
  .then(console.log);

// get 10 italian restaurants
knex('restaurants')
  .select('id', 'name')
  .where({cuisine: 'Italian'})
  .limit(10)
  .then(console.log);

// count of restaurants
knex('restaurants')
  .count()
  .then(console.log);

// count of thai restaurants
knex('restaurants')
  .count()
  .where({cuisine: 'Thai'})
  .then(console.log);

// count of thai restaurants in zip code
knex('restaurants')
  .count()
  .where({cuisine: 'Thai', address_zipcode: '11372'})
  .then(console.log);

// italian restaurants in one of several zip codes
knex('restaurants')
  .select('id', 'name')
  .where({cuisine: 'Italian'})
  .whereIn('address_zipcode', [10013, 10012, 10014])
  .then(console.log);

// create a restaruant
knex('restaurants')
  .insert({
    name: 'Byte Cafe',
    borough: 'Brooklyn',
    cuisine: 'coffee',
    address_building_number: '123',
    address_street: 'Atlantic Avenue',
    address_zipcode: '11231' })
  .then();

// create a restaurant and return id and name
knex('restaurants')
  .returning(['id', 'name'])
  .insert({
    name: 'Steves',
    borough: 'Brooklyn',
    cuisine: 'Coffee',
    address_building_number: '4',
    address_street: 'fake street',
    address_zipcode: '11233' })
  .then(console.log);

// create three restaurants and return id and name
knex('restaurants')
  .returning(['id', 'name'])
  .insert([{
    name: 'res1',
    borough: 'Brooklyn',
    cuisine: 'coffee',
    address_building_number: '123',
    address_street: 'street',
    address_zipcode: '11233'
  },{
    name: 'res2',
    borough: 'Brooklyn',
    cuisine: 'coffee',
    address_building_number: '123',
    address_street: 'street',
    address_zipcode: '11233'
  },{
    name: 'res3',
    borough: 'Brooklyn',
    cuisine: 'coffee',
    address_building_number: '123',
    address_street: 'street',
    address_zipcode: '11233'
  }])
  .then(console.log);

// update a record
knex('restaurants')
  .where({nyc_restaurant_id: '30191841'})
  .update({ name: 'DJ Reynolds Pub and Restaurant' })
  .then();

// delete by id
knex('grades')
  .where({id: '10'})
  .del()
  .then();

// a blocked delete
knex('restaurants')
  .where({id: '22'})
  .del()
  .then();
