import React, {useContext, useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";

function LinkList() {
    const {firebase} = useContext(FirebaseContext);
    const [links, setLinks] = useState([]);
    const location = useLocation();
    const isTopPage = location.pathname === '/top';

    useEffect(() => {
        let unsubscribe;
        if (isTopPage) {
            unsubscribe = firebase.db
            .collection("links")
            .orderBy('voteCount', 'desc')
            .onSnapshot(handleSnapshot);
        } else {
            unsubscribe = firebase.db
                .collection("links")
                .orderBy('created', 'desc')
                .onSnapshot(handleSnapshot);
        }

        return () => unsubscribe();
    }, [firebase.db, location, isTopPage]);

    function handleSnapshot(snapshot) {
        const links = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        setLinks(links);
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
