import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { createEmailSchema } from '../utils/validation';
import EmailRepository from '../repositories/EmailRepository';
import Email from '../entities/Email';

const subscribe = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const { error: validationError } = createEmailSchema.validate({ email });

    if (validationError) {
      return res.status(400).send({
        error: { message: validationError.message.split('"').join('') },
      });
    } else {
      const emailRepository = getConnection().getCustomRepository(EmailRepository);
      const foundEmail = await emailRepository.getByEmail(email as string);

      if (foundEmail) {
        res.status(409).send({
          error: { message: "Email already exists!"}
        });
      } else {
        const emailEntry = Email.create({ email });

        await emailRepository.put(emailEntry);

        res.send(emailEntry);
      }
    }

  } catch (error) {
    console.error(error.message);

    return res.status(400).send({ error: { message: 'invalid payload' } });
  }
};

export default subscribe;
