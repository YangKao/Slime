import Config from "./config"
import {PromiseBuilder} from "./promiseBuilder/promiseBuilder";
import {getPosts, IPost} from "./network/github";
import * as React from "react";

export function PostsList({navigateTo}) {
    // @ts-ignore
    const allPosts = Promise.all(
        Config.repos.map(item => getPosts(item))
    ).then(
        items => items.reduce((sum, item) => sum.concat(item), [])
    ) as Promise<IPost[]>;

    return <PromiseBuilder
        promise={allPosts}
        pendingFunction={
            () => {
                return (
                    <ul>
                        PENGIND
                    </ul>
                )
            }
        }
        resolveFunction={
            (post) => {
                return (
                    <ul>
                        {
                            post.map(item => {
                                return <li key={item.id}>
                                    <a onClick={() => {navigateTo(item)}}>
                                        {item.name}
                                    </a>
                                </li>
                            })
                        }
                    </ul>
                )
            }
        }
    />
}
