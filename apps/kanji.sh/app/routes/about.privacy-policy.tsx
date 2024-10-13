import { MetaFunction } from '@remix-run/node';
import PrivacyPolicyMDXComponent from '../content/privacy-policy.mdx';

export const meta: MetaFunction = () => {
    return [];
};

export default function PrivacyPolicyRoute() {
    return (
        <PrivacyPolicyMDXComponent />
    );
}
