import React, {Component} from 'react';

import './button.css';

class Button extends Component {
    render() {
        let label = this.props.label;
        let callback = this.props.callback;

        return(
            <button onClick={callback} className="calculator-button">{label}</button>
        );
    }
}

export default Button;