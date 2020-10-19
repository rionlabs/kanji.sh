import {PureComponent} from "react";
import {withRouter} from "react-router";

class ScrollView extends PureComponent<any> {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    getSnapshotBeforeUpdate(prevProps: Readonly<any>, prevState: Readonly<any>): any | null {
        if (this.props.location !== prevProps.location) window.scrollTo(0, 0);
    }

    render = () => this.props.children;
}

export default withRouter(ScrollView);