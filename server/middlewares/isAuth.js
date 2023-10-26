import jwt from 'jsonwebtoken'

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	console.log('token', token)

	if (!token) {
		return res.status(403).json({
			message: 'No access',
		})
	}
	try {
		const decodedData = jwt.verify(token, 'secretKeyForToken')

		req.userId = decodedData._id
		next()
	} catch (error) {
		return res.status(403).json({
			message: 'No access',
		})
	}
}
