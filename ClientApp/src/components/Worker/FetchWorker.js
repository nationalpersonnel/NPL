import React, { Component } from 'react';

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
            ethinicity: '',
            sickLeavesLeft:''

        };

        this.logChange = this.logChange.bind(this);

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

                                <td>{member.ethinicity}</td>

                                <td>{member.sickLeavesLeft}</td>

                                <td>Edit|Detail</td>


                            </tr>)

                    }

                </tbody>



            </table>

        </div>);


    }

}