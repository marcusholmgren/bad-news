import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getDomain} from "../../utils";
import {FirebaseContext} from "../../firebase";
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import {LinkData} from "./types";


interface LinkItemProps {
    link: LinkData;
    index: number;
    showCount: boolean;
}

function LinkItem({link, index, showCount}: LinkItemProps) {
    const option: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        dayPeriod: "short",
        weekday: 'long',
        month: 'numeric',
        day: 'numeric'
    };
    const dateTimeFormat = new Intl.DateTimeFormat("en-US", option);
    const context = useContext(FirebaseContext);
    const navigate = useNavigate();

    if (!context) {
        return null;
    }

    const {firebase, user} = context;

    function handleVote() {
        if (!user) {
            navigate("/login");
        } else {
            const voteRef = doc(firebase.db, 'links', link.id);
            getDoc(voteRef).then(docSnap => {
                if (docSnap.exists()) {
                    const previousVotes = docSnap.data().votes;
                    const vote = {votedBy: {id: user.uid, name: user.displayName}};
                    const updatedVotes = [...previousVotes, vote];
                    const voteCount = updatedVotes.length;
                    updateDoc(voteRef, {votes: updatedVotes, voteCount})
                        .catch(err => console.error('[LinkItem] Failed to update votes: ', err));
                }
            })
        }
    }

    function handleDeleteLink() {
        const linkRef = doc(firebase.db, 'links', link.id);
        deleteDoc(linkRef).then(() => {
            console.log(`Document with ID ${link.id} deleted`);
        }).catch(err => {
            console.error(`Error deleting document with ${link.id}`, {err});
        })
    }

    const postedByAuthUser = user && user.uid === link.postedBy.id;

    return (
        <div className="flex items-start mt2">
            <div className="flex items-center">
                {showCount && <span className="gray">{index}</span>}
                <div className="vote-button" onClick={handleVote}>
                    &#x25B2;
                </div>
                <div className="ml1">
                    <div>
                        <a href={link.url} className="black no-underline">{link.description}</a>
                        <span className="link">({getDomain(link.url)})</span>
                    </div>
                    <div className="f6 lh-copy gray">
                        {link.voteCount} votes by {link.postedBy.name} {dateTimeFormat.format(link.created)}
                        {" | "}
                        <Link to={`/link/${link.id}`}>
                            {link.comments.length > 0
                                ? `${link.comments.length} comments`
                                : "discuss"
                            }
                        </Link>
                        {postedByAuthUser && (
                            <>
                                {" | "}
                                <span className="delete-button" onClick={handleDeleteLink}>
                              delete
                          </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkItem;
