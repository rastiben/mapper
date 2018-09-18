import React, { Component } from 'react';
import styles from './App.less';
import { Query, Mutation } from 'react-apollo';
import { CURRENT_USER, LOGIN } from './Components/query/users.js';
import Mapper from './Mapper.js'

class Login extends Component {

    render(){

        return(

            <Query query={CURRENT_USER}>
            {({ loading, error, data }) => {

                if(Object.keys(data).length > 0 && data.currentUser == null){
                        return(
                            <div className={styles.login}>
                                <div className={styles.container}>
                                    <div className={styles.content}>
                                        <div className={styles.logo} data-tilt>
                                            <img src={require('./assets/logo.png')} alt="IMG" />
                                        </div>
                                        <Mutation mutation={LOGIN}
                                        update={(cache, { data: { login } }) => {
                                            const { currentUser } = cache.readQuery({ query: CURRENT_USER });
                                            cache.writeQuery({
                                                query: CURRENT_USER,
                                                data: { currentUser: login }
                                            });
                                        }}>
                                            {(login, { data }) => (
                                                <form
                                                className={styles.form}
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    login({ variables: { 
                                                            username: this.username.value,
                                                            password: this.password.value
                                                        }
                                                    });
                                                }}>
                                                    <span className={styles.title}>
                                                        Se connecter
                                                    </span>

                                                    <input ref={node => this.username = node} className={styles.input} type="text" name="email" placeholder="Identifiant" />
                                                    <input ref={node => this.password = node} className={styles.input} type="password" name="pass" placeholder="Mot de passe" />
                                                    
                                                    <button className={styles.button}>CONNEXION</button>
                                                </form>
                                            )}
                                        </Mutation>
                                    </div>
                                </div>
                            </div>
                        );
                    } else if(Object.keys(data).length > 0) {
                        return(
                            <Mapper></Mapper>
                        );
                    } else {
                        return(
                            <div></div>
                        );
                    }
                }
            }
            </Query>
        )

    }

}

export default Login;

/*<div className={styles.login}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.logo} data-tilt>
                            <img src={require('./assets/logo.png')} alt="IMG" />
                        </div>

                        <form className={styles.form}>
                            <span className={styles.title}>
                                Se connecter
                            </span>

                            <input className={styles.input} type="text" name="email" placeholder="Identifiant" />
                            <input className={styles.input} type="password" name="pass" placeholder="Mot de passe" />
                               
                            <button className={styles.button}>CONNEXION</button>
                        </form>
                    </div>
                </div>
            </div>*/