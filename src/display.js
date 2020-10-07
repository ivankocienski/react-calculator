import React, {Component} from 'react';

import './display.css';

class Display extends Component {

    render() {
        let display = this.props.value;
        let supplimental = this.props.supplimental;
        
        return(
            <div id="bezel">
                <div id="calculator-display">
                    <h2>{supplimental}</h2>
                    <h1>{display}</h1>
                </div>
            </div>
        );
    }
}

export default Display;