import { useState } from "react";
import PropTypes from 'prop-types';
import { deleteComment, updateComment } from "../services/CommentService";
import { Button, Card, CardBody, CardFooter, Input } from "reactstrap";
import { getUserDetails, isLogged } from "../auth/loginHelper";

export default function Comment({ comment, loadComments }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.content);

    const handleEditChange = (e) => {
        setEditedComment(e.target.value);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateComment(comment.post.id, comment.id, { content: editedComment })
            .then((data) => {
                console.log(data);
                setIsEditing(false);
                loadComments(comment.post.id);
            })
            .catch((error) => {
                console.error("Error updating comment:", error);
            });
    }



    function handleDelete(commentId) {
        console.log(commentId);
        deleteComment(comment.post.id, commentId)
            .then((data) => {
                console.log(data);
                // add something to reload comment box  
                loadComments(comment.post.id);
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
            });

    }

    function renderUpdateAndDeleteButtons() {
        if (isLogged() && comment.user.id == getUserDetails().id) {
            return (
                <CardFooter className="text-center">
                    <Button color="primary" className="me-3" onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button color="danger" onClick={() => handleDelete(comment.id)}>Delete</Button>
                </CardFooter>
            )
        }
    }


    const myStyle = { marginRight: "10px" };



    return (
        <Card className="mb-3">
            {isEditing ? (
                <div key={comment.id}>
                    <form onSubmit={handleEditSubmit}>
                        <CardBody>
                            <Input type="text" value={editedComment} onChange={handleEditChange} />
                        </CardBody>
                        <CardFooter className="text-center">
                            <Button color="success" type="submit" style={myStyle}>Save</Button>
                            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                        </CardFooter>
                    </form>
                </div>
            ) : (
                <div key={comment.id}>
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <h5>{comment.user.name}</h5>
                            <p>{new Date(comment.date).toLocaleString("en-GB")}</p>
                        </div>
                        <p>{comment.content}</p>
                    </CardBody>
                    {
                        renderUpdateAndDeleteButtons()
                    }

                </div>
            )}
        </Card>
    );

}

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.number
        }),
        post: PropTypes.shape({
            id: PropTypes.number
        }),
        content: PropTypes.string,
        date: PropTypes.string
    }),
    loadComments: PropTypes.func
}