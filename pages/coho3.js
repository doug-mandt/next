import React from "react";
import Head from "next/head";
import { createClient } from "contentful";
import Postcoho3 from "../components/postcoho3";
import config from "../config.json";
import Layout from '../components/Layout'
import Movies from '../components/movies'
import Zipimages from '../pages/Zipimages'

// Instantiate the app client
const client = createClient({
  space: config.space,
  accessToken: config.accessToken
});

// Our Homepage component, will receive props from contentful entries thanks to getInitialProps function below.
function CohoPage3(props) {
  return (
	<Layout>
		<React.Fragment>
		  <Head>
			<title>CohoPage3</title>
			<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
			<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css" />
			<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
		  </Head>
		  
		  <div className="container grid-lg mt-2">	  
			<div className="columns">
			  {props.allPosts && props.allPosts.map(post => <Postcoho3 post={post} key={post.fields.title} />)}
			</div>
			<div className="columns">
			<h1>Zip Images Test</h1>
			  <Zipimages />
			</div>
			<div className="columns">
			  <Movies />
			</div>

		  </div>
		</React.Fragment>

	</Layout>
  );
}

// This function will run during build time in case of static export.
// Or will run each time a new request is made to the browser in SSR.
// It's used to compute initial props for the component and pre-render.
CohoPage3.getInitialProps = async () => {
  // Get every entries in contentful from type Article, sorted by date.
  // article is the ID of the content model we created on the dashboard.
  const entries = await client.getEntries({
    content_type: "articlecoho3",
    order: "-fields.date"
  });

  // Inject in props of our screen component
  return { allPosts: entries.items };
};

// That's the default export (the page)
export default CohoPage3;
