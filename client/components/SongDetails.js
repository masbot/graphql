import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router';
import LyricCreate from '../components/LyricCreate';
import LyricList from '../components/LyricList';

class SongDetails extends Component {

    render() {
        const { song } = this.props.data;
        if(!song) {
            return <div>Loading...</div>   
        }

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>

                <LyricList lyrics={song.lyrics}/>

                <LyricCreate songId={this.props.params.id}/>
            </div>
        )
    }
}

//passing variables to query
//React Router passes the id down through props object ->  GraphQL -> Component
//render component wrapped in graphql, so it knows the props
export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id }}}
})(SongDetails);