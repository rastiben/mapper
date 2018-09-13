import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from '../../App.less';
import Conducteur from './View.js';
import EditConducteur from './Edit.js';
import { CONDUCTEURS } from '../query/conducteurs.js';

export default class Conducteurs extends Component {

    constructor(props){
        super(props);

        this.state = {
            edit: false,
            currentConducteur: undefined
        }
    }

    setCurrentConducteur(conducteur,edit=true){
        this.setState({
            currentConducteur: conducteur,
            edit: edit
        });
    }

    render(){
        return(
            <div className={styles.maximizeContainer}>

                { !this.state.edit ? (
                    <Query query={CONDUCTEURS}>
                        {({ loading, error, data }) => {

                            var conducteurs = [];

                            if(data != undefined && Object.keys(data).length > 0){
                                conducteurs = data.conducteurs.map((conducteur) => {
                                    return (<Conducteur key={conducteur._id} setCurrentConducteur={this.setCurrentConducteur.bind(this,conducteur)} data={conducteur}></Conducteur>);
                                });
                            }

                            return(
                                <div>
                                    <div className={styles.container}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Conducteur</th>
                                                    <th>Editer</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {conducteurs}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={this.setCurrentConducteur.bind(this,undefined)} className={styles.add}>Ajout d'un élément</button>
                                </div>
                            )

                        }}
                    </Query>
                ) : (
                    <EditConducteur backToView={this.setCurrentConducteur.bind(this,undefined,false)} currentConducteur={this.state.currentConducteur}></EditConducteur>
                )}
            </div>
        );
    }

}