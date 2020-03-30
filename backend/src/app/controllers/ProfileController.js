import connection from '../../database/connection';

class ProfileController {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const [incidents] = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    if (!incidents) {
      return res.status(404).json({ error: 'Ong not found' });
    }

    return res.json(incidents);
  }
}

export default new ProfileController();
