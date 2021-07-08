import React from 'react';
import './display.scss'
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';
import profile from '../../assets/profile-images/Ellipse -1.png';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import { deleteEmployee } from '../../services/axios-service';
import EmployeeService from '../../services/employee-services';
import { withRouter, Link } from 'react-router-dom';
import { element } from 'prop-types';
import { useHistory } from 'react-router-dom';

const profileDictionary = {
    "../../assets/profile-images/Ellipse -3.png": profile1,
    "../../assets/profile-images/Ellipse 1.png": profile2,
    "../../assets/profile-images/Ellipse -8": profile3,
    "../../assets/profile-images/Ellipse -7": profile4 
}
const Display = (props) => {
    console.log(props)
    const employeeService = new EmployeeService();
    const history = useHistory();

    const remove = (id) => {
        employeeService.deleteEmployee(id).then(response => {
            alert("Employee deleted successfully", response.data);
            history.push("/")
        }).catch(err => {
            alert("Error while deleting data");
        })
    }

    const update = (id) => {
        props.history.push(`/payroll-form/${id}`)
        //employeeService.updateEmployee(id, data).then(response => {

       // })
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
                        props.employeeArray && props.employeeArray.map((element) => (
                            <tr key={element.employeeId}>
                                <td>< img src={profileDictionary[element.profilePic]} /></td>
                                <td>{element.name}</td>
                                <td>{element.gender}</td>
                                <td>{element.departments && element.departments.map(dept =>
                                    (<div className='dept-label'>{dept}</div>))}</td>
                                <td>{element.salary}</td>
                                <td>{element.startDate}</td>
                                <td>
                                    <img src={deleteIcon} onClick={() => remove(element.employeeId)} alt="Delete" />
                                    <img src={editIcon} onClick={() => update(element.employeeId)} alt="Edit" />
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