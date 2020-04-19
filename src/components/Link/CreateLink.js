import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";

const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext);
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  function handleCreateLink() {
    if (!user) {
      props.history.push("/login");
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        votes: [],
        comments: [],
        created: Date.now(),
      };

      firebase.db.collection("links").add(newLink);
      props.history.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        onChange={handleChange}
        value={values.description}
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        placeholder="The URL for the link"
        autoComplete="off"
        type="url"
        onChange={handleChange}
        value={values.url}
        className={errors.url && "error-input"}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
