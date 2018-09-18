import React, { Component } from 'react';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { UPDATE_USER, ADD_USER, USERS } from '../query/users.js';
import { client } from '../../index.js';
import { AGENCES } from '../query/agences.js';
import { CONDUCTEURS } from '../query/conducteurs.js';

export default class EditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentUser: undefined
        };
    }

    componentWillMount(){
        this.setState({
            currentUser: this.props.currentUser
        });
    }
    
    handleChange(e){
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                [name]: value
            }
        }))
    }

    backToView(e){
        if(e) e.preventDefault();
        this.props.backToView();
    }

    selectOptions(array,property){
        return array.map((elem) => {
            return (<option key={elem._id} value={elem._id}>{elem[property]}</option>);
        });
    }

    render(){

        const currentUser = this.state.currentUser;
        
        const { agences } = client.readQuery({ query : AGENCES });
        const { conducteurs } = client.readQuery({ query : CONDUCTEURS });

        return(
            <div>
                {currentUser && currentUser._id ? (
                    <Mutation mutation={UPDATE_USER}>
                        {(updateUser, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                updateUser({ variables: { 
                                    _id: currentUser._id,
                                    user: {
                                        username: currentUser.username,
                                        password: currentUser.password,
                                        admin: currentUser.admin,
                                        agence: currentUser.agence,
                                        conducteur: currentUser.conducteur,
                                        created: currentUser.created,
                                        modified: currentUser.modified
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Nom d'utilisateur</label>
                                        <input placeholder="Nom d'utilisateur" className={styles.input} value={currentUser.username != null ? currentUser.username : ""} name="username" onChange={this.handleChange.bind(this)} type="text" />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Mot de passe</label>
                                        <input placeholder="Mot de passe" className={styles.input} value={currentUser.password != null ? currentUser.password : ""} name="password" onChange={this.handleChange.bind(this)} type="password" />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Admin</label>
                                        <input placeholder="Admin" className={styles.input} checked={currentUser.admin != null ? currentUser.admin : ""} name="admin" onChange={this.handleChange.bind(this)} type="checkbox" />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Agence</label>
                                        <select className={styles.select} value={currentUser.agence != null ? currentUser.agence : ""} name="agence" onChange={this.handleChange.bind(this)} type="text">
                                            <option value="">Agence</option>
                                            {this.selectOptions(agences,"agence")}
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label>Conducteur</label>
                                        <select className={styles.select} value={currentUser != null ? currentUser.conducteur : ""} name="conducteur" onChange={this.handleChange.bind(this)} type="text">
                                            <option value="">Conducteur</option>
                                            {this.selectOptions(conducteurs,"conducteur")}
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button type="submit" className={[styles.button, styles.valid].join(' ')}>Valider</button>
                                    <button onClick={this.backToView.bind(this)} className={[styles.button, styles.cancel].join(' ')}>Annuler</button>
                                </div>
                            </form>
                        )}
                    </Mutation>
                ) : (
                    <Mutation mutation={ADD_USER}
                        update={(cache, { data: { addUser } }) => {
                            var { users } = cache.readQuery({ query: USERS });
                            users = users == null ? [] : users;
                            cache.writeQuery({
                                query: USERS,
                                data: { users: users.concat([addUser]) }
                            });
                        }}
                        >
                        {(addUser, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                addUser({ variables: { 
                                    user: {
                                        username: currentUser.username,
                                        password: currentUser.password,
                                        admin: currentUser.admin,
                                        agence: currentUser.agence,
                                        conducteur: currentUser.conducteur,
                                        created: currentUser.created,
                                        modified: currentUser.modified
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Nom d'utilisateur</label>
                                        <input placeholder="Nom d'utilisateur" className={styles.input} value={currentUser != null ? currentUser.username : ""} name="username" onChange={this.handleChange.bind(this)} type="text" />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Mot de passe</label>
                                        <input placeholder="Mot de passe" className={styles.input} value={currentUser != null ? currentUser.password : ""} name="password" onChange={this.handleChange.bind(this)} type="password" />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Admin</label>
                                        <input placeholder="Admin" className={styles.input} value={currentUser != null ? currentUser.admin : ""} name="admin" onChange={this.handleChange.bind(this)} type="checkbox" />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Agence</label>
                                        <select className={styles.select} value={currentUser != null ? currentUser.agence : ""} name="agence" onChange={this.handleChange.bind(this)} type="text">
                                            <option value="">Agence</option>
                                            {this.selectOptions(agences,"agence")}
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label>Conducteur</label>
                                        <select className={styles.select} value={currentUser != null ? currentUser.conducteur : ""} name="conducteur" onChange={this.handleChange.bind(this)} type="text">
                                            <option value="">Conducteur</option>
                                            {this.selectOptions(conducteurs,"conducteur")}
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button type="submit" className={[styles.button, styles.valid].join(' ')}>Valider</button>
                                    <button onClick={this.backToView.bind(this)} className={[styles.button, styles.cancel].join(' ')}>Annuler</button>
                                </div>
                            </form>
                        )}
                    </Mutation>
                )}
            </div>
        );
    }
}