import React from 'react';

class GoogleAuth extends React.Component {

    state = {
        isSignedIn : null
    };

    componentDidMount() {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                clientId: '320618319760-s10oapnab7magb8quu8p6vf7bq3c7h9e.apps.googleusercontent.com',
                plugin_name: "Streamer-VG"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get()
                });
                this.auth.isSignedIn.listen(this.signInChanged);
            });
        });
    }

    signInChanged = (isSignedIn) => {
        this.setState({
            isSignedIn: isSignedIn
        });
    }

    signIn = () => {
        this.auth.signIn();
    };

    signOut = () => {
        this.auth.signOut();
    };

    render() {
        if (this.state.isSignedIn === true) {
            return (
                <button className="ui red google button"
                    onClick={this.signOut}>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }
        if (this.state.isSignedIn === false) {

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

export default GoogleAuth;