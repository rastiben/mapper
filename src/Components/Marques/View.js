import React, { Component } from 'react';
import { IoIosCreate, IoIosTrash } from 'react-icons/io';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { MARQUES, REMOVE_MARQUE } from '../query/marques.js';

export default class Marque extends Component {

    render(){
        return(
            <tr>
                <td>
                    {this.props.data.marque}
                </td>
                <td>
                    {this.props.data.color}
                </td>
                <td>
                    <button onClick={() => this.props.setCurrentMarque()} className={styles.edit}><IoIosCreate></IoIosCreate></button>
                </td>
                <td>
                <Mutation mutation={REMOVE_MARQUE}
                    update={(cache, { data: { removeMarque } }) => {
                        const { marques } = cache.readQuery({ query: MARQUES });
                        cache.writeQuery({
                            query: MARQUES,
                            data: { marques: marques.filter(marque => marque._id !== removeMarque._id) }
                        });
                    }}
                >
                        {(removeMarque, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                removeMarque({ variables: { 
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