import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Student from '../models/Student';

import authConfig from '../../config/auth';

class StudentSessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const student = await Student.findByPk(req.body.id);

    if (!student) {
      return res.status(401).json({ error: 'Student  not found' });
    }

    const { id, name, email } = student;

    return res.json({
      student: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new StudentSessionController();
