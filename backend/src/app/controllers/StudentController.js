import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { name } = req.query;
    if (name) {
      const students = await Student.findAll({
        where: {
          name: {
            [Op.or]: {
              [Op.iLike]: `%${name}`,
              [Op.iLike]: `${name}%`,
            },
          },
        },
      });
      return res.json(students);
    }
    const students = await Student.findAll();
    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    const emailExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    if (emailExists) {
      return res.status(400).json({ error: 'Email has already been taken.' });
    }

    const { name, email, age, weight, height } = req.body;

    const student = await Student.create({
      name,
      email,
      age,
      weight,
      height,
    });

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;

    const { name, email, age, weight, height } = req.body;

    const student = await Student.findByPk(id);

    await student.update({
      name,
      email,
      age,
      weight,
      height,
    });

    return res.json(student);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const student = await Student.findByPk(id);

      await student.destroy();

      return res.send({ message: 'Student successfully deleted' });
    } catch (err) {
      return res.status(400).json({ error: 'Something went wrong' });
    }
  }
}

export default new StudentController();
