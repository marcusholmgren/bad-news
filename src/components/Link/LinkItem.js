import React from "react";
import {Link} from "react-router-dom";
import {getDomain} from "../../utils";


function LinkItem({ link, index, showCount }) {
    const option = {hour: "numeric", dayPeriod: "short"};
    const dateTimeFormat = new Intl.DateTimeFormat("en-US", option);
    return (
      <div className="flex items-start mt2">
        <div className="flex items-center">
          {showCount && <span className="gray">{index}</span>}
          <div className="vote-button">
            &#x25B2;
          </div>
          <div className="ml1">
              <div>
                {link.description} <span className="link">({getDomain(link.url)})</span>
              </div>
              <div className="f6 lh-copy gray">
                  {link.votes.length} votes by {link.postedBy.name} {dateTimeFormat.format(link.created)}
                  {" | "}
                  <Link to={`/link/${link.id}`}>
                      {link.comments.length > 0
                          ? `${link.comments.length} comments`
                          : "discuss"
                      }
                  </Link>
              </div>
          </div>
        </div>
      </div>
  );
}

export default LinkItem;
