import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { addComment, getCommentsByPost } from '@/services/CommentService';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Comment from '@/components/Comment';
import { useAuth } from '../hooks/auth';
import { CommentReadDTO } from '../types/dto/CommentDTO';

export default function CommentBox({ postId }:{postId:number}){

    const {loginStatus} = useAuth();
    const [comments, setComments] = useState<CommentReadDTO[]>([]);
    const [newComment, setNewComment] = useState<string>('');


    function loadComments(arg:number) {
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


    const handleCommentChange = (e : ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    }

    const handleCommentSubmit = (e : FormEvent) => {
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

            {loginStatus && (
                <Form onSubmit={handleCommentSubmit}>
                    <FormGroup>
                        <Label for="newComment">Add a comment:</Label>
                        <Input type="textarea" name="comment" id="newComment" value={newComment} onChange={handleCommentChange} required />
                    </FormGroup>
                    <Button color='success' type="submit">Submit</Button>
                </Form>
            )}
        </div>
    );
};
