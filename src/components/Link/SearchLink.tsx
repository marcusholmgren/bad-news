import React, {useContext, useEffect, useState} from "react";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";
import { DocumentData, QuerySnapshot, collection, getDocs } from 'firebase/firestore';
import {LinkData} from "./types";


const SearchLinks: React.FC = () => {
  const context = useContext(FirebaseContext);
  const [filteredLinks, setFilteredLinks] = useState<LinkData[]>([]);
  const [links, setLinks] = useState<LinkData[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!context) return;
    const linksCollection = collection(context.firebase.db, 'links');
    getDocs(linksCollection).then((snapshot: QuerySnapshot<DocumentData>) => {
      const fetchedLinks = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        } as LinkData;
      });
      setLinks(fetchedLinks);
    });
  }, [context]);

  if (!context) {
    return null;
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter(link => {
      return link.description.toLowerCase().includes(query) ||
          link.url.toLowerCase().includes(query) ||
          link.postedBy.name.toLowerCase().includes(query)
    });
    setFilteredLinks(matchedLinks);
  }

  return (
      <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value)}/>
          <button type="submit">OK</button>
        </div>
      </form>
        {filteredLinks.map((link, index) => {
          return <LinkItem key={link.id} showCount={false} link={link} index={index} />
        } )}
      </div>
  );
}

export default SearchLinks;
