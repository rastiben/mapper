import React, { Component } from 'react';
import styles from '../../App.less';
import { Mutation } from 'react-apollo';
import { UPDATE_MARQUE, ADD_MARQUE, MARQUES } from '../query/marques.js';

export default class EditMarque extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentMarque: undefined
        };
    }

    componentWillMount(){
        this.setState({
            currentMarque: this.props.currentMarque
        });
    }
    
    handleChange(e){
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState(prevState => ({
            currentMarque: {
                ...prevState.currentMarque,
                [name]: value
            }
        }))
    }

    backToView(e){
        if(e) e.preventDefault();
        this.props.backToView();
    }

    render(){

        const currentMarque = this.state.currentMarque;

        return(
            <div>
                {currentMarque && currentMarque._id ? (
                    <Mutation mutation={UPDATE_MARQUE}>
                        {(updateMarque, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                updateMarque({ variables: { 
                                    _id: currentMarque._id,
                                    marque: {
                                        marque: currentMarque.marque,
                                        color: currentMarque.color
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Marque</label>
                                        <input placeholder="Marque" className={styles.input} value={currentMarque.marque != null ? currentMarque.marque : ""} name="marque" onChange={this.handleChange.bind(this)} type="text" />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Couleur</label>
                                        <input placeholder="Couleur" className={styles.input} value={currentMarque.color != null ? currentMarque.color : ""} name="color" onChange={this.handleChange.bind(this)} type="text" />
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
                    <Mutation mutation={ADD_MARQUE}
                        update={(cache, { data: { addMarque } }) => {
                            const { marques } = cache.readQuery({ query: MARQUES });
                            cache.writeQuery({
                            query: MARQUES,
                            data: { marques: marques.concat([addMarque]) }
                            });
                        }}
                        >
                        {(addMarque, { data }) => (
                            <form
                            onSubmit={e => {
                                e.preventDefault();
                                addMarque({ variables: { 
                                    marque: {
                                        marque: currentMarque.marque,
                                        color: currentMarque.color
                                    }
                                }
                                });
                                this.backToView();
                            }}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <label>Marque</label>
                                        <input placeholder="Marque" className={styles.input} name="marque" onChange={this.handleChange.bind(this)} type="text" />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Couleur</label>
                                        <input placeholder="Couleur" className={styles.input} name="color" onChange={this.handleChange.bind(this)} type="text" />
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