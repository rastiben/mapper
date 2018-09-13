import React, { Component } from 'react';
import styles from '../App.less';
import Agences from './Agences/Agences';
import Commerciaux from './Commerciaux/Commerciaux.js';
import Marques from './Marques/Marques';
import Conducteurs from './Conducteurs/Conducteurs';
import Avancements from './Avancements/Avancements';
import Utilisateurs from './Utilisateurs.js';

export default class Admin extends Component {

    constructor(props){
        super(props);

        this.state = {
            page: "avancements"
        };
    }

    setPage(page,e){
        this.setState({
            page: page
        });
    }

    showMap(){
        this.props.showMap();
    }

    render(){
        return(
            <div className={styles.admin}>
                <div className={styles.title}>
                    <h3>Carte Interactive</h3>
                    <p>Administration</p>
                </div>
                <div className={styles.vMenu}>
                    <p onClick={this.showMap.bind(this)}>Carte</p>
                </div>
                <div className={styles.hMenu}>
                    <ul>
                        <li onClick={this.setPage.bind(this,"agences")} className={this.state.page == "agences" ? styles.active : ""}>Agences</li>
                        <li onClick={this.setPage.bind(this,"commerciaux")} className={this.state.page == "commerciaux" ? styles.active : ""}>Commerciaux</li>
                        <li onClick={this.setPage.bind(this,"marques")} className={this.state.page == "marques" ? styles.active : ""}>Marques</li>
                        <li onClick={this.setPage.bind(this,"conducteurs")} className={this.state.page == "conducteurs" ? styles.active : ""}>Conducteurs</li>
                        <li onClick={this.setPage.bind(this,"avancements")} className={this.state.page == "avancements" ? styles.active : ""}>Avancements</li>
                        <li onClick={this.setPage.bind(this,"utilisateurs")} className={this.state.page == "utilisateurs" ? styles.active : ""}>Utilisateurs</li>
                    </ul>
                </div>
                <div className={styles.content}>
                    {(this.state.page == "agences" && <Agences></Agences>)}
                    {(this.state.page == "commerciaux" && <Commerciaux></Commerciaux>)}
                    {(this.state.page == "marques" && <Marques></Marques>)}
                    {(this.state.page == "conducteurs" && <Conducteurs></Conducteurs>)}
                    {(this.state.page == "avancements" && <Avancements></Avancements>)}
                    {(this.state.page == "utilisateurs" && <Utilisateurs></Utilisateurs>)}
                </div>
            </div>
        )
    }

}