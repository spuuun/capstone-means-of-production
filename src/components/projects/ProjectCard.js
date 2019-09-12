import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Project.css'

class ProjectCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <picture>
                        <img src={require('../../images/shed-project.JPG')} alt="big project" />
                    </picture>
                    <h2><span className="card-petname">{this.props.project.projectName}</span></h2>
                    <p>Details: {this.props.project.projectDescription}</p>
                    <Link to={`/projects/${this.props.project.id}`}><button>Details</button></Link>
                </div>
            </div>
        );
    }
}

export default ProjectCard;