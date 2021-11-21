import React, { useState } from 'react'
import { Label, Table, Button, Input } from 'semantic-ui-react'
export default function SelectedAssignment({ assignment, students }) {

	const { possAnswers } = assignment
	const initialObject = {}
	for (const { name, _id } of students) {
		initialObject[_id] = possAnswers
	}
	const [correctAnswers, setCorrectAnswers] = useState(initialObject)
	function submitGrades() {
		console.log(JSON.stringify({ correctAnswers, assignmentId: assignment._id }))
	}
	function handleChange({ target: { name, value } }) {
		setCorrectAnswers({ ...correctAnswers, [name]: Number(value) })
	}

	function percentage(correct, possible) {
		return (100 * correct) / possible;
	}

	return (
		<div style={{ textAlign: 'center' }} >
		<Table celled inverted fixed >
			{students.map(({ _id, name }) => {
				return (
					
						<Table.Row key={_id} style={{ fontSize: '20px', width: '50vw' }}>
							<Table.Cell>
								{name}
							</Table.Cell>
							<Table.Cell >
								<Input
									labelPosition='right'
									type="number"
									value={correctAnswers[_id]}
									max={possAnswers}
									min={0}
									name={_id}
									onChange={handleChange}
								>
									<input style={{ width: '90px' }} />
									<Label>/{possAnswers}</Label>
								</Input>
							</Table.Cell>
							<Table.Cell>
								{percentage(correctAnswers.value, possAnswers)}%
							</Table.Cell>

						</Table.Row>
					
				)
			})}
			</Table>
			<Button inverted color="white" onClick={submitGrades} size="large"  >submit grades</Button>
		
		</div>
	)
}