import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {

    componentDidMount() {
        if (!this.props.stream && this.props.match.params.id) {
            this.props.fetchStream(this.props.match.params.id);
        }
    }

    render() {
        if (!this.props.stream) {
            return <div>Stream not found.</div>;
        }

        const { title, description } = this.props.stream;

        return (
            <div>
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