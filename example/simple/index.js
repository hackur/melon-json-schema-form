/**
 * @file SimpleDemo
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Form} from '../../src/index';
import './index.styl';

const schema = {
    type: 'object',
    properties: {
        name: {
            title: 'name',
            type: 'string',
            maxLength: 5,
            minLength: 3
        },
        // age: {
        //     title: 'age',
        //     type: 'integer'
        // },
        email: {
            title: 'email',
            type: 'string',
            format: 'email'
        },
        position: {
            type: 'object',
            properties: {
                top: {
                    type: 'string',
                    title: 'top',
                    maxLength: 3
                },
                left: {
                    type: 'string',
                    title: 'left'
                }
            }
        },
        safeAnswers: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    question: {
                        type: 'string',
                        title: 'question'
                    },
                    answer: {
                        type: 'string',
                        title: 'answer'
                    }
                },
                required: ['question', 'answer']
            },
            minItems: 2,
            maxItems: 4
        }
    },
    required: ['name', 'email']
};

class App extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            value: {}
        };
    }

    render() {
        return (
            <Form
                value={this.state.value}
                schema={schema}
                onFieldChange={({value}) => {
                    console.log(value);
                    this.setState({value});
                }}
                onSubmit={e => {
                    e.preventDefault();
                    console.log(`submit: %o`, e);
                }}>
                <footer>
                    <button>submit</button>
                </footer>
            </Form>
        );
    }

}

ReactDOM.render(<App />, document.querySelector('#app'));
