import React, {useCallback, useContext, useEffect, useState} from "react";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function LinkList() {
    const {firebase} = useContext(FirebaseContext);
    const getLinksOnce = useCallback(getLinks, []);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        getLinksOnce();
    }, [getLinksOnce]);

    function handleSnapshot(snapshot) {
        const links = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        setLinks(links);
    }

    function getLinks() {
        firebase.db.collection("links").onSnapshot(handleSnapshot)
    }

    return (
        <div>
            {links.map((link, index) => (
                <LinkItem
                    key={link.id}
                    showCount={true}
                    link={link}
                    index={index + 1}
                />
            ))}
        </div>
    );
}

export default LinkList;
