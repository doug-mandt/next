import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { createClient } from "contentful";
import Postcoho from "../components/postcoho";
import Navbar from "../components/Navbar";
import config from "../config.json";

// Instantiate the app client ---NEW COMMENT
const client = createClient({
    space: config.space,
    accessToken: config.accessToken
});

// Our Homepage component, will receive props from contentful entries thanks to getInitialProps function below..
function CohoPage(props) {
    return ( <
            React.Fragment >
            <
            Head >
            <
            title > Welcome to CohoPage < /title> <
            link rel = "stylesheet"
            href = "https://unpkg.com/spectre.css/dist/spectre.min.css" / >
            <
            link rel = "stylesheet"
            href = "https://unpkg.com/spectre.css/dist/spectre-exp.min.css" / >
            <
            link rel = "stylesheet"
            href = "https://unpkg.com/spectre.css/dist/spectre-icons.min.css" / >
            <
            /Head>

            <
            div className = "container grid-lg mt-2" >
            <
            Navbar / >
            <
            div className = "columns" > {
                props.allPosts && props.allPosts.map(post => < Postcoho post = { post }
                    key = { post.fields.title }
                    />)} < /
                    div > <
                    /div> < /
                    React.Fragment >
                );
            }

            // This function will run during build time in case of static export.
            // Or will run each time a new request is made to the browser in SSR.
            // It's used to compute initial props for the component and pre-render.
            CohoPage.getInitialProps = async() => {
                // Get every entries in contentful from type Article, sorted by date.
                // article is the ID of the content model we created on the dashboard.
                const entries = await client.getEntries({
                    content_type: "articlecoho",
                    order: "-fields.date"
                });

                // Inject in props of our screen component
                return { allPosts: entries.items };
            };

            // That's the default export (the page)
            export default CohoPage;