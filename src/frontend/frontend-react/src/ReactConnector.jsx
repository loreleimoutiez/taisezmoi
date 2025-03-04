import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/app/store";

class ReactConnector {
    constructor(targetEl) {
        this.targetEl = targetEl;
        this.root = null;
    }

    render(AppComponent) {
        if (this.targetEl) {
            if (!this.root) {
                this.root = createRoot(this.targetEl);
            }
            this.root.render(
                <Provider store={store}>
                    <AppComponent />
                </Provider>
            );
        }
    }
}

export { ReactConnector };
