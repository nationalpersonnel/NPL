﻿import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import Select from 'react-select';
import moment from 'moment';

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '-' + month + '-' + year;
}

function getReverseDate(str) {
    var res = str.split("-");
    console.log(res);
    return res[2] + '-' + res[1] + '-' + res[0];

}

export class FetchWorker extends Component {

    constructor(props) {

        super(props);

        this.state = {

            worker: [],
            workerId: '',
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            startDate: '',
            workerType: [],
            workertypeid:'',
            recruiter: [],
            recruiterid: '',
            branchid:'',
            branch: [],
            ethnicity: '',
            sickLeavesLeft: '',
            options: [],
            selectedOption: null,
            recruiteroptions: [],
            recruiterselectedOption: null,
            branchoptions: [],
            branchselectedOption:null,
            showModal:false

        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.logChange = this.logChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

  

    componentDidMount() {
        
        let self = this;



        fetch('/api/workers', {



            method: 'GET'

        }).then(function (response) {



            if (response.status >= 400) {

                throw new Error("Bad response from server");

            }



            return response.json();



        }).then(function (data) {

           // self.setState({ worker: data });

            var wrk = [];
            var len = data.length;
            for (var i = 0; i < len; i++) {
                wrk.push({
                    workerId: data[i].workerId,
                    firstName: data[i].firstName,
                    lastName: data[i].lastName,
                    dob: getFormattedDate(new Date(data[i].dob)),
                    email: data[i].email,
                    startDate: getFormattedDate(new Date(data[i].startDate)),
                    workerType: data[i].workerType,
                    recruiter: data[i].recruiter,
                    branch: data[i].branch,
                    ethnicity: data[i].ethnicity,
                    sickLeavesLeft: data[i].sickLeavesLeft
                });
            }
            self.setState({
                worker: [...self.state.worker, ...wrk]
            });

            console.log(self.state.worker);



            console.log("Worker", self.state.worker);

        }).catch(err => {

            console.log("caught it", err);

        });


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
                    label: data[i].firstName + ' ' + data[i].lastName
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

    handleEdit(event) {
        //alert("Edit");
        event.preventDefault();
       
        
        var data = {
            workerId: this.state.workerId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: getReverseDate(this.state.dob),
            email: this.state.email,
            startDate: getReverseDate(this.state.startDate),
            workerTypeId: this.state.workertypeid,
            recruiterId: this.state.recruiterid,
            branchId: this.state.branchid,
            ethnicity: this.state.ethnicity,
            sickLeavesLeft: this.state.sickLeavesLeft
        };
        console.log("Posted", data);
        //let that = this;

        fetch('api/Workers/' + data.workerId, {

            method: 'PUT',

            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)

        }).then(function (response) {
            alert("Data has been Edited Close Modal And Refresh to view Changes");
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            
            console.log("Success", data);
        });

    }


    handleOpenModal(member) {
        var workertype = [];
        console.log("Modal",this.state.options);
        for (var i = 0; i < this.state.options.length; i++)
        {
            if (member.workerType.type == this.state.options[i].label)
            {
                this.setState({ workertypeid: this.state.options[i].value });
                workertype.push({
                    value: this.state.options[i].value,
                    label: this.state.options[i].label
                });
                
            }
        }
        console.log("WorkerType", workertype);
        var recruiter = [];
        console.log("Modal", this.state.recruiteroptions);
        console.log("Member", member.recruiter);
        for (var i = 0; i < this.state.recruiteroptions.length; i++) {
            if (member.recruiter.firstName + ' ' + member.recruiter.lastName == this.state.recruiteroptions[i].label) {
                this.setState({ recruiterid: this.state.recruiteroptions[i].value });
                recruiter.push({
                    value: this.state.recruiteroptions[i].value,
                    label: this.state.recruiteroptions[i].label
                });

            }
        }
        console.log("Recruiter", recruiter);

        var branch = [];
        console.log("Modal", this.state.branchoptions);
        console.log("Member", member.branch);
        for (var i = 0; i < this.state.branchoptions.length; i++) {
            if (member.branch.name == this.state.branchoptions[i].label) {
                this.setState({ branchid: this.state.branchoptions[i].value });
                branch.push({
                    value: this.state.branchoptions[i].value,
                    label: this.state.branchoptions[i].label
                });

            }
        }
        console.log("Branch", branch);
        this.setState({
            workerId: member.workerId,
            firstName: member.firstName,
            lastName: member.lastName,
            dob: member.dob,
            email: member.email,
            startDate: member.startDate,
            workerType: workertype,
            recruiter: recruiter,
            branch: branch,
            ethnicity: member.ethnicity,
            sickLeavesLeft: member.sickLeavesLeft,
            showModal: true
        });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        this.setState({ workertypeid: selectedOption.value });
        console.log(`Option selected:`, selectedOption);
    }
    handleRecruiterChange = recruiterselectedOption => {
        this.setState({ recruiterselectedOption });
        this.setState({ recruiterid: recruiterselectedOption.value });
        console.log(`Option selected:`, recruiterselectedOption);
    }
    handleBranchChange = branchselectedOption => {
        this.setState({ branchselectedOption });
        this.setState({ branchid: branchselectedOption.value });
        console.log(`Option selected:`, branchselectedOption);
    }
    
    
    logChange(e) {

        this.setState({

            [e.target.name]: e.target.value

        });



    }
    
    render() {


        return (<div><h1>Fetch Worker</h1>

          

            <table>

                <thead>

                    <tr>

                       

                        <th>First Name</th>

                        <th>Last Name</th>

                        <th>DOB</th>

                        <th>Email</th>

                        <th>Start Date</th>

                        <th>Worker</th>

                        <th>Recruiter</th>

                        <th>Branch</th>

                        <th>Ehinicity</th>

                        <th>SickLeavesLeft</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {

                        this.state.worker.map(member =>

                            <tr key={member.workerId}>


                                <td>{member.firstName}</td>

                                <td>{member.lastName}</td>

                                <td>{member.dob}</td>

                                <td>{member.email}</td>

                                <td>{member.startDate}</td>

                                <td>{member.workerType.type}</td>

                                <td>{member.recruiter.firstName +' '+member.recruiter.lastName}</td>

                                <td>{member.branch.name}</td>

                                <td>{member.ethnicity}</td>

                                <td>{member.sickLeavesLeft}</td>
                                
                                <td><a onClick={() => this.handleOpenModal(member)}><button className="ui button">Edit</button></a></td>


                            </tr>)

                    }

                </tbody>

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                > <form onSubmit={this.handleEdit} method="PUT">
                        <h1>Edit Worker</h1> <br />
                        <div id="resp-table-body">
                            <div id="resp-table-body">
                                <div class="resp-table-row">
                                    <div class="table-body-cell">
                                        <label>First Name</label>
                                    </div>
                                <div class="table-body-cell">
                                        <input onChange={this.logChange} value={this.state.firstName} name='firstName' />
                                     </div>
                                </div>
                                <div class="resp-table-row">
                                    <div class="table-body-cell">
                                        <label>Last Name</label>
                                    </div>
                                    <div class="table-body-cell">
                                        <input onChange={this.logChange} value={this.state.lastName} name='lastName' />
                                    </div>
                                </div>
                                <div class="resp-table-row">
                                    <div class="table-body-cell">
                                        <label>Date of Birth</label>
                                    </div>
                                    <div class="table-body-cell">
                                        <input onChange={this.logChange} value={this.state.dob} name='dob' />
                                    </div>
                                </div>
                                <div class="resp-table-row">
                                    <div class="table-body-cell">
                                        <label>Email</label>
                                    </div>
                                    <div class="table-body-cell">
                                        <input onChange={this.logChange} value={this.state.email} name='email' />
                                    </div>
                                </div>
                                <div class="resp-table-row">
                                    <div class="table-body-cell">
                                        <label>Start Date</label>
                                    </div>
                                    <div class="table-body-cell">
                                        <input onChange={this.logChange} value={this.state.startDate} name='startDate' />
                                    </div>
                                </div>
                                <div class="resp-table-row">
                                    <div class="table-body-cell">
                                        <label>Worker Type</label>
                                    </div>
                                    <div class="table-body-cell">
                                        <Select defaultValue={this.state.workerType} onChange={this.handleChange} options={this.state.options} />
                                    </div>
                                </div>
                                <div class="resp-table-row">
                                    <div class="table-body-cell">
                                        <label>Recruiter</label>
                                    </div>
                                    <div class="table-body-cell">
                                        <Select defaultValue={this.state.recruiter} onChange={this.handleRecruiterChange} options={this.state.recruiteroptions} />
                                    </div>
                                </div>
                                <div class="resp-table-row">
                                    <div class="table-body-cell">
                                        <label>Branch</label>
                                    </div>
                                    <div class="table-body-cell">
                                        <Select defaultValue={this.state.branch} onChange={this.handleBranchChange} options={this.state.branchoptions} />
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
                                        <label>Sick Leaves Left</label>
                                    </div>
                                    <div class="table-body-cell">
                                        <input onChange={this.logChange} value={this.state.sickLeavesLeft} name='sickLeavesLeft' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button>Submit</button>
                        <button onClick={this.handleCloseModal}>Close Modal</button>
                    </form>
                </Modal>

            </table>

        </div>);


    }

}