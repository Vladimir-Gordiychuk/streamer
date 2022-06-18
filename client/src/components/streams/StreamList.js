import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

const StreamList = (props) => {

    useEffect(() => {
        props.fetchStreams();
    }, []);

    const renderButtons = (stream) => {
        if (stream.userId !== props.userId) {
            return null;
        }
        return (
            <div className="right floated content">
                <Link to={`/streams/edit/${stream.id}`}
                    className="ui button primary">
                    Edit
                </Link>
                <Link to={`/streams/delete/${stream.id}`}
                    className="ui button negative">
                    Delete
                </Link>
            </div>
        );
    }

    const renderedStreams = props.streams.map((stream) => (
        <div className="item" key={stream.id}>
            {renderButtons(stream)}
            <i className="large middle aligned icon camera" />
            <div className="content">
                {stream.title}
                <div className="description">
                    {stream.description}
                </div>
            </div>
        </div>
        ));
    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {renderedStreams}
            </div>
        </div>
    );
};

const mapStateToProps = ({ streams, auth }) => ({
    streams: Object.values(streams),
    userId: auth.id
});

export default connect(mapStateToProps, {
    fetchStreams
})(StreamList);