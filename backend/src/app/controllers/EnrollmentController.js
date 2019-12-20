import * as Yup from 'yup';
import addDays from 'date-fns/addDays';
import { parseISO } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(enrollments);
  }

  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id, student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findOne({ where: { id: plan_id } });
    const student = await Student.findOne({ where: { id: student_id } });

    const days = plan.duration * 30;
    const date = parseISO(start_date);

    const end_date = addDays(date, days);

    if (!student) {
      return res.status(401).json({
        error: 'Student id was not found. Please check your information',
      });
    }

    const enrollment = await Enrollment.create({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price: plan.price * plan.duration,
    });

    await Queue.add(EnrollmentMail.key, {
      student,
      plan,
      enrollment,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findOne({ where: { id: plan_id } });

    const enrollment = await Enrollment.findByPk(id);

    const days = plan.duration * 30;
    const date = parseISO(start_date);
    const end_date = addDays(date, days);

    await enrollment.update({
      ...enrollment,
      student_id,
      plan_id,
      start_date,
      end_date,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    await enrollment.destroy();

    return res.send({ message: 'Enrollment successfully deleted' });
  }
}

export default new EnrollmentController();
