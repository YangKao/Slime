import * as React from 'react';
import {useState} from 'react';

enum PromiseStatus {
    PENDING,
    DONE,
}

interface Props<T> {
    promise: Promise<T>,
    pendingFunction: () => JSX.Element,
    resolveFunction: (t: T) => JSX.Element
}

export function PromiseBuilder<T>({
                                      promise,
                                      pendingFunction,
                                      resolveFunction
                                  }: Props<T>): JSX.Element {
    const [status, setStatus] = useState(PromiseStatus.PENDING);

    const [value, setValue] = useState(undefined) as [T, React.Dispatch<T>];

    if (status === PromiseStatus.PENDING) {
        promise.then(item => {
            setValue(item);
            setStatus(PromiseStatus.DONE);
        });

        return pendingFunction();
    } else if (status === PromiseStatus.DONE) {
        return resolveFunction(value);
    }
}
