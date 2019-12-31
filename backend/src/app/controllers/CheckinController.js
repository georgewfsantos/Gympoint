import { subDays, isAfter, isBefore } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;

    const checkins = await Checkin.findAll({ where: { student_id } });

    const student = await Student.findByPk(student_id);

    if (!student) {
      res.status(400).json({
        error: 'Student was not found. Please, check the id you provided',
      });
    }

    return res.json(checkins);
  }

  // eslint-disable-next-line consistent-return
  async store(req, res) {
    const { student_id } = req.params;

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

    const enrollment = await Enrollment.findByPk(student_id);

    if (limit.length >= 5) {
      res.status(400).json({
        error: 'Você já alcançou o limite de 5 checkins na semana',
      });
    } else if (enrollment.active !== true) {
      res.status(400).json({
        error: 'Você não possui matrícula ativa.',
      });
    } else {
      const checkin = await Checkin.create({
        student_id,
      });
      return res.json(checkin);
    }
  }
}

export default new CheckinController();
