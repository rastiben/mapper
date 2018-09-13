import React, { Component } from 'react';
import styles from '../../App.less';

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

    handleChange(e){
        this.props.handleChange(e);
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

        return(
            <div className={styles.fields}>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoIosFlag></IoIosFlag></div>
                    <input placeholder="Lat" className={styles.input} value={currentMarker != null ? currentMarker.lat : ""} name="lat" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoIosFlag></IoIosFlag></div>
                    <input placeholder="Lng" className={styles.input} value={currentMarker != null ? currentMarker.lng : ""} name="lng" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoIosCreate></IoIosCreate></div>
                    <input placeholder="Signature" className={styles.input} value={currentMarker != null ? currentMarker.signature : ""} name="signature" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoIosCheckmarkCircle></IoIosCheckmarkCircle></div>
                    <input placeholder="Confirmation" className={styles.input} value={currentMarker != null ? currentMarker.confirmation : ""} name="confirmation" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoMdBusiness></IoMdBusiness></div>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.agence : ""} name="agence" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Agence</option>
                        {this.selectOptions(agences,"agence")}
                    </select>
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoMdContacts></IoMdContacts></div>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.commercial : ""} name="commercial" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Commercial</option>
                        {this.selectOptions(commerciaux,"commercial")}
                    </select>
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoIosHome></IoIosHome></div>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.marque : ""} name="marque" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Marque</option>
                        {this.selectOptions(marques,"marque")}
                    </select>
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoMdContacts></IoMdContacts></div>
                    <input placeholder="Client" className={styles.input} value={currentMarker != null ? currentMarker.client : ""} name="client" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoMdCompass></IoMdCompass></div>
                    <input placeholder="Lieu" className={styles.input} value={currentMarker != null ? currentMarker.lieu : ""} name="lieu" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoLogoEuro></IoLogoEuro></div>
                    <input placeholder="Montantttc" className={styles.input} value={currentMarker != null ? currentMarker.montantttc : ""} name="montantttc" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoLogoEuro></IoLogoEuro></div>
                    <input placeholder="Montantht" className={styles.input} value={currentMarker != null ? currentMarker.montantht : ""} name="montantht" onChange={this.handleChange.bind(this)} type="text" />
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoMdContacts></IoMdContacts></div>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.conducteur : ""} name="conducteur" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Conducteur</option>
                        {this.selectOptions(conducteurs,"conducteur")}
                    </select>
                </div>
                <div className={styles.field}>
                    <div className={styles.icon} style={{color: '#AA2F37'}}><IoMdStats></IoMdStats></div>
                    <select className={styles.select} value={currentMarker != null ? currentMarker.avancement : ""} name="avancement" onChange={this.handleChange.bind(this)} type="text">
                        <option value="">Avancement</option>
                        {this.selectOptions(avancements,"avancement")}
                    </select>
                </div>
            </div>
        )
    }

}