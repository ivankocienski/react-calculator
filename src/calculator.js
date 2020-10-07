import React, {Component} from 'react';
import Display from './display';
import Button from './button';

import './calculator.css';

const NBSP = "\u00A0";

class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {            
            value: 0, // the real number (whole and fraction)
            supplimental: NBSP, // helpful line on display
            whole: 0, // the integer number
            fraction: 0, // the fraction below 1
            fractionPower: 1, // power adjust of fractional part
            period: false, // flag on whether whole or fraction is active
            operation: null, // the operation to be done +-*/
            operand: 0 // the previous value argument for operation
        };
    }

    doDigit(digit) {
        console.log("doDigit: digit=", digit);
        
        let {period, whole, fraction, fractionPower} = this.state;

        if(period) {
            fractionPower *= 10;

            fraction *= 10;
            fraction += digit;

        } else {
            whole *= 10;
            whole += digit;
        }

        console.log(
            "  period=", period, 
            "  whole=", whole, 
            "  fraction=", fraction, 
            "  fractionPower=", fractionPower);

        let value = whole + (fraction / fractionPower);
        console.log("  value=", value)

        this.setState({
            value: value,
            whole: whole,
            fraction: fraction,
            fractionPower: fractionPower
        });        
    }

    doClearDigit() {
        
        let {period, fraction, fractionPower, whole} = this.state;

        if(period) {
            fraction = Math.floor(fraction * 0.1);
            fractionPower = Math.floor(fractionPower * 0.1);

            if(fractionPower === 1) {
                period = false;
            }

        } else {
            whole = Math.floor(whole * 0.1);
        }

        let value = whole + (fraction / fractionPower);

        this.setState({
            value: value,
            whole: whole,
            period: period,
            fraction: fraction,
            fractionPower: fractionPower
        }); 
    }

    doClearAll() {
        this.setState({
            operation: null,
            operand: 0,
            value: 0,
            supplimental: NBSP,
            whole: 0,
            fraction: 0,
            fractionPower: 1,
            period: false    
        });
    }

    doSetOperation(opName) {
        let supplimental = "" + this.state.value + "  " + opName;

        this.setState({
            operation: opName,
            operand: this.state.value,
            supplimental: supplimental,
            value: 0,
            whole: 0,
            fraction: 0,
            fractionPower: 1,
            period: false            
        });
    }

    doCalculate() {
        let {value, operand, operation} = this.state;
        
        if(operation != null) {
            let result = 0;

            if(operation === '+') {
                result = operand + value;

            } else if(operation === '-') {
                result = operand - value;

            } else if(operation === '*') {
                result = operand * value;

            } else if(operation === '/') {
                if(value !== 0) {
                    result = operand / value;
                }
            }

            this.setState({
                value: result,
                supplimental: NBSP,
                operation: null,
                operand: 0,
                whole: 0,
                fraction: 0,
                fractionPower: 1,
            });
        }
    }

    doPeriod() {
        if(this.state.period === false) {
            this.setState({
                period: true,
                fraction: 0,
                fractionPower: 1
            });
        }
    }

    render() {
        let self = this;
        console.log("render: value=", this.state.value, "  supplimental=", this.state.supplimental);

        return(
            <div id="calculator-body">
                <Display value={this.state.value} supplimental={this.state.supplimental} />

                <table id="buttons">
                    <tbody>
                        <tr>
                            <td><Button label="7" callback={() => { self.doDigit(7); }}/></td>
                            <td><Button label="8" callback={() => { self.doDigit(8); }}/></td>
                            <td><Button label="9" callback={() => { self.doDigit(9); }}/></td>
                            <td><Button label="+" callback={() => { self.doSetOperation('+'); }}/></td>
                            <td><Button label="&larr;" callback={() => { self.doClearDigit(); }}/></td>
                        </tr>
                        <tr>
                            <td><Button label="4" callback={() => { self.doDigit(4); }}/></td>
                            <td><Button label="5" callback={() => { self.doDigit(5); }}/></td>
                            <td><Button label="6" callback={() => { self.doDigit(6); }}/></td>
                            <td><Button label="-" callback={() => { self.doSetOperation('-'); }}/></td>
                            <td><Button label="C" callback={() => { self.doClearAll(); }}/></td>
                        </tr>
                        <tr>
                            <td><Button label="1" callback={() => { self.doDigit(1); }}/></td>
                            <td><Button label="2" callback={() => { self.doDigit(2); }}/></td>
                            <td><Button label="3" callback={() => { self.doDigit(3); }}/></td>
                            <td><Button label="*" callback={() => { self.doSetOperation('*'); }}/></td>
                        </tr>
                        <tr>
                            <td><Button label="&bull;" callback={() => { self.doPeriod(); }}/></td>
                            <td><Button label="0" callback={() => { self.doDigit(0); }}/></td>
                            <td><Button label="=" callback={() => { self.doCalculate(); }}/></td>
                            <td><Button label="&divide;" callback={() => { self.doSetOperation('/'); }}/></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        )
    }
}

export default Calculator;