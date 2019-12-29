import * as Yup from 'yup';

import Question from '../models/Question';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class QuestionController {
  async index(req, res) {
    const questions = await Question.findAll({
      attributes: [
        'id',
        'question',
        'answer',
        'answered_at',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    const answers = questions.map(question =>
      question.answer === null ? question : 'answered'
    );

    const noAnswer = answers.filter(aswr => aswr !== 'answered');

    return res.json(noAnswer);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { question } = req.body;
    const { student_id } = req.params;

    const studentQuestion = await Question.create({
      student_id,
      question,
    });

    return res.json(studentQuestion);
  }

  async show(req, res) {
    const { question_id } = req.params;

    const question = await Question.findByPk(question_id, {
      attributes: ['question', 'answer', 'answered_at'],
    });

    return res.json(question);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { question_id } = req.params;
    const { answer } = req.body;

    // Find the question
    const question = await Question.findByPk(question_id);

    // Find student information to send the email
    const studentId = question.student_id;
    const student = await Student.findByPk(studentId);

    // Check if question was answered
    if (question.answer !== null) {
      return res
        .status(400)
        .json({ error: 'Question has already been answered.' });
    }

    await question.update({
      ...question,
      answer,
      answered_at: new Date(),
    });

    await Queue.add(AnswerMail.key, {
      student,
      question,
    });

    return res.json(question);
  }
}

export default new QuestionController();
