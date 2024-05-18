import { getConnection } from 'typeorm';
import nodemailer from 'nodemailer';

import EmailRepository from '../repositories/EmailRepository';
import getRateData from '../utils/getRateData';
import getMailTemplate from '../utils/getMailTemplate';
import * as process from 'node:process';

const sendRateToAllEmails = async () => {
  const currentRate = await getRateData(process.env.CURRENCY_BEACON_API_KEY);
  const emailRepository = getConnection().getCustomRepository(EmailRepository);
  const allEmails = await emailRepository.list();

  for (const emailEntry of allEmails) {
    const unsubscribeURL = `http://${process.env.SERVER_IP ?? 'localhost'}:${process.env.PORT}/unsubscribe?email=${emailEntry.email}`

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL_ADDRESS,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL_ADDRESS,
      to: emailEntry.email,
      subject: 'Current USD to UAH exchange rate',
      html: getMailTemplate(currentRate, unsubscribeURL),
    };

    const sentMessageInfo = await transporter.sendMail(mailOptions);

    console.log('E-mail Sent: %s', sentMessageInfo.messageId);
  }
}

export default sendRateToAllEmails;