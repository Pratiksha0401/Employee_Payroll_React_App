import './display.scss';
import Display from './Display';
import React from 'react';
import ToolBar from '../toolbar';
import { withRouter } from 'react-router-dom';
import AddIcon from '../../assets/icons/add-24px.svg';
import EmployeeService from '../../services/employee-services';
import { Link } from 'react-router-dom';
import PayrollForm from '../payroll-form/payroll-form';
import Searchicon from '../../assets/icons/search-icon.png'


class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            employeeArray: [],
            nameKeyword: '',
            searchExanpand:'',
            result: []
        }
        this.getAllEmployee();
        this.search(this.state.nameKeyword);
    }

    
    employeeService = new EmployeeService();
    getAllEmployee = () => {
        this.employeeService.getAllEmployees().then(data => {

            console.log("data after get", data.data.data);
            
            this.setState({ employeeArray: data.data.data })
        }).catch(err => {
            console.log("err after", err);
        })
    }

    search = (nameKeyword) => {
        
        this.employeeService.getEmployeeByNameKeyword(nameKeyword).then(data =>{
            console.log("search", data.data.data)
            this.setState({employeeArray: data.data.data})
        }).catch(err =>{
            console.log("Error while searching", err);
        })

        console.log(nameKeyword);
    }


    render() {
        return (
            <div>
                <ToolBar />
                <div className="header-content">
                    <div class="header-content sub-main-content">
                        <div class="emp-detail-text">
                            Employee Details <div class="emp-count">{this.state.employeeArray.length}</div>
                        </div>
                      
                        <div className="search-box" onClick={this.openSearch}>
                            <input className={"search-input" + (this.state.searchExanpand && "input-expand")}
                                onChange={(event) => this.search(event.target.value)}  type="text" placeholder="" />
                            <img className="search-icon" src={Searchicon} alt="search-icon" />    
                        </div>
                        <Link  to="payroll-form" className="add-button">
                            <div className="plus-icon">
                                <img src={AddIcon} alt="Add User Logo" />
                            </div>
                            <div>Add User</div>
                        </Link>
                       
                    </div>
                </div>
                <div className="table-main">
                    <Display employeeArray={this.state.employeeArray} />
                </div>
            </div>
        )
    }
}
export default withRouter(HomePage);