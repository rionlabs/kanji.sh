import { MetaFunction } from '@remix-run/node';

import TermsMDXComponent from '../content/terms.mdx';

export const meta: MetaFunction = () => {
    return [];
};

export default function PrivacyPolicyRoute() {
    return (
        <TermsMDXComponent />
    );
}
