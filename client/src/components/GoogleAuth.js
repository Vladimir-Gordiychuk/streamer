import React from 'react';

import { connect } from 'react-redux';
import { setSignIn } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                clientId: '320618319760-s10oapnab7magb8quu8p6vf7bq3c7h9e.apps.googleusercontent.com',
                plugin_name: "Streamer-VG"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.signInChanged(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.signInChanged);
            });
        });
    }

    signInChanged = (isSignedIn) => {
        const userId = isSignedIn ?
            this.auth.currentUser.get().getId() :
            null;
        this.props.setSignIn(isSignedIn, userId);
    }

    signIn = () => {
        this.auth.signIn();
    };

    signOut = () => {
        this.auth.signOut();
    };

    render() {
        if (this.props.isSignedIn === true) {
            return (
                <button className="ui red google button"
                    onClick={this.signOut}>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }
        if (this.props.isSignedIn === false) {

            return (
                <button className="ui red google button"
                    onClick={this.signIn}>
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
                );
        }
        return null;
    }
}

const mapStateToProps = ({ auth }) => ({
    isSignedIn: auth.isSignedIn
});

export default connect(mapStateToProps, {
    setSignIn
})(GoogleAuth);