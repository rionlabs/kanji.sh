import React from 'react';
import { ConstructionAnimation } from 'app/components/atoms/AnimatedImage';
import SubscriptionForm from 'app/components/molecules/SubscriptionForm';

const ReadPage: React.FC = () => {
    return (
        <div className='container flex flex-col items-stretch gap-4 justify-center'>
            <div className='text-center'>
                <h4>Ooops!</h4>
            </div>
            <div className=''>
                <ConstructionAnimation className='' />
            </div>
            <div className='text-center'>
                <div>I haven&apos;t started adding reading sessions yet.</div>
                <div>If you would like it, signup for the updates. No spams, I promise!</div>
            </div>
            <div>
                <SubscriptionForm />
            </div>
        </div>
    );
};

export default ReadPage;
