import React, { Component } from 'react';
import { IoIosCreate, IoIosTrash } from 'react-icons/io';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { COMMERCIAUX, REMOVE_COMMERCIAL } from '../query/commerciaux.js';

export default class Commercial extends Component {

    render(){
        return(
            <tr>
                <td>
                    {this.props.data.commercial}
                </td>
                <td>
                    <button onClick={() => this.props.setCurrentCommercial()} className={styles.edit}><IoIosCreate></IoIosCreate></button>
                </td>
                <td>
                <Mutation mutation={REMOVE_COMMERCIAL}
                    update={(cache, { data: { removeCommercial } }) => {
                        const { commerciaux } = cache.readQuery({ query: COMMERCIAUX });
                        cache.writeQuery({
                            query: COMMERCIAUX,
                            data: { commerciaux: commerciaux.filter(commercial => commercial._id !== removeCommercial._id) }
                        });
                    }}
                >
                        {(removeCommercial, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                removeCommercial({ variables: { 
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