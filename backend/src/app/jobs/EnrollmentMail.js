import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { enrollment, student, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Bem Vindo(a) à gympoint !',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        start: format(parseISO(enrollment.start_date), "dd'/'M'/'yyyy", {
          locale: pt,
        }),
        end: format(parseISO(enrollment.end_date), "dd'/'M'/'yyyy", {
          locale: pt,
        }),
        price: enrollment.price,
      },
    });
  }
}

export default new EnrollmentMail();
