import React, { Component } from 'react';
import $ from 'jquery';
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function getReverseDate(str) {
    var res = str.split("-");
    console.log(res);
    return res[2] + '-' + res[1] + '-' + res[0];

}
function getReverseFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + '-' + month + '-' + day;
}
export class AddWorker extends Component {
    constructor(props) {

        super(props);

        this.state = {
            workerid:'DA88EECE-7704-4EFD-B75E-5E67EF29F2FD',
            firstname: '',
            lastname: '',
            dob: '',
            email: '',
            startdate: '',
            workertypeid: '',
            recruiterid: '',
            branchid: '',
            ethnicity: '',
            sickleavesleft: '',
            options:[],
            selectedOption: null,
            recruiteroptions: [],
            recruiterselectedOption: null,
            branchoptions: [],
            branchselectedOption:null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.logChange = this.logChange.bind(this);



    }


    componentDidMount() {
        console.log("add worker");

        let self = this;



        fetch('/api/WorkerTypes', {



            method: 'GET'

        }).then(function (response) {



            if (response.status >= 400) {

                throw new Error("Bad response from server");

            }



            return response.json();



        }).then(function (data) {

            console.log("WorkerTypes", data);

            var arr = [];
            var len = data.length;
            for (var i = 0; i < len; i++) {
                arr.push({
                    value: data[i].workerTypeId,
                    label: data[i].type
                });
            }
            self.setState({
                options: [...self.state.options, ...arr]
            });
           
            console.log(self.state.options);


        }).catch(err => {

            console.log("caught it", err);

        });


        fetch('api/Recruiters', {



            method: 'GET'

        }).then(function (response) {



            if (response.status >= 400) {

                throw new Error("Bad response from server");

            }



            return response.json();



        }).then(function (data) {

            console.log("Recruiter", data);

            var arr = [];
            var len = data.length;
            for (var i = 0; i < len; i++) {
                arr.push({
                    value: data[i].recruiterId,
                    label: data[i].firstName +' ' + data[i].lastName
                });
            }
            self.setState({
                recruiteroptions: [...self.state.recruiteroptions, ...arr]
            });

            console.log(self.state.recruiteroptions);


        }).catch(err => {

            console.log("caught it", err);

        });

        fetch('api/Branches', {



            method: 'GET'

        }).then(function (response) {



            if (response.status >= 400) {

                throw new Error("Bad response from server");

            }



            return response.json();



        }).then(function (data) {

            console.log("Braches", data);

            var arr = [];
            var len = data.length;
            for (var i = 0; i < len; i++) {
                arr.push({
                    value: data[i].branchId,
                    label: data[i].name
                });
            }
            self.setState({
                branchoptions: [...self.state.branchoptions, ...arr]
            });

            console.log(self.state.branchoptions);


        }).catch(err => {

            console.log("caught it", err);

        });



    }

    handleSubmit(event) {

        event.preventDefault();
        console.log(this.state.dob);
        var data = {
            WorkerId: this.state.workerid,
            FirstName: this.state.firstname,
            LastName: this.state.lastname,
            Dob: getReverseFormattedDate(this.state.dob),
            Email: this.state.email,
            StartDate: getReverseFormattedDate(this.state.startdate),
            WorkerTypeId: this.state.workertypeid,
            RecruiterId: this.state.recruiterid,
            BranchId: this.state.branchid,
            Ethnicity: this.state.ethnicity,
            SickLeavesLeft: this.state.sickleavesleft
        };

        console.log(data);

        $.ajax({

            url: 'api/Workers',

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            dataType: 'json',

            data: JSON.stringify(data)

        }).then(function (response) {

            console.log('2', data);

            if (response.status >= 400) {

                throw new Error("Bad response from server");

            }
            alert("Worker Added");
            

        }).then(function (data) {

            console.log(data);

            if (data === "success") {

                this.setState({ msg: "Thanks for registering" });

            }
            


        }).catch(function (err) {

            console.log(data);

            console.log(err);

        });



    }

    logChange(e) {

        this.setState({ [e.target.name]: e.target.value });

    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.setState({ workertypeid: selectedOption.value });
        console.log(`Option selected:`, selectedOption);
    };
    handleRecruiterChange = recruiterselectedOption => {
        this.setState({ recruiterselectedOption });
        this.setState({ recruiterid: recruiterselectedOption.value });
        console.log(`Option selected:`, recruiterselectedOption);
    };
    handleBranchChange = branchselectedOption => {
        this.setState({ branchselectedOption });
        this.setState({ branchid: branchselectedOption.value });
        console.log(`Option selected:`, branchselectedOption);
    };
    render() {
        const { selectedOption } = this.state;
        return (<form onSubmit={this.handleSubmit} method="POST">

            <h1>Add Worker</h1>
            <div id="resp-table">
                <div id="resp-table-body">
                    
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>First Name</label>
                        </div>
                        <div class="table-body-cell">
                            <input onChange={this.logChange} value={this.state.firstname} name='firstname' required />
                        </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>Last Name</label>
                        </div>
                        <div class="table-body-cell">
                            <input onChange={this.logChange} value={this.state.lastname} name='lastname' required />
                            </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>DOB</label>
                        </div>
                        <div class="table-body-cell">
                            <DatePicker selected={this.state.dob} onChange={date => this.setState({ dob: date })} dateFormat="dd-MM-yyyy" />
                        </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>Email</label>
                        </div>
                        <div class="table-body-cell">
                            <input onChange={this.logChange} value={this.state.email} name='email' required />
                            </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>Start Date</label>
                        </div>
                        <div class="table-body-cell">
                            <DatePicker selected={this.state.startdate} onChange={date => this.setState({ startdate: date })} dateFormat="dd-MM-yyyy" />
                        </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>Worker Type</label>
                        </div>
                        <div class="table-body-cell">
                           
                            <Select value={this.state.selectedOption} onChange={this.handleChange} options={this.state.options} placeholder={'Select an option'} />
                         </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                                <label>Recruiter</label>
                        </div>
                        <div class="table-body-cell">
                            <Select value={this.state.recruiterselectedOption} onChange={this.handleRecruiterChange} options={this.state.recruiteroptions} placeholder={'Select an option'} />
                         </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>Branch</label>
                        </div>
                        <div class="table-body-cell">
                            <Select value={this.state.branchselectedOption} onChange={this.handleBranchChange} options={this.state.branchoptions} placeholder={'Select an option'} />
                         </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>Ethnicity</label>
                        </div>
                        <div class="table-body-cell">
                            <input onChange={this.logChange} value={this.state.ethnicity} name='ethnicity' />
                            </div>
                    </div>
                    <div class="resp-table-row">
                        <div class="table-body-cell">
                            <label>SickLeaves Left</label>
                        </div>
                        <div class="table-body-cell">
                            <input onChange={this.logChange} value={this.state.sickleavesleft} name='sickleavesleft' />
                            </div>
                    </div>
                </div>
            </div>

            
            <div><button>Submit</button></div>
        </form>);

    }
}