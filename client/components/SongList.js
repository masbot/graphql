import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/fetchSongs';


class SongList extends Component {

    onSongDelete(id) {
        this.props.mutate({
            variables: {
                id
            },
            //refetchQueries: [{ query }]
            //alternate way to refetch
            //refetch will re-execute queries that are associated with the SongList Component
            //why use this? depends on how you are trying to update your query with which component
        }).then(() => this.props.data.refetch())
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`songs/${id}`}>
                        {title}
                    </Link>
                    <i
                        className={`material-icons`}
                        onClick={() => this.onSongDelete(id)}
                    >delete</i>
                </li>
            )
        })
    }

    render() {
        if(this.props.data.loading) { return <div>Loading...</div> }

        return ( 
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

/**
 * GraphQL Tag need to run query
 * Query is not compat with JS
{
  songs{
    title
  }
}

Bond query and component
- the query that we wrote will automatically be sent back to backend server //query execute // async process
- after some time when the query is complete the component will be automatically be rendered
- where will the data appear in the component? will be placed in the component props object
*/

const mutation = gql`
    mutation DeleteSong($id: ID) {
            deleteSong(id: $id) {
            id
        }
    }
`;

//use multiple instance to use query and mutation
//make a helper and immediate invoke the function inside
export default graphql(mutation)(
    graphql(query)(SongList)
);