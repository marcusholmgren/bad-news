import React, {useContext, useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function LinkList() {
    const {firebase} = useContext(FirebaseContext);
    const [links, setLinks] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = firebase.db
            .collection("links")
            .orderBy('created', 'desc')
            .onSnapshot(handleSnapshot);

        return () => unsubscribe();
    }, [firebase.db, location]);

    function handleSnapshot(snapshot) {
        const links = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        setLinks(links);
    }

    function renderLinks() {
        if (!location.pathname.toString().startsWith("/top")) {
            return links;
        }

        return links.slice().sort((l1, l2) => l2.votes.length - l1.votes.length);
    }

    return (
        <div>
            {renderLinks().map((link, index) => (
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
