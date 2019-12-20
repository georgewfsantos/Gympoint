import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { student, question } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Sua pergunta já foi respondida ! ',
      template: 'answer',
      context: {
        student: student.name,
        question: question.question,
        question_date: format(parseISO(question.createdAt), "dd'/'M'/'yyyy", {
          locale: pt,
        }),
        answer: question.answer,
        answer_date: format(parseISO(question.answered_at), "dd'/'M'/'yyyy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new AnswerMail();
