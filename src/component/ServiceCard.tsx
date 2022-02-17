import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = {
    root: {
        flexGrow: 1,
        minHeight: 'theme.spacing(50)',
        marginTop: 'theme.spacing(4)',
        marginBottom: 'theme.spacing(4)'
    },
    rootCard: {
        minHeight: 'inherit',
        borderRadius: 'theme.spacing(4)'
    },
    imageBox: {
        padding: 'theme.spacing(3)'
    },
    textBoxEnd: {
        minHeight: 'inherit',
        background: 'linear-gradient(0deg, rgba(55,60,129,1) 0%, rgba(62,42,144,1) 100%)',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)',
        ["theme.breakpoints.down('xs')"]: {
            clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0% 100%)'
        }
    },
    textBoxStart: {
        minHeight: 'inherit',
        background: 'linear-gradient(0deg, rgba(42,77,144,1) 0%, rgba(26,33,129,1) 100%)',
        clipPath: 'polygon(0 0, 80% 0, 100% 100%, 0 100%)',
        ["theme.breakpoints.down('xs')"]: {
            clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0% 100%)'
        }
    },
    textContainerStart: {
        height: '100%',
        paddingEnd: '20%',
        paddingStart: '10%',
        textAlign: 'start',
        ["theme.breakpoints.down('xs')"]: {
            textAlign: 'end',
            paddingEnd: '10%',
            paddingStart: '10%'
        }
    },
    textContainerEnd: {
        height: '100%',
        paddingEnd: '10%',
        paddingStart: '20%',
        textAlign: 'end',
        ["theme.breakpoints.down('xs')"]: {
            paddingEnd: '10%',
            paddingStart: '10%'
        }
    }
};

interface Props {
    title: string;
    subtitle: string;
    imageUrl: string;
    imageDirection: Direction;
}

export enum Direction {
    start,
    end
}

const ServiceCard: React.FC<Props> = (props: Props) => {
    const { title, subtitle, imageUrl, imageDirection } = props;
    return (
        <div className="flex-grow min-h-80 p-8">
            <div className="container flex flex-col sm:flex-row items-stretch imageDirection">
                {/* Image */}
                <div className="flex flex-row items-center align-middle">
                    <img
                        style={{ width: '80%', height: '100%', margin: 'auto' }}
                        src={imageUrl}
                        alt={'Study Kanji!'}
                    />
                </div>

                {/* Text */}
                <div className="imageDirection" style={{ minHeight: 'inherit' }}>
                    <div className="py-4 space-y-4">
                        <h3 className="font-bold select-none lowercase">{title}</h3>
                        <div className="">{subtitle}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
