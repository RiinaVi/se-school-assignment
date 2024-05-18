import {
  DeleteResult,
  EntityRepository,
  InsertResult,
  Repository,
} from 'typeorm';

import Email from '../entities/Email';

@EntityRepository(Email)
class EmailRepository extends Repository<Email> {
  put(email: Email): Promise<InsertResult> {
    return this.insert(email);
  }

  list(): Promise<Email[]> {
    return this.find();
  }

  drop(id: Email['id']): Promise<DeleteResult> {
    return this.delete({ id });
  }

  getByEmail(email: Email['email']): Promise<Email> {
    return this.findOne({ email });
  }
}

export default EmailRepository;
