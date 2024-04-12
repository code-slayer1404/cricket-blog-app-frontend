import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addComment, getCommentsByPost } from '../services/CommentService';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Comment from './Comment';

const CommentBox = ({ postId }) => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');


    function loadComments(arg) {
        getCommentsByPost(arg, 1)
            .then(data => {
                setComments(data.content);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }

    useEffect(() => {
        loadComments(postId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        addComment(Number(postId), { content: newComment })
            .then(data => {
                setComments([...comments, data]);
                setNewComment('');
                // loadPosts(postId);
            }).catch(error => {
                console.error('Error adding comment:', error);
            });
    }


    return (
        <div>
            <h3>Comments</h3>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} loadComments={loadComments} />
            ))}

            <Form onSubmit={handleCommentSubmit}>
                <FormGroup>
                    <Label for="newComment">Add a comment:</Label>
                    <Input type="textarea" name="comment" id="newComment" value={newComment} onChange={handleCommentChange} />
                </FormGroup>
                <Button color='success' type="submit">Submit</Button>
            </Form>
        </div>
    );
};

CommentBox.propTypes = {
    postId: PropTypes.string,
};

export default CommentBox;


