import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostShow extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.match.params.id);
    }

    clickDelete() {
        this.props.deletePost(this.props.match.params.id)
        .then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } =  this.props;

        if(!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button className="btn btn-danger pull-xs-right" onClick={this.clickDelete.bind(this)}>
                    Delete Post
                </button>
                <br />
                <br />
                <h3><strong>{post.title}</strong></h3>
                <h6><strong>Catagories:</strong> {post.categories}</h6>
                <br />
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);