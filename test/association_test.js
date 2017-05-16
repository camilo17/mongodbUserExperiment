const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');


describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is great', content: 'Yep it really is'});
        comment = new Comment({content: 'Congrats on great post'});

        joe.blogPost.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        joe.save();
        blogPost.save();
        comment.save();

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());


    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
            .populate('blogPosts')  //plural because thats  how it is in the User Schema
            .then((user) => {
                assert(user.blogPost[0].title === 'JS is great');
                done();
            })
    });

    it('saves a full relation graph', (done) => {
       User.findOne({name: 'Joe'})
           .populate({
               path: 'blogPosts',           // load up blogPosts
               populate: {
                   path: 'comments',        //what to load in blogPosts
                   model: 'comment',
                   populate: {              //populate association
                       path: 'user',
                       model: 'user'
                   }
               }
           })
           .then((user) => {

           })
    });



});
