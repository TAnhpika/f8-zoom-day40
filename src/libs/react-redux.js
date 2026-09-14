import Context from "@/contexts/Context";
import { useContext, useEffect, useState } from "react";

function useStore() {
    const store = useContext(Context);
    return store;
}

function useSelector(selector) {
    const store = useStore();
    const [state, setState] = useState(() => {
        return selector(store.getState());
    });
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const nextState = selector(store.getState());
            if (state !== nextState) {
                setState(selector(store.getState()));
            }
        });

        return unsubscribe;
    }, [selector, state, store]);

    return state;
}

function useDispatch() {
    const store = useStore();
    return store.dispatch;
}

export { useStore, useSelector, useDispatch };
