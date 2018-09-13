import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from '../../App.less';
import Commercial from './View.js';
import EditCommercial from './Edit.js';
import { COMMERCIAUX } from '../query/commerciaux.js';

export default class Commerciaux extends Component {

    constructor(props){
        super(props);

        this.state = {
            edit: false,
            currentCommercial: undefined
        }
    }

    setCurrentCommercial(commercial,edit=true){
        this.setState({
            currentCommercial: commercial,
            edit: edit
        });
    }

    render(){
        return(
            <div className={styles.maximizeContainer}>

                { !this.state.edit ? (
                    <Query query={COMMERCIAUX}>
                        {({ loading, error, data }) => {

                            var commerciaux = [];

                            if(data != undefined && Object.keys(data).length > 0){
                                commerciaux = data.commerciaux.map((commercial) => {
                                    return (<Commercial key={commercial._id} setCurrentCommercial={this.setCurrentCommercial.bind(this,commercial)} data={commercial}></Commercial>);
                                });
                            }

                            return(
                                <div>
                                    <div className={styles.container}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Commercial</th>
                                                    <th>Editer</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {commerciaux}
                                            </tbody>
                                        </table>
                                    </div>
                                    <button onClick={this.setCurrentCommercial.bind(this,undefined)} className={styles.add}>Ajout d'un élément</button>
                                </div>
                            )

                        }}
                    </Query>
                ) : (
                    <EditCommercial backToView={this.setCurrentCommercial.bind(this,undefined,false)} currentCommercial={this.state.currentCommercial}></EditCommercial>
                )}
            </div>
        );
    }

}