import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {

    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (!this.props.stream && id) {
            this.props.fetchStream(id);
        }
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream)
            return;

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.stream.id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    render() {
        if (!this.props.stream) {
            return <div>Stream not found.</div>;
        }

        const { title, description } = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef}
                    style={{ width: '100%' }}
                    controls
                />
                <h3>{title}</h3>
                {description}
            </div>
            );
    }

}

const mapStateToProps = ({ streams }, ownProps) => ({
    stream : streams[ownProps.match.params.id]
});

export default connect(mapStateToProps, {
    fetchStream
})(StreamShow);