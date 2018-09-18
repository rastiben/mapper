import React, { Component } from 'react';
import styles from '../../App.less';
import { UPLOAD_LOGO } from '../query/admin.js';
import { client } from '../../index.js';
import { Mutation } from 'react-apollo';

export default class Configuration extends Component {

    constructor(props){
        super(props)
        this.state = {
          file: require('../../assets/logo.png')
        }
      }

      handleChange(file) {
        this.setState({
          file: URL.createObjectURL(file)
        })
      }

      render() {
        return (
          <div className={styles.configuration}>
            <div className={styles.block}>
                <h3>Logo de l'entreprise</h3>
                <Mutation mutation={UPLOAD_LOGO}>
                {mutate => (
                    <div>
                    <img src={this.state.file}/>
                        <input type="file" id="selectedFile" 
                        onChange={({
                        target: {
                            files: [file]
                        }
                        }) => {
                            mutate({ variables: { file } });
                            this.handleChange(file);
                        }}
                        style={{"display": "none"}} />
                        <input className={styles.upload} type="button" value="Browse..." onClick={() => document.getElementById('selectedFile').click()} />
                    </div>
                )}
                </Mutation>
            </div>
          </div>
        );
      }

}