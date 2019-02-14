import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Header} from "./header";
import {PostsList} from "./postsList";
import "./style/main.sass";
import {useState} from "react";
import {IPost} from "./network/github";
import {Post} from "./post";

interface IPostNavigate {
    post: IPost
}

function isPostNaviage(item): item is IPostNavigate {
    return item.post !== undefined;
}

function App() {
    const [navigate, setNavigate] = useState(undefined);

    function naviageToPost(post: IPost) {
        window.location.hash = post.id;
        setNavigate({
            post
        })
    }

    let body;

    console.log(navigate);
    if (navigate === "index" || navigate === undefined) {
        body = <PostsList navigateTo={naviageToPost}/>;
    } else if (isPostNaviage(navigate)) {
        body = <Post post={navigate.post} />
    } else {
        body = <div>
            WARNING: UNKOWN NAVIGATE
        </div>
    }
    return (
        <div>
            <Header/>
            {body}
        </div>
    )
}

window.onload = () => {
    ReactDOM.render(<App/>, document.getElementById("app"));
};
