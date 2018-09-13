import React, { Component } from 'react';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { UPDATE_AVANCEMENT, ADD_AVANCEMENT, AVANCEMENTS } from '../query/avancements.js';

export default class EditAvancement extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentAvancement: undefined
        };
    }

    componentWillMount(){
        this.setState({
            currentAvancement: this.props.currentAvancement
        });
    }
    
    handleChange(e){
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState(prevState => ({
            currentAvancement: {
                ...prevState.currentAvancement,
                [name]: value
            }
        }))
    }

    backToView(e){
        if(e) e.preventDefault();
        this.props.backToView();
    }

    render(){

        const currentAvancement = this.state.currentAvancement;

        return(
            <div>
                {currentAvancement && currentAvancement._id ? (
                    <Mutation mutation={UPDATE_AVANCEMENT}>
                        {(updateAvancement, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                updateAvancement({ variables: { 
                                    _id: currentAvancement._id,
                                    avancement: {
                                        avancement: currentAvancement.avancement
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Avancement</label>
                                        <input placeholder="Avancement" className={styles.input} value={currentAvancement.avancement != null ? currentAvancement.avancement : ""} name="avancement" onChange={this.handleChange.bind(this)} type="text" />
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
                    <Mutation mutation={ADD_AVANCEMENT}
                        update={(cache, { data: { addAvancement } }) => {
                            const { avancements } = cache.readQuery({ query: AVANCEMENTS });
                            cache.writeQuery({
                            query: AVANCEMENTS,
                            data: { avancements: avancements.concat([addAvancement]) }
                            });
                        }}
                        >
                        {(addAvancement, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                addAvancement({ variables: { 
                                    avancement: {
                                        avancement: currentAvancement.avancement
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Avancement</label>
                                        <input placeholder="Avancement" className={styles.input} name="avancement" onChange={this.handleChange.bind(this)} type="text" />
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