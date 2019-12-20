import * as Yup from 'yup';
import { subDays, isAfter, isBefore } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const checkins = await Checkin.findAll({ where: { student_id: id } });

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(400).json({
        error: 'Student was not found. Please, check the id you provided',
      });
    }

    return res.json(checkins);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      res.status(400).json({
        error: 'Student was not found. Please, check the id you provided',
      });
    }

    const checkins = await Checkin.findAll({
      where: { student_id },
    });

    const checkIfOneWeek = checkins.map(
      checkin =>
        isAfter(checkin.createdAt, subDays(new Date(), 7)) &&
        isBefore(checkin.createdAt, new Date())
    );

    const limit = checkIfOneWeek.filter(chk => chk === true);

    if (limit.length >= 5) {
      res.status(400).json({
        error: 'You are not allowed to checkin more than 5 times a week',
      });
    }

    const checkin = await Checkin.create({
      student_id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
