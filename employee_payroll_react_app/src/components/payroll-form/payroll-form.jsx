import React, { useState, useEffect } from 'react';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './payroll-form.scss';
import ToolBar from '../toolbar';
import { useParams, Link, withRouter } from 'react-router-dom';
import EmployeeService from '../../services/employee-services';
import { useHistory } from 'react-router-dom';

const monthArray= ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const PayrollForm = () => {
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
        departments: [],
        gender: '',
        salary: '',
        day: '01',
        month: 'Jan',
        year: '2020',
        startDate: '',
        note: '',
        employeeId: '',
        profilePic: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }
    }
    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange = (name) => {
        let index = formValue.departments.indexOf(name);
        let checkArray = [...formValue.departments]
        if (index > -1)
            checkArray.splice(index, -1)
        else
            checkArray.push(name)
        setForm({ ...formValue, departments: checkArray })
    }

    const getChecked = (name) => {
        return formValue.departments && formValue.departments.includes(name);
    }

    const validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profilePic: '',
            startDate: ''
        }

        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if (nameRegex.test(formValue.name)) {
            isError = false;
        }else{
            error.name = 'Invalid Name'
            isError = true;
        }

        if (formValue.gender.length < 1) {
            error.gender = 'gender is required field'
            isError = true;
        }

        if (formValue.salary==='') {
            error.salary = 'salary is required field'
            isError = true;
        }

        if (formValue.profilePic.length < 1) {
            error.profilePic = 'profilePic is required field'
            isError = true;
        }

        if (formValue.departments.length < 1) {
            error.department = 'department is required field'
            isError = true;
        }

        if (formValue.note === '') {
            error.note = 'note is required field'
            isError = true;
        }
        await setForm({ ...formValue, error: error })
        return isError;
    }
    const employeeService = new EmployeeService();

    const params= useParams();
    console.log(params.id)

    useEffect(() => {

        if(params.id){
        getEmployeeById(params.id);
       // setForm({...formValue, isUpdate: true});

        }
        console.log(params.id)
    }, []);

    const getEmployeeById = (id) => {
        console.log(id)
        employeeService.getEmployeeById(id).then( responseData => {
            // let object = {
            //     employeeId: responseData.data.id,
            //     name: responseData.data.name,
            //     departments: responseData.data.department,
            //     gender: responseData.data.gender,
            //     salary: responseData.data.salary,
            //     day: responseData.data.startDate.split(" ")[0],
            //     month: responseData.data.startDate.split(" ")[1],
            //     year: responseData.data.startDate.split(" ")[2],
            //     note: responseData.data.note,
            //     profilePic: responseData.data.profilePic
            // }

            console.log("StartDate by id", responseData.data.data.startDate);
            setForm({ ...formValue,
                 name: responseData.data.data.name,
                 departments: responseData.data.data.departments,
                 gender: responseData.data.data.gender,
                 salary: responseData.data.data.salary,
                 day: responseData.data.data.startDate.split("-")[2],
                 month:monthConvertor( responseData.data.data.startDate.split("-")[1]),
                 year: responseData.data.data.startDate.split("-")[0],
                 note: responseData.data.data.note,
                 profilePic: responseData.data.data.profilePic,
                 isUpdate: true
                })
            console.log(responseData.data.data);
        })
    }

    const monthConvertor = (monthIndex) => {
        return monthArray[monthIndex-1];
    }
    const history =useHistory();

    const save = async (event) => { 
      
        event.preventDefault();
        if (await validData()){
            console.log('error', formValue);
            return;
        }
        let object = {
            name: formValue.name,
            departments: formValue.departments,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            note: formValue.note,
            profilePic: formValue.profilePic
        }
        console.log("satrt DAte", object.startDate);
        console.log(formValue.isUpdate);

        if(formValue.isUpdate){
            console.log(params.id);
            employeeService.updateEmployee(params.id,object).then(data =>{
                alert("Data Updated successfully",data.data);
                history.push("/");
                reset();
                console.log("updated", data.data)
            }).catch(err => {
                alert("Error while adding");
                console.log("err while Add",err)
            })

        }else{
        employeeService.addEmployee(object).then(data => {
            alert("Data Added sucessfully");
            history.push("/");
            reset();
            console.log("Data added", data.data);
            }).catch(err => {
                alert("Error while adding");
                console.log("err while Add",err)
            })
        }
    }

    const reset = () => {
        setForm({...initialValue});
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
                        <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your Name.." />
                        <div className="error-output">{formValue.error.name}</div>
                    </div>
                    

                    <div className="row-content" style={{ marginTop: "20px" }}>
                        <label htmlFor="profilePic" className="label text">Profile Image</label>
                        <div className="profile-radio-content">
                            <label>
                                <input type="radio" id="profile1" name="profilePic" checked={formValue.profilePic === '../../assets/profile-images/Ellipse -3.png'}
                                    value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                <img className="profile" id="img1" src={profile1} alt="profile1" />
                            </label>
                            <label>
                                <input type="radio" id="profile2" name="profilePic" checked={formValue.profilePic === '../../assets/profile-images/Ellipse 1.png'}
                                    value="../../assets/profile-images/Ellipse 1.png" onChange={changeValue} />
                                <img className="profile" id="img2" src={profile2} alt="profile2" />
                            </label>
                            <label>
                                <input type="radio" id="profile3" name="profilePic" checked={formValue.profilePic === '../../assets/profile-images/Ellipse -8.png'}
                                    value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue} />
                                <img className="profile" id="img3" src={profile3} alt="profile3" />
                            </label>
                            <label>
                                <input type="radio" id="profile4" name="profilePic" checked={formValue.profilePic === '../../assets/profile-images/Ellipse -7.png'}
                                    value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue} />
                                <img className="profile" id="img4" src={profile4} alt="profile4" />
                            </label>
                        </div>
                        <div className="error-output">{formValue.error.profilePic}</div>
                    </div>
                    

                    <div className="row-content" style={{ marginTop: "25px" }}>
                        <label className="label text" for="gender">Gender</label>
                        <div>
                            <input type="radio" id="male" onChange={changeValue} value="male" name="gender" />
                            <label className="label text" htmlFor="male">Male</label>
                            <input type="radio" id="female" onChange={changeValue} value="female" name="gender" />
                            <label className="label text" htmlFor="female">Female</label>
                        </div>
                        <div className="error-output">{formValue.error.gender}</div>
                    </div>
                    

                    <div className="row-content" style={{ marginTop: "30px" }}>
                        <label className="label text" for="department">Department</label>
                        <div>
                            {formValue.allDepartments.map(item =>
                                <span key={item}>
                                    <input className="checkbox" type="checkbox" onChange={() => onCheckChange(item)} name={item}
                                         value={item} />
                                    <label className="text" htmlFor={item}>{item}</label>
                                </span>
                            )}
                        </div>
                        <div className="error-output">{formValue.error.department}</div>
                    </div>                   

                    <div className="row-content" style={{ marginTop: "20px" }}>
                        <label className="label text" htmlFor="salary">Salary</label>
                        <input className="input" type="number" onChange={changeValue} name="salary" id="salary" value={formValue.salary} />
                        <div className="error-output">{formValue.error.salary}</div>        
                    </div>
                    

                    <div className="row-content">
                        <label className="label text" htmlFor="startDate">Start Date</label>
                        <div>
                            <select onChange={changeValue} id="day" name="day" value={formValue.day} required>
                                <option value="">Day</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
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
                            <select onChange={changeValue} id="month"  name="month" value={formValue.month} required>
                                <option value="">Month</option>
                                <option value="Jan">Jan</option>
                                <option value="Feb">Feb</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">Aug</option>
                                <option value="Sep">Sept</option>
                                <option value="Oct">Oct</option>
                                <option value="Nov">Nov</option>
                                <option value="Dec">Dec</option>
                            </select>
                            <select onChange={changeValue} id="year" name="year" value={formValue.year} required>
                                <option value="">Year</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                        <div className="error-output">{formValue.error.startDate}</div>
                    </div>
                    

                    <div className="row-content" style={{ marginTop: "20px" }}>
                        <label class="label text" htmlFor="note">note</label>
                        <textarea onChange={changeValue} id="note" value={formValue.note} name="note" className="input" placeholder="" style={{ height: "90px" }}>
                        </textarea>
                    </div>

                    <div className="button-parent">
                        <Link to="/" class="resertButton button cancelButton">Cancel</Link>
                        <div className="submit-reset">
                            <button className="button submitButton" type="submit" id="submitButton">{formValue.isUpdate ? 'Update': 'Submit'}</button>
                            <button className="button resertButton" onClick={reset} type="reset">Reset</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default PayrollForm;