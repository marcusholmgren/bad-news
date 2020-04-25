import React, {useContext, useEffect, useState, useMemo} from "react";
import {useParams, useLocation} from "react-router-dom";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";

function LinkDetail() {
    const option = {hour: "numeric", dayPeriod: "short", weekday: 'long', month: 'numeric', day: 'numeric'};
    const dateTimeFormat = new Intl.DateTimeFormat("en-US", option);
    const {firebase, user} = useContext(FirebaseContext);
    const [link, setLink] = useState(null);
    const [commentText, setCommentText] = useState('');
    const {linkId} = useParams();
    const location = useLocation();
    const linkRef = useMemo(() => firebase.db.collection('links').doc(linkId), [firebase.db, linkId]);

    useEffect(() => {
        linkRef.get().then(doc => {
            setLink({id: doc.id, ...doc.data()});
        }).catch(err => console.error('Failed to get link', err));
    }, [firebase.db, linkId, linkRef]);

    function handleAddComment() {
        if (!user) {
            location('/login');
        } else {
            linkRef.get().then(doc => {
                if (doc.exists) {
                    const previousComments = doc.data().comments;
                    const comment = {
                        postedBy: { id: user.uid, name: user.displayName },
                        created: Date.now(),
                        text: commentText
                    }
                    const updatedComments = [
                        ...previousComments,
                        comment
                    ];
                    linkRef.update({comments: updatedComments}).then(() => {
                        setLink(prev => ({
                            ...prev,
                            comments: updatedComments
                        }));
                        setCommentText('');
                    })
                }
            })
        }
    }

    return !link ? (
        <div>Loading...</div>
    ) : (
        <div>
            <LinkItem showCount={false} link={link}/>
            <textarea
                rows='6'
                cols='60'
                onChange={event => setCommentText(event.target.value)}
                value={commentText}
            />
            <button className="button" onClick={handleAddComment}>
                Add Comment
            </button>
            {link.comments.map((comment, index) => (
                <div key={index}>
                    <p className="comment-author">
                        {comment.postedBy.name} | {dateTimeFormat.format(comment.created)}
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
