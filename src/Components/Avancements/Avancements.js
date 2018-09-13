import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from '../../App.less';
import Avancement from './View.js';
import EditAvancement from './Edit.js';
import { AVANCEMENTS } from '../query/avancements.js';

export default class Avancements extends Component {

    constructor(props){
        super(props);

        this.state = {
            edit: false,
            currentAvancement: undefined
        }
    }

    setCurrentAvancement(avancement,edit=true){
        this.setState({
            currentAvancement: avancement,
            edit: edit
        });
    }

    render(){
        return(
            <div className={styles.maximizeContainer}>

                { !this.state.edit ? (
                    <Query query={AVANCEMENTS}>
                        {({ loading, error, data }) => {

                            var avancements = [];

                            if(data != undefined && Object.keys(data).length > 0){
                                avancements = data.avancements.map((avancement) => {
                                    return (<Avancement key={avancement._id} setCurrentAvancement={this.setCurrentAvancement.bind(this,avancement)} data={avancement}></Avancement>);
                                });
                            }

                            return(
                                <div>
                                    <div className={styles.container}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Avancement</th>
                                                    <th>Editer</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {avancements}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={this.setCurrentAvancement.bind(this,undefined)} className={styles.add}>Ajout d'un élément</button>
                                </div>
                            )

                        }}
                    </Query>
                ) : (
                    <EditAvancement backToView={this.setCurrentAvancement.bind(this,undefined,false)} currentAvancement={this.state.currentAvancement}></EditAvancement>
                )}
            </div>
        );
    }

}