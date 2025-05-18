import { MetaFunction } from '@remix-run/node';

import AcknowledgmentsMDXComponent from '../content/acknowledgments.mdx';

export const meta: MetaFunction = () => {
    return [];
};

export default function AboutRoute() {
    return (
        <AcknowledgmentsMDXComponent />
    );
}
