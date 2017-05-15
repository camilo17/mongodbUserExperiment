const assert = require('assert');
const User = require('../src/user');


describe('Updating records', () => {

    let joe;


    beforeEach((done) => {
        joe = new User({name: 'Joe'})
        joe.save()
            .then(() => done());

    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            })

    }


    it('instance type using set and save', (done) => {
        joe.set('name', 'Alex');        //set is done in memory and have to save to see result in database
        assertName(joe.save(), done);
    });


    it('A model instance can update', (done) => {
       assertName(joe.update({ name: 'Alex'}), done);
    });



});
