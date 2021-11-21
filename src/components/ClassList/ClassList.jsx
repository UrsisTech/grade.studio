import React from 'react'
import { Menu, Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function ClassList({ classes }) {
    return (
        <Table celled inverted selectable style={{
			color: 'white',
			marginTop: 'auto',
			fontFamily: 'Pangolin',
			fontSize: '20px',
            textAlign: 'center',
            paddingBottom: '5px',
            background: 'none',
		}}>

        
        
        {classes && classes.map((aClass) => {
            const { name, _id } = aClass
            return(
        <Table.Row><Link to={{pathname:`/class/${_id}`,
        state:{_id, name }
    }} key={_id}>
        <Table.Cell selectable style={{
                paddingTop: '15px',
                paddingBottom: '5px',
                marginTop: 'auto',
                fontFamily: 'Pangolin',
                fontSize: '20px'
            }}><Button inverted color="white" style={{ width: '300px' }}>{name}</Button></Table.Cell></Link></Table.Row>
    )
    
        })}</Table>
    )
}