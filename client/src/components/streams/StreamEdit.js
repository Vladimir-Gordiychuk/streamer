import { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchStream } from '../../actions';

const StreamEdit = (props) => {

    useEffect(() => {
        if (!props.stream && props.match.params.id) {
            props.fetchStream(props.match.params.id);
        }
    }, []);

    if (!props.stream) {
        return <div>Specified stream not found!</div>
    }
    return <div>Edit '{props.stream.title}'</div>;
};

const mapStateToProps = ({ streams }, ownProps) => ({
        stream: streams[ownProps.match.params.id]
});

export default connect(mapStateToProps, {
    fetchStream
})(StreamEdit);