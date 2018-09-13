import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from '../../App.less';
import Marque from './View.js';
import EditMarque from './Edit.js';
import { MARQUES } from '../query/marques.js';

export default class Marques extends Component {

    constructor(props){
        super(props);

        this.state = {
            edit: false,
            currentMarque: undefined
        }
    }

    setCurrentMarque(marque,edit=true){
        this.setState({
            currentMarque: marque,
            edit: edit
        });
    }

    render(){
        return(
            <div className={styles.maximizeContainer}>

                { !this.state.edit ? (
                    <Query query={MARQUES}>
                        {({ loading, error, data }) => {

                            var marques = [];

                            if(data != undefined && Object.keys(data).length > 0){
                                marques = data.marques.map((marque) => {
                                    return (<Marque key={marque._id} setCurrentMarque={this.setCurrentMarque.bind(this,marque)} data={marque}></Marque>);
                                });
                            }

                            return(
                                <div>
                                    <div className={styles.container}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Marque</th>
                                                    <th>Couleur</th>
                                                    <th>Editer</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {marques}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={this.setCurrentMarque.bind(this,undefined)} className={styles.add}>Ajout d'un élément</button>
                                </div>
                            )

                        }}
                    </Query>
                ) : (
                    <EditMarque backToView={this.setCurrentMarque.bind(this,undefined,false)} currentMarque={this.state.currentMarque}></EditMarque>
                )}
            </div>
        );
    }

}