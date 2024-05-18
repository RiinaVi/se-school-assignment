import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { createEmailSchema } from '../utils/validation';
import EmailRepository from '../repositories/EmailRepository';

const unsubscribe = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.query;

  try {
    const { error: validationError } = createEmailSchema.validate({ email });

    if (validationError) {
      return res.status(400).send({
        error: { message: validationError.message.split('"').join('') },
      });
    }
    const emailRepository =
      getConnection().getCustomRepository(EmailRepository);
    const foundEmail = await emailRepository.getByEmail(email as string);

    if (!foundEmail) {
      res.status(409).send({
        error: { message: 'Email does not exists!' },
      });
    } else {
      await emailRepository.drop(foundEmail.id);

      res.send({ message: 'Email was unsubscribed!' });
    }
  } catch (error) {
    console.error(error);

    return res.status(400).send({ error: { message: 'invalid payload' } });
  }
};

export default unsubscribe;
