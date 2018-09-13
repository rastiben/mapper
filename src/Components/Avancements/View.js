import React, { Component } from 'react';
import { IoIosCreate, IoIosTrash } from 'react-icons/io';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { AVANCEMENTS, REMOVE_AVANCEMENT } from '../query/avancements.js';

export default class Avancement extends Component {

    render(){
        return(
            <tr>
                <td>
                    {this.props.data.avancement}
                </td>
                <td>
                    <button onClick={() => this.props.setCurrentAvancement()} className={styles.edit}><IoIosCreate></IoIosCreate></button>
                </td>
                <td>
                <Mutation mutation={REMOVE_AVANCEMENT}
                    update={(cache, { data: { removeAvancement } }) => {
                        const { avancements } = cache.readQuery({ query: AVANCEMENTS });
                        cache.writeQuery({
                            query: AVANCEMENTS,
                            data: { avancements: avancements.filter(avancement => avancement._id !== removeAvancement._id) }
                        });
                    }}
                >
                        {(removeAvancement, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                removeAvancement({ variables: { 
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