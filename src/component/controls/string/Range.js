/**
 * @file Range
 * @author leon <ludafa@outlook.com>
 */

import React, {PropTypes, Component} from 'react';
import Slider from 'melon/Slider';
import {registerControl} from '../../../factory';
import shallowEqual from 'melon-core/util/shallowEqual';
import cx from 'classnames';
import ValidityLabel from '../../ValidityLabel';

export default class Range extends Component {

    shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
    }

    render() {

        let {
            schema,
            value,
            name,
            actions,
            meta
        } = this.props;

        let {
            formatMaximum,
            formatMinimum = 0,
            title,
            description
        } = schema;

        let {
            error,
            touched
        } = meta;

        value = isNaN(+value) ? formatMinimum : value;

        let className = cx(
            'ui-control-range',
            {
                'state-invalid': touched && error,
                'state-valid': touched && !error
            }
        );

        return (
            <div className={className}>
                {
                    title
                        ? <header
                            className="ui-control-range-title">
                            {title}
                        </header>
                        : null
                }
                {
                    description
                        ? <p
                            className="ui-control-range-decription">
                            {description}
                        </p>
                        : null
                }
                <Slider
                    size="xxs"
                    variants={['fluid']}
                    name={name}
                    value={+value}
                    maximum={+formatMaximum}
                    minimum={+formatMinimum}
                    onChange={e => {
                        actions.change(name, e.value + '');
                        actions.validate(name);
                    }} />
                <ValidityLabel {...meta} />
            </div>
        );

    }

}

Range.propTypes = {
    schema: PropTypes.object.isRequired
};

registerControl(function (schema) {

    const {
        type,
        format,
        formatMaximum,
        formatMinimum
    } = schema;

    if (
        type === 'string'
        && format === 'numeric'
        && formatMaximum != null
        && formatMinimum != null
    ) {
        return Range;
    }

});
