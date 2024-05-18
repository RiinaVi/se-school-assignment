import { EntityRepository, Repository } from 'typeorm';

import Email from '../entities/Email';

@EntityRepository(Email)
class EmailRepository extends Repository<Email> {
  put(email: Email) {
    return this.insert(email);
  }

  list() {
    return this.find();
  }

  drop(id: Email['id']) {
    return this.delete({ id });
  }

  getByEmail(email: Email['email']) {
    return this.findOne({ email });
  }
}

export default EmailRepository;
