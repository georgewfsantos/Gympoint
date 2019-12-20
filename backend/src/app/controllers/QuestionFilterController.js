import Question from '../models/Question';
import Student from '../models/Student';

class FilterController {
  async index(req, res) {
    const { student_id } = req.params;

    const student = await Student.findOne({ where: { id: student_id } });

    if (!student) {
      res.status(400).json({
        error: 'Student not found. Please check if you provided the correct id',
      });
    }

    const questions = await Question.findAll({ where: { student_id } });

    return res.json(questions);
  }
}

export default new FilterController();
