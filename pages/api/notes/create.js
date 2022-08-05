import { query as q } from 'faunadb';
import { serverClient } from '../../../utils/fauna-auth';

export default async (req, res) => {
	const {title, description} = req.body;

	try {
		await serverClient.query(
			q.Create(q.Collection('notes'), {
				data: {
					title,
					description,
				},
			})
		);
		res.status(200).end();
	} catch (e) {
		res.status(500).json({error: e.message});
	}
};