import React from "react";
import { createClient } from "contentful";
import Zipimage from "../components/zipimage";
import config from "../config.json";


// Instantiate the app client
const client = createClient({
  space: config.space,
  accessToken: config.accessToken
});

// Our Homepage component, will receive props from contentful entries thanks to getInitialProps function below.
function Zipimages(props) {
  return (
	
		<React.Fragment>
			  {props.allPosts && props.allPosts.map(post => <Zipimage post={post} key={post.fields.title} />)}
		</React.Fragment>
  );
}

// This function will run during build time in case of static export.
// Or will run each time a new request is made to the browser in SSR.
// It's used to compute initial props for the component and pre-render.
Zipimages.getInitialProps = async () => {
  // Get every entries in contentful from type Article, sorted by date.
  // article is the ID of the content model we created on the dashboard.
  const entries = await client.getEntries({
    content_type: "zipimage",
    order: "-fields.date"
  });

  // Inject in props of our screen component
  return { allPosts: entries.items };
};

// That's the default export (the page)
export default Zipimages;
