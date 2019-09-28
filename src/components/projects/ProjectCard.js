import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image, CardContent } from 'semantic-ui-react'
import './Project.css'

class ProjectCard extends Component {
    render() {
        return (
            <Card className="card">
                <CardContent className="card-content">
                    <Image size='small' src={this.props.project.photoUrl} alt="big project" wrapped />
                    <Card.Header>{this.props.project.projectName}</Card.Header>
                    <Card.Description>{this.props.project.projectDescription}</Card.Description>
                    {/* <Link to={`/projects/${this.props.project.id}`}><button>Details</button></Link> */}
                    {this.props.activeUserId === this.props.project.userId && <Button type='button' content='delete' onClick={() => { this.props.deleteProject(this.props.project.id) }} />}
                    {this.props.activeUserId === this.props.project.userId && <Button type="button"
                        onClick={() => { this.props.history.push(`/projects/${this.props.project.id}/edit`) }}>edit</Button>}
                </CardContent>
            </Card>
        );
    }
}

export default ProjectCard;