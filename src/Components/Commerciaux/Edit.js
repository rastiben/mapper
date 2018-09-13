import React, { Component } from 'react';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { UPDATE_COMMERCIAL, ADD_COMMERCIAL, COMMERCIAUX } from '../query/commerciaux.js';

export default class EditCommercial extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentCommercial: undefined
        };
    }

    componentWillMount(){
        this.setState({
            currentCommercial: this.props.currentCommercial
        });
    }
    
    handleChange(e){
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState(prevState => ({
            currentCommercial: {
                ...prevState.currentCommercial,
                [name]: value
            }
        }))
    }

    backToView(e){
        if(e) e.preventDefault();
        this.props.backToView();
    }

    render(){

        const currentCommercial = this.state.currentCommercial;

        return(
            <div>
                {currentCommercial && currentCommercial._id ? (
                    <Mutation mutation={UPDATE_COMMERCIAL}>
                        {(updateCommercial, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                updateCommercial({ variables: { 
                                    _id: currentCommercial._id,
                                    commercial: {
                                        commercial: currentCommercial.commercial
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Commercial</label>
                                        <input placeholder="Commercial" className={styles.input} value={currentCommercial.commercial != null ? currentCommercial.commercial : ""} name="commercial" onChange={this.handleChange.bind(this)} type="text" />
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
                    <Mutation mutation={ADD_COMMERCIAL}
                        update={(cache, { data: { addCommercial } }) => {
                            const { commerciaux } = cache.readQuery({ query: COMMERCIAUX });
                            cache.writeQuery({
                            query: COMMERCIAUX,
                            data: { commerciaux: commerciaux.concat([addCommercial]) }
                            });
                        }}
                        >
                        {(addCommercial, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                addCommercial({ variables: { 
                                    commercial: {
                                        commercial: currentCommercial.commercial
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Commercial</label>
                                        <input placeholder="Commercial" className={styles.input} name="commercial" onChange={this.handleChange.bind(this)} type="text" />
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