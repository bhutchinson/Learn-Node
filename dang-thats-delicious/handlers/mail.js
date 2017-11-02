const htmlToText = require('html-to-text')
const juice = require('juice')
const nodemailer = require('nodemailer')
const promisify = require('es6-promisify')
const pug = require('pug')

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

const generateHTML = options => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${options.filename}.pug`,
    options
  )
  const inlined = juice(html)
  return inlined
}

exports.send = async options => {
  const html = generateHTML(options)
  const text = htmlToText.fromString(html)

  const mailOptions = {
    from: `Bryan <bryan@kuali.co>`,
    to: options.user.email,
    subject: options.subject,
    html,
    text
  }

  const sendMail = promisify(transport.sendMail, transport)
  return sendMail(mailOptions)
}
