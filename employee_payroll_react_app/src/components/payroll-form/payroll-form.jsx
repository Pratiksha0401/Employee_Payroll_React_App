import React, { useState, useEffect } from 'react';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './payroll-form.scss';
import ToolBar from '../toolbar';
import { useParams, Link, withRouter } from 'react-router';
import EmployeeService from '../../services/employee-services';
const employeeService = new EmployeeService();
const PayrollForm = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../../assets/profile-images/Ellipse -3.png' },
            { url: '../../../assets/profile-images/Ellipse 1.png' },
            { url: '../../../assets/profile-images/Ellipse -8.png' },
            { url: '../../../assets/profile-images/Ellipse -7.png' }
        ],
        allDepartments: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2020',
        startDate: '',
        notes: '',
        id: '',
        profileUrl: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index, -1)
        else
            checkArray.push(name)
        setForm({ ...formValue, departmentValue: checkArray })
    }

    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }

        //let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,3}$')
        if (formValue.name.length < 1) {
            error.name = 'Invalid Name'
            isError = true;
        }

        if (formValue.gender.length < 1) {
            error.gender = 'gender is required field'
            isError = true;
        }

        if (formValue.salary.length < 1) {
            error.salary = 'gender is required field'
            isError = true;
        }

        if (formValue.profileUrl.length < 1) {
            error.profileUrl = 'gender is required field'
            isError = true;
        }

        if (formValue.departmentValue.length < 1) {
            error.department = 'gender is required field'
            isError = true;
        }
        await setForm({ ...formValue, error: error })
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
        let object = {
            name: formValue.name,
            department: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            notes: formValue.id,
            profileUrl: formValue.profileUrl
        }
        employeeService.addEmployee(object).then(data => {
            console.log("data added");
            }).catch(err => {
                console.log("err while Add")
            })

    }

    const reset = () => {
        setForm({...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
        console.log(formValue);
    }

    return (
        <div className="payroll-main" >
            <ToolBar />
            <div className="form-content">
                <form className="form" action="#" onSubmit={save}>
                    <div className="form-head">
                        <header>Employee Payroll Form</header>
                    </div>
                    <div className="row-content">
                        <label className="label text" htmlfor="name">Name</label>
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your Name.." required />
                    </div>
                    <div className="error-output">{formValue.error.name}</div>

                    <div className="row-content" style={{ marginTop: "20px" }}>
                        <label htmlFor="profileUrl" className="label text">Profile Image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profileUrl" checked={formValue.profileUrl == '../../assets/profile-images/Ellipse -3.png'}
                                    value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" id="img1" src={profile1} alt="profile1" />
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="profile" checked={formValue.profileUrl == '../../assets/profile-images/Ellipse 1.png'}
                                    value="../../assets/profile-images/Ellipse 1.png" onChange={changeValue} />
                                <img className="profile" id="img2" src={profile2} alt="profile2" />
                            </label>
                            <label>
                                <input type="radio" id="profile3" name="profile" checked={formValue.profileUrl == '../../assets/profile-images/Ellipse -8.png'}
                                    value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" id="img3" src={profile3} alt="profile3" />
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="profile" checked={formValue.profileUrl == '../../assets/profile-images/Ellipse -7.png'}
                                    value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" id="img4" src={profile4} alt="profile4" />
                            </label>
                        </div>
                    </div>
                    <div className="error-output">{formValue.error.profileUrl}</div>

                    <div className="row-content" style={{ marginTop: "25px" }}>
                        <label className="label text" for="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" onChange={changeValue} value="male" name="gender" />
                            <label className="label text" htmlFor="male">Male</label>
                            <input type="radio" id="female" onChange={changeValue} value="female" name="gender" />
                            <label className="label text" htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="error-output">{formValue.error.gender}</div>

                    <div className="row-content" style={{ marginTop: "30px" }}>
                        <label className="label text" for="department">Department</label>
                        <div>
                            {formValue.allDepartments.map(item =>
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        defaultChecked={() => getChecked(item)} value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="error-output">{formValue.error.department}</div>

                    <div className="row-content" style={{ marginTop: "20px" }}>
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="number" onChange={changeValue} name="salary" id="salary" value={formValue.salary} />
                    </div>
                    <div className="error-output">{formValue.error.salary}</div>

                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select onChange={changeValue} id="day" name="Day">
                                <option>Day</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select onChange={changeValue} id="month" name="Month">
                                <option>Month</option>
                                <option value="Jan">Jan</option>
                                <option value="Feb">Feb</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="July">July</option>
                                <option value="Aug">Aug</option>
                                <option value="Sept">Sept</option>
                                <option value="Oct">Oct</option>
                                <option value="Nov">Nov</option>
                                <option value="Dec">dec</option>
                            </select>
                            <select onChange={changeValue} id="year" name="Year">
                                <option>Year</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                    </div>
                    <div className="error-output">{formValue.error.startDate}</div>

                    <div className="row-content" style={{ marginTop: "20px" }}>
                        <label class="label text" htmlFor="notes">Notes</label>
                        <textarea onChange={changeValue} id="notes" value={formValue.notes} name="Notes" className="input" placeholder="" style={{ height: "90px" }}>
                        </textarea>
                    </div>

                    <div className="button-parent">
                        <a routerLink="" class="resertButton button cancelButton">Cancle</a>
                        <div className="submit-reset">
                            <button className="button submitButton" type="submit" id="submitButton">{formValue.isUpdate ? 'Update': 'Submit'}</button>
                            <button className="button resertButton" type="reset">Reset</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default PayrollForm;