const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.MAIL,
    pass:process.env.PASS
  }
})
exports.sendMail = (email,message,html)=>{
  transporter.sendMail({
    from:'autoSardina.com',
    to:email,
    subject:message,
    text:'Ups hubo un problema....',
    html:html
  })
  .then(info=>console.log(info))
  .catch(e=>console.log(e))
}

