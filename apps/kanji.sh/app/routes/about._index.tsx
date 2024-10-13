import { MetaFunction } from '@remix-run/node';
import { FaFacebook, FaGithub, FaReddit, FaXTwitter } from 'react-icons/fa6';
import { GiSushis } from 'react-icons/gi';
import { HiOutlineMail } from 'react-icons/hi';
import { TextLogo } from '../components/TextLogo';
import AboutMDXComponent from '../content/about.mdx';

export const meta: MetaFunction = () => {
    return [];
};

export default function AboutRoute() {
    return (
        <AboutMDXComponent components={{
            FaGithub: FaGithub,
            FaFacebook: FaFacebook,
            FaReddit: FaReddit,
            FaXTwitter: FaXTwitter,
            HiOutlineMail: HiOutlineMail,
            GiSushis: GiSushis,
            TextLogo: TextLogo
        }} />
    );
}
