import React, {
  useContext, useEffect, useState, useMemo,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import LinkItem from './LinkItem';
import { doc, getDoc, updateDoc, DocumentData } from 'firebase/firestore';

interface CommentData {
  postedBy: {
    id: string;
    name: string;
  };
  created: number;
  text: string;
}

interface LinkData {
    id: string;
    url: string;
    description: string;
    created: number;
    voteCount: number;
    postedBy: {
        id: string;
        name: string;
    };
    comments: CommentData[];
    votes: any[];
}

const LinkDetail: React.FC = () => {
  const option: Intl.DateTimeFormatOptions = {
    hour: 'numeric', dayPeriod: 'short', weekday: 'long', month: 'numeric', day: 'numeric',
  };
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', option);
  const context = useContext(FirebaseContext);
  const [link, setLink] = useState<LinkData | null>(null);
  const [commentText, setCommentText] = useState('');
  const { linkId } = useParams<{ linkId: string }>();
  const navigate = useNavigate();

  if (!context) {
    return null;
  }
  const { firebase, user } = context;

  const linkRef = useMemo(() => doc(firebase.db, 'links', linkId as string), [firebase.db, linkId]);

  useEffect(() => {
    getDoc(linkRef).then((docSnap) => {
        if (docSnap.exists()) {
            setLink({ id: docSnap.id, ...docSnap.data() } as LinkData);
        }
    }).catch((err) => console.error('Failed to get link', err));
  }, [firebase.db, linkId, linkRef]);

  async function handleAddComment() {
    if (!user) {
      navigate('/login');
    } else {
        const docSnap = await getDoc(linkRef);
        if (docSnap.exists()) {
          const previousComments = docSnap.data().comments as CommentData[];
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText,
          };
          const updatedComments = [
            ...previousComments,
            comment,
          ];
          await updateDoc(linkRef, { comments: updatedComments });
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
      <LinkItem showCount={false} link={link} />
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
