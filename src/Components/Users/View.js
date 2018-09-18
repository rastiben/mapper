import React, { Component } from 'react';
import { IoIosCreate, IoIosTrash } from 'react-icons/io';
import styles from '../../App.less';
import moment from 'moment';
import { Mutation } from 'react-apollo';
import { USERS, REMOVE_USER } from '../query/users.js';
import { client } from '../../index.js';
import { AGENCES } from '../query/agences.js';
import { CONDUCTEURS } from '../query/conducteurs.js';

export default class User extends Component {

    render(){

        const { agences } = client.readQuery({ query : AGENCES });
        const { conducteurs } = client.readQuery({ query : CONDUCTEURS });

        var agence = agences.filter(agence => agence._id == this.props.data.agence);
        agence = agence.length > 0 ? agence[0].agence : "";
        var conducteur = conducteurs.filter(conducteur => conducteur._id == this.props.data.conducteur);
        conducteur = conducteur.length > 0 ? conducteur[0].conducteur : "";

        return(
            <tr>
                <td>
                    {this.props.data.username}
                </td>
                <td>
                    {this.props.data.admin ? "1" : "0"}
                </td>
                <td>
                    {agence}
                </td>
                <td>
                    {conducteur}
                </td>
                <td>
                    {moment(this.props.data.created).isValid() ? moment(this.props.data.created).format("DD/MM/YYYY HH:mm:ss") : ""}
                </td>
                <td>
                    {moment(this.props.data.updated).isValid() ? moment(this.props.data.updated).format("DD/MM/YYYY HH:mm:ss") : ""}
                </td>
                <td>
                    <button onClick={() => this.props.setCurrentUser()} className={styles.edit}><IoIosCreate></IoIosCreate></button>
                </td>
                <td>
                <Mutation mutation={REMOVE_USER}
                    update={(cache, { data: { removeUser } }) => {
                        const { users } = cache.readQuery({ query: USERS });
                        cache.writeQuery({
                            query: USERS,
                            data: { users: users.filter(user => user._id !== removeUser._id) }
                        });
                    }}
                >
                        {(removeUser, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                removeUser({ variables: { 
                                    _id: this.props.data._id
                                }
                                });
                            }}>
                                <button className={styles.remove}><IoIosTrash></IoIosTrash></button>
                            </form>
                        )}
                    </Mutation>
                </td>
            </tr>
        );
    }

}