import Context from "./Context";

const Provider = ({ store, children }) => {
    return <Context value={store}>{children}</Context>;
};

export { Provider };
