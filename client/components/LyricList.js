import React, { Component } from 'react';

class LyricList extends Component {

    onLike(id, likes) {
        // this.props.mutate({
        //     variables: [{}],
        //     optimisticResponse: {
        //         __typename: 'Mutation',
        //         likeLyric: {
        //             id: id,
        //             __typename: 'LyricType',
        //             likes: likes+1
        //         }
        //     }
        // })
    }

    renderLyrics() {
        return this.props.lyrics.map(({id, content}) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <i className="material-icons" onClick={() => this.onLike(id)}>thumb_up</i>
                </li>
            )
        })
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

export default LyricList;