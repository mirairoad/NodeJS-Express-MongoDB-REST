const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, _id) => {
    sgMail.send({
        to: email,
        from:'mail@gmail.com',
        subject:'Thanks for joining in!',
        html:`<h1>Welcome to the app,</h1>
        </br>
        <p>Let me know how you get along with the app.</p>
        </br>
        <p>Please click the following link to activate your account <a href="http://localhost:1338/activate/${_id}">Click Here</a></p>`

    })
}

const sendCancelationEmail = (email) => {
    sgMail.send({
        to: email,
        from:'mail@gmail.com',
        subject:'Delete Confimed',
        html:`<p>Hi there,</p> <br> <p>Your account has been removed from our database along with your data.</p> `

    })
}

const sendForgottenEmail = (email, _id, reset_link) => {
    sgMail.send({
        to: email,
        from:'mail@gmail.com',
        subject:'Forgotten Password',
        html:`<h1>Forgotten Password,</h1>
        </br>
        <p>The link will expire in 5 minutes</p>
        <p>Please click the following link to set your password <a href="http://localhost:1338/users/set-password/${_id}/${reset_link}">Click Here</a></p>`

    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    sendForgottenEmail
}