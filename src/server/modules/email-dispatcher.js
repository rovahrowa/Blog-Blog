/**
 * Created by danstan on 5/12/17.
 */

var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect(
    {
        host 	    : process.env.EMAIL_HOST || 'imap.gmail.com',
        user 	    : process.env.EMAIL_USER || 'danstan.codetest@gmail.com',
        password    : process.env.EMAIL_PASS || 'wX555X555-omera',
        ssl		    : true
    });

EM.dispatchResetPasswordLink = (account, callback)=>
{
    EM.server.send({
        from         : process.env.EMAIL_FROM || 'Node Mongo Login <do-not-reply@gmail.com>',
        to           : account.email,
        subject      : 'Password Reset',
        text         : 'something went wrong... :(',
        attachment   : EM.composeEmail(account)
    }, callback );
}

EM.composeEmail = (o)=>
{
    let link = 'http://localhost:8090/reset-password?e='+o.email+'&p='+o.pass;
    let html = "<html><body>";
    html += "Hi "+o.firstName+" "+o.lastName+",<br><br>";
    html += "Your username is <b>"+o.user+"</b><br><br>";
    html += "<a href='"+link+"'>Click here to reset your password</a><br><br>";
    html += "Cheers,<br>";
    html += "<a href='https://github.com/rovahrowa'>Danstan</a><br><br>";
    html += "</body></html>";
    return  [{data:html, alternative:true}];
}