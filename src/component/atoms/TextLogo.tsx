import styled from 'styled-components';

const StyledText = styled('span')`
    font-family: 'Quicksand', fantasy;
    font-weight: 500;
`;

const TextLogo: () => JSX.Element = () => <StyledText>kanji.sh</StyledText>;

export default TextLogo;
