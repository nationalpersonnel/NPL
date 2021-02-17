import React, { Component } from 'react';
import $ from 'jquery';
export class AddWorker extends Component {
    constructor(props) {

        super(props);

        this.state = {
            workerid:'DA88EECE-7704-4EFD-B75E-5E67EF29F2FC',
            firstname: '',
            lastname: '',
            dob: '',
            email: '',
            startdate: '',
            workertypeid: '',
            recruiterid: '',
            branchid: '',
            ethnicity: '',
            sickleavesleft:''
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.logChange = this.logChange.bind(this);



    }

    handleSubmit(event) {

        event.preventDefault();

        var data = {
            WorkerId: this.state.workerid,
            FirstName: this.state.firstname,
            LastName: this.state.lastname,
            Dob: this.state.dob,
            Email: this.state.email,
            StartDate: this.state.startdate,
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

            return response.json();

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

    render() {

        return (<form onSubmit={this.handleSubmit} method="POST">

            <h1>Add Worker</h1>
            <table>
            <tr>
               <td><label>First Name</label></td>
               <td><input onChange={this.logChange} value={this.state.firstname} name='firstname' /> </td>
            </tr>
            <tr>
                <td><label>Last Name</label> </td>
                <td><input onChange={this.logChange} value={this.state.lastname} name='lastname' /> </td>
            </tr>
            <tr>
                <td><label>DOB</label></td>
                <td><input onChange={this.logChange} value={this.state.dob} name='dob' /></td>
            </tr>
            <tr>
                <td><label>Email</label></td>
                <td><input onChange={this.logChange} value={this.state.email} name='email' /></td>
            </tr>
            <tr>
                <td><label>Start Date</label></td>
                <td><input onChange={this.logChange} value={this.state.startdate} name='startdate' /></td>
            </tr>
            <tr>
                <td><label>Worker Type Id</label></td>
                <td><input onChange={this.logChange} value={this.state.workertypeid} name='workertypeid' /></td>
             </tr>

            <tr>
                <td><label>Recruiter ID Id</label></td>
                <td><input onChange={this.logChange} value={this.state.recruiterid} name='recruiterid' /></td>
            </tr>
            <tr>
                <td><label>Branch Id</label></td>
                <td><input onChange={this.logChange} value={this.state.branchid} name='branchid' /></td>
            </tr>
            <tr>
                <td><label>Ethnicity</label></td>
                <td><input onChange={this.logChange} value={this.state.ethnicity} name='ethnicity' /></td>
            </tr>
            <tr>
                <td><label>SickLeaves Left</label></td>
                <td><input onChange={this.logChange} value={this.state.sickleavesleft} name='sickleavesleft' /></td>
            </tr>  
          </table>
            <div><button>Submit</button></div>
        </form>);

    }
}