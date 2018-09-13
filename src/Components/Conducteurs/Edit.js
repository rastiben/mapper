import React, { Component } from 'react';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { UPDATE_CONDUCTEUR, ADD_CONDUCTEUR, CONDUCTEURS } from '../query/conducteurs.js';

export default class EditConducteur extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentConducteur: undefined
        };
    }

    componentWillMount(){
        this.setState({
            currentConducteur: this.props.currentConducteur
        });
    }
    
    handleChange(e){
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState(prevState => ({
            currentConducteur: {
                ...prevState.currentConducteur,
                [name]: value
            }
        }))
    }

    backToView(e){
        if(e) e.preventDefault();
        this.props.backToView();
    }

    render(){

        const currentConducteur = this.state.currentConducteur;

        return(
            <div>
                {currentConducteur && currentConducteur._id ? (
                    <Mutation mutation={UPDATE_CONDUCTEUR}>
                        {(updateConducteur, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                updateConducteur({ variables: { 
                                    _id: currentConducteur._id,
                                    conducteur: {
                                        conducteur: currentConducteur.conducteur
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Conducteur</label>
                                        <input placeholder="Conducteur" className={styles.input} value={currentConducteur.conducteur != null ? currentConducteur.conducteur : ""} name="conducteur" onChange={this.handleChange.bind(this)} type="text" />
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button type="submit" className={[styles.button, styles.valid].join(' ')}>Valider</button>
                                    <button onClick={this.backToView.bind(this)} className={[styles.button, styles.cancel].join(' ')}>Annuler</button>
                                </div>
                            </form>
                        )}
                    </Mutation>
                ) : (
                    <Mutation mutation={ADD_CONDUCTEUR}
                        update={(cache, { data: { addConducteur } }) => {
                            const { conducteurs } = cache.readQuery({ query: CONDUCTEURS });
                            cache.writeQuery({
                            query: CONDUCTEURS,
                            data: { conducteurs: conducteurs.concat([addConducteur]) }
                            });
                        }}
                        >
                        {(addConducteur, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                addConducteur({ variables: { 
                                    conducteur: {
                                        conducteur: currentConducteur.conducteur
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Conducteur</label>
                                        <input placeholder="Conducteur" className={styles.input} name="conducteur" onChange={this.handleChange.bind(this)} type="text" />
                                    </div>
                                </div>
                                <div className={styles.buttons}>
                                    <button type="submit" className={[styles.button, styles.valid].join(' ')}>Valider</button>
                                    <button onClick={this.backToView.bind(this)} className={[styles.button, styles.cancel].join(' ')}>Annuler</button>
                                </div>
                            </form>
                        )}
                    </Mutation>
                )}
            </div>
        );
    }
}