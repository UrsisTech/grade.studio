const Assignment = require('../models/assignment')
const Student = require('../models/student')
const Submission = require('../models/submission')


module.exports = { create, update };

async function create(req, res) {
	console.log(req.body)
	try {
		const { correctAnswers, assignmentId } = req.body
		const assignment = await Assignment.findById(assignmentId);
		await assignment.populate('submissions')
		const newSubmissions = await Promise.all(Object.keys(correctAnswers).map(studentId => {
			const pushSubmissions = async () => {
				const submission = await Submission.create({
					correctAnswers: correctAnswers[studentId],
					student: studentId,
					assignmentId
				})
				await submission.populate('student')
				assignment.submissions.push(submission)
				return submission

			}
			return pushSubmissions()
		})
		)
		console.log(assignment, newSubmissions)
		assignment.save()
		await assignment.populate('submissions')
		await Promise.all(assignment.submissions.map(submission => submission.populate('student')))
		res.status(201).json({ data: assignment })
	} catch (err) {
		console.log(err)
		res.status(400).json({ err })
	}
}

async function update(req, res) {
	try {
		
	}catch (err) {
		res.status(400).json({ err })
	} 
	
}