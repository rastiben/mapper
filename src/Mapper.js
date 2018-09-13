import React, { Component } from 'react';
import styles from './App.less';
import { Map, Marker, Popup, TileLayer, ImageOverlay } from 'react-leaflet'
import { Query, Mutation } from 'react-apollo';
import { IoIosHome } from 'react-icons/io';
import gql from 'graphql-tag';
import MarkerMenu from './Components/MarkerMenu.js';
import { MARKERS } from './Components/query/markers.js';
import { CURRENT_USER, LOGOUT } from './Components/query/users.js';
import * as easybutton from 'leaflet-easybutton'; 
import Admin from './Components/Admin.js';
import { client } from './index.js';

var Leaflet = require('leaflet');

var CustomIcon = Leaflet.Icon.extend({
  options: {
    iconSize:     [20, 20],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
  }
});

class Mapper extends Component {

  constructor() {
    super()
    this.state = {
      popup: undefined,
      currentMarker : undefined,
      admin: false,
      dispo: 0
    }
  }

  componentDidMount() {
    this.manageControls();
  }

  componentDidUpdate() {
    this.manageControls();
  }

  manageControls(){
    const self = this;

    if(this.map != undefined && !this.state.actionsExist){
      const map = this.map.leafletElement;

      if(map._controlCorners.topright.childNodes.length == 0){

        /*ADMIN BUTTON*/
        Leaflet.easyButton({
          position: 'topright',
          states:[{                 // specify different icons and responses for your button
            onClick: function(button, map){
              self.setState({
                admin: true
              });
            },
            icon: '<span>&#9776;</span>'
          }] 
        }).addTo(map);

        /*LOGOUT*/
        Leaflet.easyButton({
          position: 'topright',
          states:[{                 // specify different icons and responses for your button
            onClick: function(button, map){
              client.mutate({
                mutation: LOGOUT,
                variables: {}
              }).then(result => { 
                client.writeQuery({
                    query: CURRENT_USER,
                    data: { currentUser: null }
                });
              });
            },
            icon: '<span>&#10142;</span>'
          }] 
        }).addTo(map);


        /*SWITCH*/
        var button = Leaflet.easyButton({
          position: 'topleft',
          states:[{                 // specify different icons and responses for your button
            onClick: function(button, map){
              self.manageControlsColor(map,button,0);
            },
            icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" attr="[object Object]" style="margin-top: 7px;" size="15" height="15" width="15"><path d="M258.5 104.1c-1.5-1.2-3.5-1.2-5 0l-156 124.8c-.9.8-1.5 1.9-1.5 3.1v230c0 1.1.9 2 2 2h108c1.1 0 2-.9 2-2V322c0-1.1.9-2 2-2h92c1.1 0 2 .9 2 2v140c0 1.1.9 2 2 2h108c1.1 0 2-.9 2-2V232c0-1.2-.6-2.4-1.5-3.1l-156-124.8z"></path><path d="M458.7 204.2l-189-151.4C265.9 49.7 261 48 256 48s-9.9 1.7-13.7 4.8L160 119.7V77.5c0-1.1-.9-2-2-2H98c-1.1 0-2 .9-2 2v92.2l-42.7 35.1c-3.1 2.5-5.1 6.2-5.3 10.2-.2 4 1.3 7.9 4.1 10.7 2.6 2.6 6.1 4.1 9.9 4.1 3.2 0 6.3-1.1 8.8-3.1l183.9-148c.5-.4.9-.4 1.3-.4s.8.1 1.3.4l183.9 147.4c2.5 2 5.6 3.1 8.8 3.1 3.7 0 7.2-1.4 9.9-4.1 2.9-2.8 4.4-6.7 4.2-10.7-.3-4-2.2-7.7-5.4-10.2z"></path></svg>'
          }] 
        }).addTo(map);

        Leaflet.easyButton({
          position: 'topleft',
          states:[{                 // specify different icons and responses for your button
            onClick: function(button, map){
              self.manageControlsColor(map,button,1);
            },
            icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" attr="[object Object]" style="margin-top: 7px;" size="15" height="15" width="15"><path d="M277.6 246.9c-1.1-2-2.5-3.9-4.1-5.5l-18.4-18.2c-1.9-1.9-4.1-3.5-6.6-4.6-8.2-3.6-17.4-1.7-23.4 4.3-6.4 6.3-18.1 17.8-39.2 38.7-40.4 40-98.1 89.6-132 118.2-7.2 6.1-7.7 17-1.1 23.7L92 443.2c6.7 6.7 17.6 6.3 23.8-.9 29.4-34.6 79.5-92.3 119.4-131.8 20.5-20.2 32-31.8 38.5-38.2 6.5-6.6 8.3-16.7 3.9-25.4zM462.4 218.1l-34.5-34.2c-1.1-1.1-2.5-1.6-4-1.6-1.4 0-2.9.5-4 1.6-2.5 2.5-6.1 3.8-9.6 3.3-4.5-.5-9.3-1.9-12.4-4.9-7-6.9 1.1-20.5-5.1-29.2-6.2-8.7-16.1-19.8-23.2-26.9-7.1-7-35-33.7-82-52.9-16.6-6.8-32.8-9.3-47.3-9.3-26.5 0-47.4 8.5-54.8 15.3-5.5 5.1-11.2 14.1-3.1 14.1.7 0 1.5-.1 2.4-.2 4.5-.7 13.3-1.5 23.4-1.5 15.7 0 34.5 2.1 44.6 10.1 16.3 13.1 29.8 30.6 30.9 53.2.8 16.8-3.4 28.2-18.7 45.5-2.8 3.2-2.6 8 .4 10.9l19.2 19.2c3.1 3.1 8.1 3.1 11.2.1 14-13.6 22.1-20.2 31.3-22.7 4-1.1 8.4-1.6 12.8-1.6 9.7 0 19.2 2.2 23.6 4.6 1.1.6 2.1 1.4 3.1 2.4 6.5 6.6 6.1 17.4-.5 23.9l-2 1.9c-2.2 2.2-2.2 5.7 0 7.9l34.5 34.2c1.1 1.1 2.5 1.6 4 1.6 1.4 0 2.9-.5 4-1.6l55.8-55.2c2.1-2.3 2.1-5.8 0-8z"/></svg>'
          }] 
        }).addTo(map);

        Leaflet.easyButton({
          position: 'topleft',
          states:[{                 // specify different icons and responses for your button
            onClick: function(button, map){
              self.manageControlsColor(map,button,2);
            },
            icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" attr="[object Object]" style="margin-top: 7px;" size="15" height="15" width="15"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"></path></svg>'
          }] 
        }).addTo(map);

        self.manageControlsColor(map,button,-1);

      }
    }
  }

  manageControlsColor(map,button,dispo){
    map._controlCorners.topleft.childNodes.forEach(element => {
      element.childNodes[0].style.background = "white";
    });

    button.button.style.background = "lightgreen";

    if(dispo != -1){
      this.setState({
        dispo: dispo
      });
    }
  }

  displayPopup (event) {
    //latlng
    const latlng = event.latlng;

    this.setState({
      popup: [latlng.lat,latlng.lng]
    });
  }

  hidePopup (event) {
    this.setState({
      popup: undefined
    });
  }

  showMarkerMenu (marker,event) {
    this.setState({
      currentMarker: marker
    });
  }

  hideMarkerMenu(){
    this.setState({
      currentMarker: undefined
    });
  }

  newMarker(){
    this.setState({
      currentMarker: {
        lat: this.state.popup[0],
        lng: this.state.popup[1],
        signature: "",
        confirmation: "",
        agence: "",
        commerciale: "",
        marque: "",
        client: "",
        lieu: "",
        montantttc: 0,
        montantht: 0,
        conducteur: "",
        avancement: ""
      },
      popup: undefined
    });
  }

  showMap(){
    this.setState({
      admin: false
    });
  }

  createIcon(data,marker){

    var marque = data.marques.filter(marque => marque._id == marker.marque);
    var avancement = data.avancements.filter(avancement => avancement._id == marker.avancement);

    var color = marque.length > 0 ? marque[0].color : "black";
    var avancement = avancement.length ? avancement[0].avancement : "";

    var svgrect = '<svg baseProfile="basic" xmlns="http://www.w3.org/2000/svg" width="20" fill="'+color+'" height="20" viewBox="0 0 48 48"><path d="M24 0c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z"></path><text x="24" y="20" text-anchor="middle" alignment-baseline="central" font-size="18px" font-weight="700" fill="black">'+avancement+'</text></svg>';
    var url = encodeURI("data:image/svg+xml," + svgrect).replace('#','%23');

    return new CustomIcon({iconUrl: url})
  }

  render() {
    
    const bounds = [[-145.96875, 0], [-0, 120.28125]];

    return (

      <div className={styles.maximizeContainer}>

        { !this.state.admin ? (

          <Query query={MARKERS}>
            {({ loading, error, data }) => {

            var markers = [];

            if(data != undefined && Object.keys(data).length > 0){

              markers = data.markers.map((marker) => {

                const position = [marker.lat,marker.lng];
                
                if(marker.dispo == this.state.dispo){

                  const icon = this.createIcon(data,marker);

                  return (
                    <Marker key={marker._id} icon={icon} onClick={this.showMarkerMenu.bind(this,marker)} position={position}>
                    </Marker>
                  );
                }
              });

            }

            var popup = this.state.popup;

            return(

              <div className={styles.maximizeContainer}>

                <MarkerMenu markers={this.MARKERS} data={data} hideMarkerMenu={this.hideMarkerMenu.bind(this)} currentMarker={this.state.currentMarker}></MarkerMenu>

                <Map ref={map => this.map = map} className={styles.leafletContainer} onClick={this.hidePopup.bind(this)} onContextMenu={this.displayPopup.bind(this)} crs={ Leaflet.CRS.Simple } bounds={ bounds }>
                  <ImageOverlay
                      url={require('./assets/map.jpg')}
                      bounds={bounds}
                    />
                  {markers}
                  {(popup &&
                    <Popup onClose={this.hidePopup.bind(this)} position={this.state.popup}>
                      <ul className={styles.contextMenu}>
                        <li onClick={this.newMarker.bind(this)}>Nouveau marker</li>
                      </ul>
                    </Popup>
                  )}
                </Map>
              </div>

            )

          }}
          </Query>

        ) : (

          <Admin showMap={this.showMap.bind(this)}></Admin>

        )}

      </div>
    );
  }

}

export default Mapper;
