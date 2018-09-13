import React, { Component } from 'react';
import { IoIosCreate, IoIosTrash } from 'react-icons/io';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { CONDUCTEURS, REMOVE_CONDUCTEUR } from '../query/conducteurs.js';

export default class Conducteur extends Component {

    render(){
        return(
            <tr>
                <td>
                    {this.props.data.conducteur}
                </td>
                <td>
                    <button onClick={() => this.props.setCurrentConducteur()} className={styles.edit}><IoIosCreate></IoIosCreate></button>
                </td>
                <td>
                <Mutation mutation={REMOVE_CONDUCTEUR}
                    update={(cache, { data: { removeConducteur } }) => {
                        const { conducteurs } = cache.readQuery({ query: CONDUCTEURS });
                        cache.writeQuery({
                            query: CONDUCTEURS,
                            data: { conducteurs: conducteurs.filter(conducteur => conducteur._id !== removeConducteur._id) }
                        });
                    }}
                >
                        {(removeConducteur, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                removeConducteur({ variables: { 
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