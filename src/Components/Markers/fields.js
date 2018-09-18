import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styles from '../../App.less';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { IoIosFlag, 
    IoIosCreate, 
    IoMdContact, 
    IoIosCheckmarkCircle, 
    IoMdBusiness, 
    IoMdContacts, 
    IoIosHome, 
    IoMdCompass,
    IoLogoEuro,
    IoMdStats
} from 'react-icons/io';

export default class MarkerFields extends Component {

    constructor(props){
        super(props);

        this.state = {
            changed: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currentMarker == undefined ||
           this.props.currentMarker && this.props.currentMarker._id != nextProps.currentMarker._id){
            this.setState({
                changed: false
            });
        }
    }

    toggleChanged(){
        this.setState({
            changed: true
        });
    }

    handleChange(e){
        this.props.handleChange(e);
        this.toggleChanged();      
    }

    handleDateChange(date, name){
        const e = {
            target: {
                name: name,
                value: date.format("DD/MM/YYYY")
            }
        }
        
        this.props.handleChange(e);
        this.toggleChanged(); 
    }

    handleTTCChange(e){
        this.props.handleChange(e);
        e = {
            target: {
                name: "montantht",
                value: e.target.value * 0.8
            }
        }
        this.props.handleChange(e);
        this.toggleChanged(); 
    }

    selectOptions(array,property){
        return array.map((elem) => {
            return (<option key={elem._id} value={elem._id}>{elem[property]}</option>);
        });
    }

    render(){

        const currentMarker = this.props.currentMarker;
        const agences = this.props.data.agences ? this.props.data.agences : [];
        const avancements = this.props.data.avancements ? this.props.data.avancements : [];
        const commerciaux = this.props.data.commerciaux ? this.props.data.commerciaux : [];
        const conducteurs = this.props.data.conducteurs ? this.props.data.conducteurs : [];
        const marques = this.props.data.marques ? this.props.data.marques : [];

//<input placeholder="Signature" className={styles.input} value={currentMarker != null ? currentMarker.signature : ""} name="signature" onChange={this.handleChange.bind(this)} type="text" />

        return(
            <div className={!this.state.changed ? styles.fields : [styles.fields,styles.changed].join(' ')}>
                <div className={styles.field}>
                    <p className={styles.label}>Position</p>
                    <input placeholder="Lat" className={[styles.input,styles.lat].join(' ')} value={currentMarker != null ? currentMarker.lat : ""} name="lat" onChange={this.handleChange.bind(this)} type="text" />
                    <input placeholder="Lng" className={[styles.input,styles.lng].join(' ')} value={currentMarker != null ? currentMarker.lng : ""} name="lng" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Signature</p>
                    <div className={styles.datetimepicker}>
                        <DatePicker selected={currentMarker != null && currentMarker.signature ? moment(currentMarker.signature, 'DD-MM-YYYY') : null} dateFormat="DD/MM/YYYY" placeholderText="Signature" onChange={(e) => {this.handleDateChange(e,"signature")}}></DatePicker>
                    </div>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Confirmation</p>
                    <div className={styles.datetimepicker}>
                        <DatePicker selected={currentMarker != null && currentMarker.confirmation ? moment(currentMarker.confirmation, 'DD-MM-YYYY') : null} dateFormat="DD/MM/YYYY" placeholderText="Signature" onChange={(e) => {this.handleDateChange(e,"confirmation")}}></DatePicker>
                    </div>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Agence</p>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.agence : ""} name="agence" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Agence</option>
                        {this.selectOptions(agences,"agence")}
                    </select>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Commercial</p>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.commercial : ""} name="commercial" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Commercial</option>
                        {this.selectOptions(commerciaux,"commercial")}
                    </select>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Marque</p>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.marque : ""} name="marque" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Marque</option>
                        {this.selectOptions(marques,"marque")}
                    </select>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Client</p>
                    <input placeholder="Client" className={styles.input} value={currentMarker != null ? currentMarker.client : ""} name="client" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Lieu</p>
                    <input placeholder="Lieu" className={styles.input} value={currentMarker != null ? currentMarker.lieu : ""} name="lieu" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Montant TTC</p>
                    <input placeholder="Montantttc" className={styles.input} value={currentMarker != null ? currentMarker.montantttc : ""} name="montantttc" onChange={this.handleTTCChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Montant HT</p>
                    <input placeholder="Montantht" className={styles.input} value={currentMarker != null ? currentMarker.montantht : ""} name="montantht" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Conducteur</p>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.conducteur : ""} name="conducteur" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Conducteur</option>
                        {this.selectOptions(conducteurs,"conducteur")}
                    </select>
                </div>
                <div className={styles.field}>
                    <p className={styles.label}>Avancement</p>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.avancement : ""} name="avancement" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Avancement</option>
                        {this.selectOptions(avancements,"avancement")}
                    </select>
                </div>
                <div className={!this.state.changed ? styles.buttons : [styles.buttons, styles.active].join(' ')}>
                    <button type="submit" className={[styles.button, styles.valid].join(' ')}>Sauvegarder</button>
                </div>
            </div>
        )
    }

}