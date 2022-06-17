import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Streamer
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    All Streams
                </Link>
                <Link to="/streams/new" className="item">
                    New Stream
                </Link>
                <div className="item">
                    <GoogleAuth />
                </div>
            </div>
    </div>);
};

export default Header;