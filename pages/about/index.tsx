import React from 'react';
import PageLayout from '../../src/PageLayout';
import Config from '../../src/config/Config';
import ShareSheet from '../../src/component/molecules/ShareSheet';
import { FaMoneyBill, FaEnvelope, FaGithub } from 'react-icons/fa';
import LinkButton from '../../src/component/atoms/LinkButton';
import TextLogo from '../../src/component/atoms/TextLogo';

const ReadPage: React.FC = () => {
    return (
        <PageLayout>
            <h3>About</h3>

            <div>
                <TextLogo /> aims to become a free & more comfortable way to study kanji reading and
                writing. Right now, there are hundreds of free resources available online but filled
                with distracting advertisements. I personally feel that distracting, not letting you
                focus on the reading. So, I&apos;m making this website for myself and others who
                want to want to study kanji distraction-free. For now, there are hundreds of
                worksheets for download and practice writing. Why write kanji rather than using an
                app to dribble? Here are{' '}
                <a
                    href={
                        'https://blog.remarkable.com/5-reasons-why-hand-writing-notes-while-studying-improves-your-learning-5f43a397155b'
                    }>
                    5 reasons why handwriting notes while studying improves your learning
                </a>
                . The same thing works with kanji too.
            </div>

            <br />

            <h4>How can you help?</h4>
            <div>
                Being free & open source, <TextLogo /> needs all the help it can get. You can
                support <TextLogo /> in many ways.
            </div>
            <div>
                The simplest one is sharing <TextLogo /> with all people you know are learning
                Japanese, spread the word, and let them know <TextLogo /> here.
            </div>

            <ShareSheet />

            <h5>Feedback & Suggestions</h5>
            <div>
                You can submit your precious suggestions for the designs or more features. If
                nothing, you can drop me a mail telling me how I am doing with <TextLogo />. Few
                words of encouragement never hurt!
            </div>

            <LinkButton link={`mailto:${Config.contactEmail}`} startIcon={<FaEnvelope />}>
                Send
            </LinkButton>

            <h5>Contribute to the development</h5>
            <div>
                If you are a software developer, good news for you. <TextLogo /> is open source!
                Check out the <a href={Config.githubUrl}>GitHub page</a> to see the source code,
                build it yourself, file an <a href={`${Config.githubUrl}/issues`}>issue</a>, and
                make it better! Show your love by sharing this website and starring the{' '}
                <a href={Config.githubUrl}>GitHub repository</a>!
            </div>

            <LinkButton link={Config.githubUrl} startIcon={<FaGithub />}>
                GitHub Repository
            </LinkButton>

            <h5>Buy me Sushi</h5>
            <div>
                I work on <TextLogo /> in my free time, and it took me a considerable amount of time
                to build up to this point. You can fuel <TextLogo /> by buying me some Sushi. It
                also covers costs for servers, domain, and keeps me motivated to put more time to
                improve <TextLogo />.
            </div>

            <LinkButton link={Config.bmcUrl} startIcon={<FaMoneyBill />}>
                Buy Now
            </LinkButton>

            <br />
            <br />

            <h4>Acknowledgments</h4>
            <h5>KanjiVG</h5>
            <div>
                Kanji stroke diagrams are based on data from{' '}
                <a href={'http://kanjivg.tagaini.net/'}>KanjiVG</a>, which is copyright © 2009-2012
                Ulrich Apel and released under the{' '}
                <a href={'https://creativecommons.org/licenses/by-sa/3.0/'}>
                    Creative Commons Attribution-Share Alike 3.0
                </a>{' '}
                license.
            </div>

            <h5>Sources</h5>
            <div>
                JLPT kanji data comes from Peter van der Woude&apos;s{' '}
                <a href={'https://jlptstudy.net'}>JLPTStudy</a> study site. Grades & frequency kanji
                data is taken from{' '}
                <a href={'https://en.wikipedia.org/wiki/Kyōiku_kanji'}>Wikipedia</a> page. Wanikani
                level data comes from <a href={'https://docs.api.wanikani.com/'}>Wanikani API</a>.
                Meanings & Readings data is copied from David Gouveia&apos;s{' '}
                <a href={'https://github.com/davidluzgouveia/kanji-data'}>GitHub</a> project.
            </div>
        </PageLayout>
    );
};

export default ReadPage;
