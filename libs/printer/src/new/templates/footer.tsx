import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';

import { mmToPt } from './utils';

export const createFooterStyles = () =>
    StyleSheet.create({
        footer: {
            fontFamily: 'Quicksand',
            position: 'absolute',
            display: 'flex',
            left: 0,
            right: 0,
            bottom: 0,
            height: mmToPt(15),
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            color: '#777777'
        },
        link: {
            color: '#555555',
            textDecoration: 'none'
        }
    });

export const PageFooter = () => {
    const styles = createFooterStyles();

    return (
        <View style={styles.footer} fixed>
            <Text>
                Created with{' '}
                <Link src="https://kanji.sh" style={styles.link}>
                    kanji.sh
                </Link>
            </Text>
        </View>
    );
};
