import React, {
  useContext, useEffect, useState, useMemo,
} from 'react';
import { useParams, useNavigate } from 'react-router';
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {LinkData} from "./types";


function LinkDetail() {
    const option: Intl.DateTimeFormatOptions = {
        hour: 'numeric', dayPeriod: 'short', weekday: 'long', month: 'numeric', day: 'numeric',
    };
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', option);
    const context = useContext(FirebaseContext);
    const [link, setLink] = useState<LinkData | null>(null);
    const [commentText, setCommentText] = useState('');
    const {linkId} = useParams<{ linkId: string }>();
    const navigate = useNavigate();

    const linkRef = useMemo(() => {
        if (!context) return null;
        return doc(context.firebase.db, 'links', linkId as string);
    }, [context, linkId]);

    useEffect(() => {
        if (!linkRef) return;
        getDoc(linkRef).then((docSnap) => {
            if (docSnap.exists()) {
                setLink({id: docSnap.id, ...docSnap.data()} as LinkData);
            }
        }).catch((err) => console.error('Failed to get link', err));
    }, [linkRef]);

    if (!context) {
        return null;
    }
    const {user} = context;

    async function handleAddComment() {
        if (!user) {
            navigate('/login');
        } else {
            if (!linkRef) return;
            const docSnap = await getDoc(linkRef);
            if (docSnap.exists()) {
                const previousComments = docSnap.data().comments as CommentData[];
                const comment = {
                    postedBy: {id: user.uid, name: user.displayName},
                    created: Date.now(),
                    text: commentText,
                };
                const updatedComments = [
                    ...previousComments,
                    comment,
                ];
                await updateDoc(linkRef, {comments: updatedComments});
                setLink((prev) => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        comments: updatedComments,
                    }
                });
                setCommentText('');
            }
        }
    }

    return !link ? (
        <div>Loading...</div>
    ) : (
        <div>
            <LinkItem showCount={false} link={link}/>
            <textarea
                rows={6}
                cols={60}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setCommentText(event.target.value)}
                value={commentText}
            />
            <button className="button" onClick={handleAddComment}>
                Add Comment
            </button>
            {link.comments.map((comment, index) => (
                <div key={index}>
                    <p className="comment-author">
                        {comment.postedBy.name}
                        {' '}
                        |
                        {dateTimeFormat.format(comment.created)}
                    </p>
                    <p>
                        {comment.text}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default LinkDetail;
