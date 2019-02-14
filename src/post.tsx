import {IPost} from "./network/github"
import {PromiseBuilder} from "./promiseBuilder/promiseBuilder";
import {getPost} from "./network/post";
import * as React from "react";

interface Props {post: IPost}
export function Post({post}: Props) {
    const postPromise = getPost(post.src);

    return <PromiseBuilder
        promise={postPromise}
        resolveFunction={post => <div className="post">
            {post}
        </div>}
        pendingFunction={() => <div className="post">
            WAITING
        </div>}
    />
}
