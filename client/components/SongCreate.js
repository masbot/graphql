import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            //add the query you want it to run
            //after the mutation has been successful completed, it will run that query
            refetchQueries: [
                {
                    query,
                    //variables: {} //if query need some variables
            }]
        }).then(() => {
            hashHistory.push('/');
        }).catch((err) => {
            //err
        })
    }

    render() {

        return (
            <div>
                <Link to="/">Back</Link>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input 
                        value={this.state.title} 
                        onChange={(e) => this.setState({ title: e.target.value })}/>
                </form>
            </div>
        )
    }
}
/*
mutation {
    addSong(title: "Last Christmas") {
        id
        title
    }
}

Query Variables - used to inject var from outside
used with mutation and sometimes querys (filtering, pagination)
acts like a function that we can call in our app
    name of mutation | name of parameter | parameter type
mutation AddSong($title: String){
    addSong(title: $title) { 
        id
        title
    }
}



*/

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title) {
            id
            title
        }
    }
`;

export default graphql(mutation)(SongCreate) ;