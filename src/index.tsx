import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Header} from "./header";
import {PostsList} from "./postsList";

import "./style/main.sass";

function App() {
    return (
        <div>
            <Header/>
            <PostsList/>
        </div>
    )
}

window.onload = () => {
    ReactDOM.render(<App/>, document.getElementById("app"));
};
