import React, {useContext, useEffect, useState} from "react";
import {FirebaseContext} from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const { firebase } = useContext(FirebaseContext);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    firebase.db.collection('links').get().then(snapshot => {
      const links = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setLinks(links);
    });
  }, [firebase.db]);

  function handleSearch(event) {
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
          Search <input type="text" onChange={event => setFilter(event.target.value)}/>
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
