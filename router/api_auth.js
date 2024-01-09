const router = require('express').Router()

router.put('/profile/:id', (req, res) => {
	const { id } = req.params
	res.status(400).json('Invalid request!')
})

module.exports = router;