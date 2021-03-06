import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getDomain} from "../../utils";
import {FirebaseContext} from "../../firebase";


function LinkItem({ link, index, showCount }) {
    const option = {hour: "numeric", dayPeriod: "short", weekday: 'long', month: 'numeric', day: 'numeric'};
    const dateTimeFormat = new Intl.DateTimeFormat("en-US", option);
    const { firebase, user } = useContext(FirebaseContext);
    const navigate = useNavigate();

    function handleVote() {
        if (!user) {
            navigate("/login");
        } else {
            const voteRef = firebase.db.collection('links').doc(link.id);
            voteRef.get().then(doc => {
                if (doc.exists) {
                    const previousVotes = doc.data().votes;
                    const vote = { votedBy: { id: user.uid, name: user.displayName } };
                    const updatedVotes = [...previousVotes, vote];
                    const voteCount = updatedVotes.length;
                    return voteRef.update({ votes: updatedVotes, voteCount })
                        .catch(err => console.error('[LinkItem] Failed to update votes: ', err));
                }
            })
        }
    }

    function handleDeleteLink() {
        const linkRef = firebase.db.collection('links').doc(link.id);
        linkRef.delete().then(() => {
            console.log(`Document with ID ${link.id} deleted`);
        }).catch(err => {
            console.error(`Error deleting document with ${link.id}`, { err });
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
