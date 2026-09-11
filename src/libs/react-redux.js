import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = ({ store, children }) => {
    return <Context value={store}>{children}</Context>;
};

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

export { Context, Provider, useStore, useSelector, useDispatch };
