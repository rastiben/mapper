import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from '../../App.less';
import Agence from './View.js';
import EditAgence from './Edit.js';
import { AGENCES } from '../query/agences.js';

export default class Agences extends Component {

    constructor(props){
        super(props);

        this.state = {
            edit: false,
            currentAgence: undefined
        }
    }

    setCurrentAgence(agence,edit=true){
        this.setState({
            currentAgence: agence,
            edit: edit
        });
    }

    render(){
        return(
            <div className={styles.maximizeContainer}>

                { !this.state.edit ? (
                    <Query query={AGENCES}>
                        {({ loading, error, data }) => {

                            var agences = [];

                            if(data != undefined && Object.keys(data).length > 0){
                                agences = data.agences.map((agence) => {
                                    return (<Agence key={agence._id} setCurrentAgence={this.setCurrentAgence.bind(this,agence)} data={agence}></Agence>);
                                });
                            }

                            return(
                                <div>
                                    <div className={styles.container}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Agence</th>
                                                    <th>Editer</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {agences}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={this.setCurrentAgence.bind(this,undefined)} className={styles.add}>Ajout d'un élément</button>
                                </div>
                            )

                        }}
                    </Query>
                ) : (
                    <EditAgence backToView={this.setCurrentAgence.bind(this,undefined,false)} currentAgence={this.state.currentAgence}></EditAgence>
                )}
            </div>
        );
    }

}