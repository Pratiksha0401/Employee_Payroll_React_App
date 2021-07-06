import React from 'react';
import './display.scss'
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';
import profile from '../../assets/profile-images/Ellipse -1.png';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import {deleteEmployee} from '../../services/axios-service';
import EmployeeService from '../../services/employee-services';
import { withRouter } from 'react-router-dom';
import { element } from 'prop-types';

const Display = (props) => {
    const employeeService = new EmployeeService();
    
    const remove = (id) => {
         employeeService.deleteEmployee(id).then(response =>{
             alert("Employee deleted successfully",response.data);
             props.history.push("/")
         })
         employeeService.getAllEmployees();
         console.log("deleted");  
    }

    

    return (  
        <div className="table-main"> 
        <table id="display" className="table">
            <tbody>
                <tr key={-1}>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Start Date</th>
                    <th>Actions</th>
                </tr>
                {
                    props.employeeArray && props.employeeArray.map((element, id) => (
                        <tr key={id}>
                            <td>< img src={profile1} /></td>
                            <td>{element.name}</td>
                            <td>{element.gender}</td>
                            <td>{element.department && element.department.map(dept => 
                                (<div className='dept-label'>{dept}</div>))}</td>
                            <td>{element.salary}</td>
                            <td>{element.startDate}</td>
                            <td>
                                <img src={deleteIcon} onClick={() => remove(element.id)} alt="Delete" />
                                <img src={editIcon} alt="Edit" />
                            </td>    
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    )
}
export default withRouter(Display);