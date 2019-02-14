import {IPost} from "./network/github"
import {PromiseBuilder} from "./promiseBuilder/promiseBuilder";
import {getPost} from "./network/post";
import * as React from "react";
import * as MarkdownIt from "markdown-it";

interface Props {
    post: IPost
}

export function Post({post}: Props) {
    const postPromise = getPost(post.src);

    return <PromiseBuilder
        promise={postPromise}
        resolveFunction={
            (post) => {
                const md = new MarkdownIt();
                return <div className="post">
                    {md.render(post)}
                </div>
            }
        }
        pendingFunction={() => <div className="post">
            WAITING
        </div>}
    />
}
