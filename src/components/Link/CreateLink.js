
import React, {useContext} from "react";
import {useNavigate} from 'react-router-dom';
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
import FirebaseContext from "../../firebase/context";

const INITIAL_STATE = {
    description: "",
    url: ""
}

function CreateLink() {
    const { firebase, user } = useContext(FirebaseContext);
    const  { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);
    const navigate = useNavigate();

    function handleCreateLink() {
        if (!user) {
            navigate('/login')
        } else {
            const { description, url } = values;
            const newLink = {
                url,
                description,
                postedBy: {
                    id: user.uid,
                    name: user.displayName
                },
                voteCount: 0,
                votes: [],
                comments: [],
                created: Date.now()
            }
            firebase.db.collection("links").add(newLink);
            navigate("/")
        }
    }

  return (
      <form className="flex flex-column mt3" onSubmit={handleSubmit}>
        <input type="text"
               name="description"
               value={values.description}
               placeholder="A description for your link"
               autoComplete="off"
               onChange={handleChange}
               className={errors.description && "error-input"}
        />
          {errors.description && <p className="error-text">{errors.description}</p>}
        <input type="url"
               name="url"
               value={values.url}
               placeholder="The URL for the link"
               autoComplete="off"
               onChange={handleChange}
               className={errors.url && "error-input"}
        />
          {errors.url && <p className="error-text">{errors.url}</p>}
        <button className="button" type="submit">
          Submit
        </button>
      </form>
  );
}

export default CreateLink;
