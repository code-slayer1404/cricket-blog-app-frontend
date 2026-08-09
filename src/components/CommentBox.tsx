import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { addComment, getCommentsByPost } from '@/services/CommentService';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Comment from '@/components/Comment';
import { useAuth } from '@/hooks/auth';
import { CommentReadDTO } from '@/types/dto/CommentDTO';

export default function CommentBox({ postId }: { postId: number }) {

    const { loginStatus } = useAuth();
    const [comments, setComments] = useState<CommentReadDTO[]>([]);
    const [newComment, setNewComment] = useState<string>('');


    async function loadComments(postId: number) {
        const result = await getCommentsByPost(postId, 1);
        if (result.ok) {
            const data = result.data;
            setComments(data.content)
        } else {
            console.log(result.error);
        }
    }

    useEffect(() => {
        loadComments(postId);
    }, [postId]);


    const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    }

    const handleCommentSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const result = await addComment(Number(postId), { content: newComment });

        if (result.ok) {
            const data = result.data;
            setComments([...comments, data])
            setNewComment('');
        } else {
            console.error('Error adding comment:', result.error);
        }
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
}
