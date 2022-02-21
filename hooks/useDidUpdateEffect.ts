import { useRef, useEffect } from "react";

const useDidUpdate = (cb: Function, dependencies: Array<any>) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) cb();

        didMountRef.current = true;
    }, dependencies);
};

export default useDidUpdate;
