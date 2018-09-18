import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from '../../App.less';
import User from './View.js';
import EditUser from './Edit.js';
import { USERS } from '../query/users.js';

export default class Users extends Component {

    constructor(props){
        super(props);

        this.state = {
            edit: false,
            currentUser: undefined
        }
    }

    setCurrentUser(user,edit=true){
        this.setState({
            currentUser: user,
            edit: edit
        });
    }

    render(){
        return(
            <div className={styles.maximizeContainer}>

                { !this.state.edit ? (
                    <Query query={USERS}>
                        {({ loading, error, data }) => {

                            var users = [];

                            if(data != undefined && Object.keys(data).length > 0 && data.users != null){
                                users = data.users.map((user) => {
                                    return (<User key={user._id} setCurrentUser={this.setCurrentUser.bind(this,user)} data={user}></User>);
                                });
                            }

                            return(
                                <div>
                                    <div className={styles.container}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Nom d'utilisateur</th>
                                                    <th>Admin</th>
                                                    <th>Agence</th>
                                                    <th>Conducteur</th>
                                                    <th>Cree le</th>
                                                    <th>Modifie le</th>
                                                    <th>Editer</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={this.setCurrentUser.bind(this,undefined)} className={styles.add}>Ajout d'un élément</button>
                                </div>
                            )

                        }}
                    </Query>
                ) : (
                    <EditUser backToView={this.setCurrentUser.bind(this,undefined,false)} currentUser={this.state.currentUser}></EditUser>
                )}
            </div>
        );
    }

}