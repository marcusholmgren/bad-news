import React, {useContext, useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";
import {LINKS_PER_PAGE} from "../../utils";
import {firebaseEndpoints} from '../../firebase';

function LinkList() {
    const {firebase} = useContext(FirebaseContext);
    const [links, setLinks] = useState([]);
    const [cursor, setCursor] = useState(null);
    const location = useLocation();
    const isNewPage = location.pathname.startsWith('/new');
    const isTopPage = location.pathname.startsWith('/top');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const page = Number(params.page);
        if (page > 1 && !cursor) {
            const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;


            fetch(`${firebaseEndpoints.linksPagination}?offset=${offset}`)
                .then(res => res.json())
                .then(links => {
                    const lastLink = links[links.length - 1];
                    setLinks(links);
                    setCursor(lastLink);
                })
                .catch(err => console.error(err));
            return () => {};
        }

        let unsubscribe;
        if (isTopPage) {
            unsubscribe = firebase.db
                .collection("links")
                .orderBy('voteCount', 'desc')
                .limit(LINKS_PER_PAGE)
                .onSnapshot(handleSnapshot);
        } else if (cursor && page > 1) {
            unsubscribe = firebase.db
                .collection("links")
                .orderBy('created', 'desc')
                .startAfter(cursor.created)
                .limit(LINKS_PER_PAGE)
                .onSnapshot(handleSnapshot);
        } else {
            unsubscribe = firebase.db
                .collection("links")
                .orderBy('created', 'desc')
                .limit(LINKS_PER_PAGE)
                .onSnapshot(handleSnapshot);
        }

        return () => unsubscribe();
    }, [firebase.db, location, isTopPage, params, navigate]);

    function handleSnapshot(snapshot) {
        const links = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        const lastLink = links[links.length - 1];
        setLinks(links);
        setCursor(lastLink);
    }


    function visitPreviousPage() {
        const page = Number(params.page);
        if (page !== 1) {
            navigate(`/new/${page - 1}`);
        }
    }

    function visitNextPage() {
        const page = Number(params.page);
        if (page <= links.length / LINKS_PER_PAGE) {
            navigate(`/new/${page + 1}`);
        }
    }

    const pageIndex = params.page ? (Number(params.page)  - 1) * LINKS_PER_PAGE : 0;
    return (
        <div>
            {links.map((link, index) => (
                <LinkItem
                    key={link.id}
                    showCount={true}
                    link={link}
                    index={index + 1 + pageIndex}
                />
            ))}
            {isNewPage && (
                <div className="pagination">
                    <div className="pointer mr2" onClick={visitPreviousPage}>Previous</div>
                    <div className="pointer mr2" onClick={visitNextPage}>Next</div>
                </div>
            )}
        </div>
    );
}

export default LinkList;
