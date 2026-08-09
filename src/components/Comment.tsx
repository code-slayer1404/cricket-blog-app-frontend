import { ChangeEvent, FormEvent, useState } from "react";
import PropTypes from 'prop-types';
import { deleteComment, updateComment } from "../services/CommentService";
import { Button, Card, CardBody, CardFooter, Input } from "reactstrap";
import { useAuth } from "../hooks/auth";
import { CommentReadDTO } from "../types/dto/CommentDTO";
interface CommentProps{
    comment : CommentReadDTO;
    loadComments : (arg:number)=>void;
}

export default function Comment({ comment, loadComments } : CommentProps) {
    const {loginStatus, loggedUser} = useAuth()
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.content);

    const handleEditChange = (e : ChangeEvent<HTMLInputElement>) => {
        setEditedComment(e.target.value);
    }

    const handleEditSubmit = (e : FormEvent) => {
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



    function handleDelete(commentId:number) {
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
        if(!loggedUser){
            throw new Error("cannot update comment! no user logged in!")
        }
        if (loginStatus && comment.user.id == loggedUser.id) {
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
