import React, { Component } from 'react';
import { from, timer, of, interval, pipe } from 'rxjs';
import { buffer, delay, concatMap } from 'rxjs/operators';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        
    }

    componentDidMount() {
        const arraySource = from([1, 2, 3, 4, 5]);   
        const myInterval = interval(1000);
        const src = arraySource.pipe(concatMap(val => of(val).pipe(delay(1000))))
        const subscribe = src.subscribe((val, i) => {
            console.log(val)
            this.setState((prevState) => {
                return {
                    list: [...prevState.list, val]
                }
            })
        });
    }

    renderList() {
        return this.state.list.map(val => {
            return <li>{val}</li>;
        })
    }

    render( ) {

        return(
            <div>
                <h3>Test</h3>
                <ul>
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}

export default Test;