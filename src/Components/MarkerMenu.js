import React, { Component } from 'react';
import styles from '../App.less';
import { Mutation } from 'react-apollo';
import { MARKERS, UPDATE_MARKER, ADD_MARKER } from './query/markers.js';
import { IoIosArrowDropleft } from 'react-icons/io';
import MarkerFields from './Markers/fields.js';

export default class MarkerMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentMarker: undefined
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentMarker != undefined){
            if(this.state.currentMarker == undefined || nextProps.currentMarker._id != this.state.currentMarker._id){
                this.setState({
                    currentMarker: nextProps.currentMarker
                });
            }
        } else if(this.state.currentMarker != undefined){
            this.setState({
                currentMarker: undefined
            });
        }
    }

    hideMarkerMenu(e){
        if(e) e.preventDefault();
        this.props.hideMarkerMenu();
    }

    handleChange(e){

        console.log(e);

        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState(prevState => ({
            currentMarker: {
                ...prevState.currentMarker,
                [name]: value
            }
        }))
    }

    render(){

        const currentMarker = this.state.currentMarker;

        let show = [styles.MarkerMenu];

        if(currentMarker != undefined)
            show.push(styles.active);

        show = show.join(' ');

        return(
            <div className={show}>
                <div className={styles.title}>
                    <IoIosArrowDropleft onClick={this.hideMarkerMenu.bind(this)} className={styles.arrow}></IoIosArrowDropleft>
                    <div className={styles.client}>{currentMarker ? currentMarker.client : ""}</div>
                    <div className={styles.lieu}>{currentMarker ? currentMarker.lieu : ""}</div>
                </div>
                {currentMarker && currentMarker._id ? (
                <Mutation mutation={UPDATE_MARKER}>
                    {(updateMarker, { data }) => (
                        <form
                        onSubmit={e => {
                            e.preventDefault();
                            updateMarker({ variables: { 
                                _id: currentMarker._id,
                                marker: {
                                    lat: parseFloat(currentMarker.lat),
                                    lng: parseFloat(currentMarker.lng),
                                    signature: currentMarker.signature,
                                    confirmation: currentMarker.confirmation,
                                    agence: currentMarker.agence,
                                    commercial: currentMarker.commercial,
                                    marque: currentMarker.marque,
                                    client: currentMarker.client,
                                    lieu: currentMarker.lieu,
                                    montantttc: parseFloat(currentMarker.montantttc),
                                    montantht: parseFloat(currentMarker.montantht),
                                    conducteur: currentMarker.conducteur,
                                    avancement: currentMarker.avancement
                                }
                             }
                            });
                            this.hideMarkerMenu();
                          }}>
                            <MarkerFields data={this.props.data} handleChange={this.handleChange.bind(this)} currentMarker={currentMarker}></MarkerFields>
                        </form>
                    )}
                </Mutation> ) : (
                    <Mutation mutation={ADD_MARKER}
                    update={(cache, { data: { addMarker } }) => {
                        const { markers } = cache.readQuery({ query: MARKERS });
                        cache.writeQuery({
                          query: MARKERS,
                          data: { markers: markers.concat([addMarker]) }
                        });
                      }}
                    >
                    {(addMarker, { data }) => (
                        <form
                        onSubmit={e => {
                            e.preventDefault();
                            addMarker({ variables: { 
                                marker: {
                                    lat: parseFloat(currentMarker.lat),
                                    lng: parseFloat(currentMarker.lng),
                                    signature: currentMarker.signature,
                                    confirmation: currentMarker.confirmation,
                                    agence: currentMarker.agence,
                                    commercial: currentMarker.commercial,
                                    marque: currentMarker.marque,
                                    client: currentMarker.client,
                                    lieu: currentMarker.lieu,
                                    montantttc: parseFloat(currentMarker.montantttc),
                                    montantht: parseFloat(currentMarker.montantht),
                                    conducteur: currentMarker.conducteur,
                                    avancement: currentMarker.avancement
                                }
                             }
                            });
                            this.hideMarkerMenu();
                          }}>
                            <MarkerFields data={this.props.data} handleChange={this.handleChange.bind(this)} currentMarker={currentMarker}></MarkerFields>
                        </form>
                    )}
                </Mutation>
                )}
            </div>
        );

    }

}