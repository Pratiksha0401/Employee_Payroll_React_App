import React, {useState, useEffect}  from 'react';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './payroll-form.scss';
import ToolBar from '../toolbar';
import { useParams, Link , withRouter } from 'react-router';

const PayrollForm = (props) => {
    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../../assets/profile-images/Ellipse -3.png'},
            { url: '../../../assets/profile-images/Ellipse 1.png'},
            { url: '../../../assets/profile-images/Ellipse -8.png'},
            { url: '../../../assets/profile-images/Ellipse -7.png'}
        ],
        allDepartments: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '1',
        month:'Jan',
        year: '2020',
        startDate: '',
        notes:'',
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
        setForm({...formValue, [event.target.name]: event.target.value})
    }

    const validData = async () => {
        let isError= false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }

        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,3}$')
        if(nameRegex.test(formValue.name)){
            error.name = 'Invalid Name'
            isError = true;
        }
        await setForm({...formValue, error: error})
        return isError;
    }

    const save = async (event) => {
        event.preventDefault();
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
                    <div className="text-error error-output" for="text">{formValue.error.name}</div>

                    <div className="row-content" style={{ marginTop: "20px" }}>
                        <label for="profile" className="label text">Profile Image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profile" value="D:\Pratiksha\HTML_CSS\EmployeePayroll\assets\profile-images\Ellipse -10.png" />
                                <img className="profile" id="img1" src={profile1} alt="profile1" />
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="profile" value="D:\Pratiksha\HTML_CSS\EmployeePayroll\assets\profile-images\Ellipse -2.png" />
                                <img className="profile" id="img2" src={profile2} alt="profile2" />
                            </label>
                            <label>
                                <input type="radio" id="profile3" name="profile" value="D:\Pratiksha\HTML_CSS\EmployeePayroll\assets\profile-images\Ellipse -1.png" />
                                <img className="profile" id="img3" src={profile3} alt="profile3" />
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="profile" value="D:\Pratiksha\HTML_CSS\EmployeePayroll\assets\profile-images\Ellipse -3.png" />
                                <img className="profile" id="img4" src={profile4} alt="profile4" />
                            </label>
                        </div>

                    </div>

                    <div className="row-content" style={{ marginTop: "25px" }}>
                        <label className="label text" for="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" value="male" name="gender" />
                            <label className="label text" for="male">Male</label>
                            <input type="radio" id="female" value="female" name="gender" />
                            <label className="label text" for="female">Female</label>
                        </div>
                    </div>

                    <div className="row-content" style={{ marginTop: "30px" }}>
                        <label className="label text" for="department">Department</label>
                        <div>
                            <input type="checkbox" id="hr" name="department" value="HR" />
                            <label className="text" for="hr">HR</label>

                            <input type="checkbox" id="sales" name="department" value="Sales" />
                            <label className="text" for="sales">Sales</label>

                            <input type="checkbox" id="finance" name="department" value="Finance" />
                            <label className="text" for="finance">Finance</label>

                            <input type="checkbox" id="engineer" name="department" value="Engineer" />
                            <label className="text" for="engineer">Engineer</label>

                            <input type="checkbox" id="others" name="department" value="Others" />
                            <label className="text" for="others">Others</label>
                        </div>
                    </div>

                    <div className="row-content" style={{ marginTop: "20px" }}>
                        <label className="label text" for="department">Choose Your Salary</label>
                        <input className="input" type="number" name="salary" id="salary"  />
                    </div>

                    <div className="row-content">
                <label className="label text" for="date">Start Date</label>
                <div>
                    <select id="day" name="Day">
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
                    <select id="month" name="Month">
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
                    <select id="year" name="Year">
                        <option>Year</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                    </select>
                    <error-output className="date-error" for="text"></error-output>
                </div>
                </div>
                <div class="row-content" style={{ marginTop: "20px" }}>
                    <label class="label text" for="notes">Notes</label>
                    <textarea id="notes" name="Notes" class="input" placeholder="" style={{height: "100px"}}>
                    </textarea>
            </div>

            <div class="button-parent">
                <a href="./employeePayroll.html" class="resertButton button cancelButton">Cancle</a>
                <div class="submit-reset">
                    <button class="button submitButton" type="submit">Submit</button>
                    <button class="button resertButton" type="reset">Reset</button>
                </div>
            </div>

            
               
          




                </form>
            </div>

        </div>
    )
}

export default PayrollForm;