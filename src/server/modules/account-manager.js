/**
 * Created by danstan on 5/12/17.
 */

import crypto from 'crypto'
import moment from 'moment'
import collections from '../common'



/* login validation methods */

exports.autoLogin = (user, pass, callback)=>
{
	accounts.findOne({user:user}, (e, o)=> {
		if (o){
			o.pass == pass ? callback(o) : callback(null)
		}	else{
			callback(null)
		}
	})
}

exports.manualLogin = (user, pass, callback)=>
{
    collections.accounts.findOne({user:user}, (e, o)=> {
		if (o == null){
			callback('user-not-found')
		}	else{
			validatePassword(pass, o.pass, (err, res)=> {
				if (res){
					callback(null, o)
				}	else{
					callback('invalid-password')
				}
			});
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = (newData, callback) =>
{
    collections.accounts.findOne({user:newData.user}, (e, o)=> {
		if (o){
			callback('username-taken');
		}	else{
            collections.accounts.findOne({email:newData.email}, (e, o)=> {
				if (o){
					callback('email-taken');
				}	else{
					saltAndHash(newData.pass, (hash) =>{
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a')
                        //create account in db----Insert o returns an object that is inserted
                        collections.accounts.insert(newData, {safe: true}, function(e,o){
                            if (!e){
                                console.log("#-----------###################-------------#")
                                console.log("#-----------New Account Created-------------#")
                                console.log("#-----------###################-------------#")
                                console.log("Account Created as:::")
                                console.log(o)
                                console.log("#-----------###################-------------#")
                                let newUser={
                                    accountId:o.insertedIds[0],
                                    user:newData.user,
                                    firstName:newData.firstName,
                                    lastName:newData.lastName,
                                    dateCreated:o.ops[0].date,
                                    initialAccount:o.ops[0]
                                }
                                collections.users.insert(newUser, {safe:true},callback)
                                console.log("#-----------###################-------------#")
                                console.log("#-----------New User Created-------------#")
                                console.log("#-----------###################-------------#")
                                console.log("Account Created as:::")
                                console.log(newUser)
                                console.log("#-----------###################-------------#")

                            }
                            else throw errors
                        })

					});
				}
			});
		}
	});
}

exports.updateAccount = function(newData, callback)
{
    collections.accounts.findOne({_id:getObjectId(newData.id)}, function(e, o){
		o.firstName 		= newData.firstName;
        o.lastName 		= newData.lastName;
		o.email 	= newData.email;
		o.country 	= newData.country;
		if (newData.pass == ''){
            collections.accounts.save(o, {safe: true}, function(e) {
				if (e) callback(e);
				else callback(null, o);
			});
		}	else{
			saltAndHash(newData.pass, function(hash){
				o.pass = hash;
                collections.accounts.save(o, {safe: true}, function(e) {
					if (e) callback(e);
					else callback(null, o);
				});
			});
		}
	});
}

exports.updatePassword = function(email, newPass, callback)
{
    collections.accounts.findOne({email:email}, function(e, o){
		if (e){
			callback(e, null);
		}	else{
			saltAndHash(newPass, function(hash){
		        o.pass = hash;
                collections.accounts.save(o, {safe: true}, callback);
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
    collections.accounts.remove({_id: getObjectId(id)}, callback);
}

exports.getAccountByEmail = function(email, callback)
{
    collections.accounts.findOne({email:email}, function(e, o){ callback(o); });
}

exports.validateResetLink = function(email, passHash, callback)
{
    collections.accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback)
{
    collections.accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

exports.delAllRecords = function(callback)
{
    collections.accounts.remove({}, callback); // reset accounts collection for testing //
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
    collections.accounts.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
    collections.accounts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}
