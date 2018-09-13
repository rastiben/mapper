import React, { Component } from 'react';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { UPDATE_AGENCE, ADD_AGENCE, AGENCES } from '../query/agences.js';

export default class EditAgence extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentAgence: undefined
        };
    }

    componentWillMount(){
        this.setState({
            currentAgence: this.props.currentAgence
        });
    }
    
    handleChange(e){
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState(prevState => ({
            currentAgence: {
                ...prevState.currentAgence,
                [name]: value
            }
        }))
    }

    backToView(e){
        if(e) e.preventDefault();
        this.props.backToView();
    }

    render(){

        const currentAgence = this.state.currentAgence;

        return(
            <div>
                {currentAgence && currentAgence._id ? (
                    <Mutation mutation={UPDATE_AGENCE}>
                        {(updateAgence, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                updateAgence({ variables: { 
                                    _id: currentAgence._id,
                                    agence: {
                                        agence: currentAgence.agence
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Agence</label>
                                        <input placeholder="Agence" className={styles.input} value={currentAgence.agence != null ? currentAgence.agence : ""} name="agence" onChange={this.handleChange.bind(this)} type="text" />
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
                    <Mutation mutation={ADD_AGENCE}
                        update={(cache, { data: { addAgence } }) => {
                            const { agences } = cache.readQuery({ query: AGENCES });
                            cache.writeQuery({
                            query: AGENCES,
                            data: { agences: agences.concat([addAgence]) }
                            });
                        }}
                        >
                        {(addAgence, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                addAgence({ variables: { 
                                    agence: {
                                        agence: currentAgence.agence
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Agence</label>
                                        <input placeholder="Agence" className={styles.input} name="agence" onChange={this.handleChange.bind(this)} type="text" />
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