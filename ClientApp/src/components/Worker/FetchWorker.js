import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from "react-router-dom";

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
            workerType: '',
            recruiter: '',
            branch: '',
            ethnicity: '',
            sickLeavesLeft: '',
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

            self.setState({ worker: data });



            console.log("Worker", self.state.worker);

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
            dob: this.state.dob,
            email: this.state.email,
            startDate: this.state.startDate,
            workerTypeId: '5A78FFBF-3E59-4CC3-A6F1-9022DBA8C556',
            recruiterId: 'EE36D9E2-1068-4CE0-944F-8F055641DF1B',
            branchId: 'EA18066E-5E22-408F-8956-981BEF578C3C',
            ethnicity: this.state.ethnicity,
            sickLeavesLeft: this.state.sickLeavesLeft
        };

        //let that = this;

        fetch('api/Workers/' + data.workerId, {

            method: 'PUT',

            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)

        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log("Success", data);
        });

    }


    handleOpenModal(member) {
        this.setState({
            workerId: member.workerId,
            firstName: member.firstName,
            lastName: member.lastName,
            dob: member.dob,
            email: member.email,
            startDate: member.startDate,
            workerType: member.workerType.type,
            recruiter: member.recruiter.firstName,
            branch: member.branch.name,
            ethnicity: member.ethnicity,
            sickLeavesLeft: member.sickLeavesLeft,
            showModal: true
        });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
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

                        <th>EMAIL</th>

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

                                <td>{member.recruiter.firstName}</td>

                                <td>{member.branch.name}</td>

                                <td>{member.ethnicity}</td>

                                <td>{member.sickLeavesLeft}</td>
                                
                                <td><a onClick={() => this.handleOpenModal(member)}><button class="ui button">Edit</button></a></td>


                            </tr>)

                    }

                </tbody>

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                > <form onSubmit={this.handleEdit} method="PUT">
                        <h1>Edit Worker</h1> <br />
                        <div><label>First Name</label>
                        <input onChange={this.logChange} value={this.state.firstName} name='firstName' /></div>
                        <div>
                        <label>Last Name</label>
                        <input onChange={this.logChange} value={this.state.lastName} name='lastName' />
                        </div>
                        <div>
                        <label>Date of Birth</label>
                        <input onChange={this.logChange} value={this.state.dob} name='dob' />
                        </div>
                        <div>
                        <label>Email</label>
                        <input onChange={this.logChange} value={this.state.email} name='email' />
                        </div>
                        <div>
                        <label>Start Date</label>
                        <input onChange={this.logChange} value={this.state.startDate} name='startDate' />
                        </div>
                        <div>
                        <label>Worker Type</label>
                        <input onChange={this.logChange} value={this.state.workerType} name='workerType' />
                        </div>
                        <div>
                        <label>Recruiter</label>
                        <input onChange={this.logChange} value={this.state.recruiter} name='recruiter' />
                        </div>
                        <div>
                            <label>Branch</label>
                            <input onChange={this.logChange} value={this.state.branch} name='branch' />
                        </div>
                        <div>
                            <label>Ethnicity</label>
                            <input onChange={this.logChange} value={this.state.ethnicity} name='ethnicity' />
                        </div>
                        <div>
                            <label>Sick Leaves Left</label>
                            <input onChange={this.logChange} value={this.state.sickLeavesLeft} name='ethnicity' />
                        </div>
                        <button>Submit</button>
                        <button onClick={this.handleCloseModal}>Close Modal</button>
                    </form>
                </Modal>

            </table>

        </div>);


    }

}