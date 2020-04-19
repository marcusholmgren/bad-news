import React, { useCallback, useContext, useEffect } from "react";
import FirebaseContext from "../../firebase/context";

function LinkList() {
  const { firebase } = useContext(FirebaseContext);
  const getLinksOnce = useCallback(() => getLinks(), []);

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

    console.log(links);
  }

  function getLinks() {
    firebase.db.collection("links").onSnapshot(handleSnapshot)
  }

  return <div>LinkList</div>;
}

export default LinkList;
