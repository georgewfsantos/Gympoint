import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id, title, duration, price } = req.body;

    const plan = await Plan.create({
      id,
      title,
      duration,
      price,
    });

    return res.json(plan);
  }

  async update(req, res) {
    const { id } = req.params;

    const { title, duration, price } = req.body;

    const plan = await Plan.findByPk(id);

    plan.update({
      title,
      duration,
      price,
    });

    return res.json(plan);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const plan = await Plan.findByPk(id);

      await plan.destroy();

      return res.send({ message: 'Plan was successfully deleted' });
    } catch (error) {
      return res.status(400).json({
        error:
          'Something went wrong and it was not possible to delete the plan',
      });
    }
  }
}

export default new PlanController();
