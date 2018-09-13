import React, { Component } from 'react';
import { IoIosCreate, IoIosTrash } from 'react-icons/io';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { AGENCES, REMOVE_AGENCE } from '../query/agences.js';

export default class Agence extends Component {

    render(){
        return(
            <tr>
                <td>
                    {this.props.data.agence}
                </td>
                <td>
                    <button onClick={() => this.props.setCurrentAgence()} className={styles.edit}><IoIosCreate></IoIosCreate></button>
                </td>
                <td>
                <Mutation mutation={REMOVE_AGENCE}
                    update={(cache, { data: { removeAgence } }) => {
                        const { agences } = cache.readQuery({ query: AGENCES });
                        cache.writeQuery({
                            query: AGENCES,
                            data: { agences: agences.filter(agence => agence._id !== removeAgence._id) }
                        });
                    }}
                >
                        {(removeAgence, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                removeAgence({ variables: { 
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