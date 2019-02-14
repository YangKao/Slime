import Config from "./config"
import * as React from "react";

export function Header() {
    return (
        <header>
            <h1>
                {Config.title}
            </h1>
        </header>
    )
}
