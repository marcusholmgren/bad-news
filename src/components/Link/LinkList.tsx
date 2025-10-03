import React, {useContext, useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import FirebaseContext from "../../firebase/context";
import LinkItem from "./LinkItem";
import {LINKS_PER_PAGE} from "../../utils";
import {firebaseEndpoints} from '../../firebase';
import { QuerySnapshot, DocumentData, collection, query, orderBy, limit, startAfter, onSnapshot } from 'firebase/firestore';

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
    comments: any[];
    votes: any[];
}

const LinkList: React.FC = () => {
    const context = useContext(FirebaseContext);
    const [links, setLinks] = useState<LinkData[]>([]);
    const [cursor, setCursor] = useState<LinkData | null>(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const isNewPage = location.pathname.startsWith('/new');
    const isTopPage = location.pathname.startsWith('/top');
    const params = useParams<{ page?: string }>();
    const navigate = useNavigate();

    if (!context) {
        return null;
    }
    const { firebase } = context;

    useEffect(() => {
        setLoading(true);
        const page = Number(params.page);
        const linksCollection = collection(firebase.db, 'links');

        if (page > 1 && !cursor) {
            const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;

            fetch(`${firebaseEndpoints.linksPagination}?offset=${offset}`)
                .then(res => res.json() as Promise<LinkData[]>)
                .then(fetchedLinks => {
                    const lastLink = fetchedLinks[fetchedLinks.length - 1];
                    setLinks(fetchedLinks);
                    setCursor(lastLink);
                    setLoading(false);
                })
                .catch(err => console.error(err));
            return () => {};
        }

        let q;
        if (isTopPage) {
            q = query(linksCollection, orderBy('voteCount', 'desc'), limit(LINKS_PER_PAGE));
        } else if (cursor && page > 1) {
            q = query(linksCollection, orderBy('created', 'desc'), startAfter(cursor.created), limit(LINKS_PER_PAGE));
        } else {
            q = query(linksCollection, orderBy('created', 'desc'), limit(LINKS_PER_PAGE));
        }

        const unsubscribe = onSnapshot(q, handleSnapshot);

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firebase.db, location, isTopPage, params, navigate, cursor]);

    function handleSnapshot(snapshot: QuerySnapshot<DocumentData>) {
        const fetchedLinks = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as LinkData;
        })

        const lastLink = fetchedLinks[fetchedLinks.length - 1];
        setLinks(fetchedLinks);
        setCursor(lastLink);
        setLoading(false);
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
        <div style={{ opacity: loading ? 0.25 : 1}}>
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
