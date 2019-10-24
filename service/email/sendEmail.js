const mailer = require('nodemailer');

// const {EMAIL,PASSWORD} = require('../../config/config');
module.exports = async () => {
    let transport = mailer.createTransport({

        service: 'gmail',
        auth: {
            user: 'olegflud5@gmail.com',
            pass: '22ilehuv'
        }
    });

    await transport.sendMail({
        from: 'Oleh',
        to: 'olegflud5@gmail.com',
        html: 'Hello from loon',
        subject: 'TEST MESSAGE'
    })

};