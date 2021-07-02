import './payroll-form/payroll-form.scss';
import React from 'react';
import logo from '../assets/images/logo.png'

class ToolBar extends React.Component {
    render() {
        return (
            <div>
                <header className="header header-content">
                    <div className="logo-content">
                        <img src={logo} alt="Logo" />
                        <div>
                            <span className="emp-text">EMPLOYEE</span><br />
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default ToolBar;