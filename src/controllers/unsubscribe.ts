import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { createEmailSchema } from '../utils/validation';
import EmailRepository from '../repositories/EmailRepository';

const unsubscribe = async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    const { error: validationError } = createEmailSchema.validate({ email });

    if (validationError) {
      return res.status(400).send({
        error: { message: validationError.message.split('"').join('') },
      });
    } else {
      const emailRepository = getConnection().getCustomRepository(EmailRepository);
      const allEmails = await emailRepository.list();
      const emailId = allEmails.find((entry) => entry.email === email)?.id;

      if (!emailId) {
        res.status(409).send({
          error: { message: "Email does not exists!"}
        });
      } else {

        await emailRepository.drop(emailId);

        res.send({ message: "Email was unsubscribed!" });
      }
    }

  } catch (error) {
    console.error(error.message);

    return res.status(400).send({ error: { message: 'invalid payload' } });
  }
};

export default unsubscribe;
