import React, { Component } from 'react';

export default class ClassComponentTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: "Hello world",
            count: props.initialCount,
            data: {},
            isLoading: true
        }

        this.plus.bind(this);
    }

    componentDidMount() {
        fetch(`https://pokeapi.co/api/v2/pokemon/pikachu`)
            .then(res => res.json())
            .then(json => {
                this.setState(({ data: json, isLoading: false }));
            })
            .catch(err => {
                this.setState(({ data: err, isLoading: false }));
            })
    }

    plus() {
        //this.setState(prevState => ({ count: prevState.count + 1 }))
    }

    render() {
        return (
            <div>
                <h1>{this.props.hello}</h1>
                <h2>{this.state.count}</h2>
                {/* <button onClick={e => this.plus()}>+1</button> */}
                {!this.state.isLoading && JSON.stringify(this.state.data.name)}
            </div>
        )
    }
}

ClassComponentTodo.defaultProps = {
    initialCount: 5
}