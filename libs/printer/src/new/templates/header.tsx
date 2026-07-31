import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { mmToPt } from './utils';

type PageHeaderProps = {
    title: string;
    pageNumber: number;
};

export const createHeaderStyles = () =>
    StyleSheet.create({
        header: {
            fontFamily: 'Montserrat',
            fontWeight: 'normal',
            fontSize: '12px',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            width: '100%',
            height: mmToPt(20)
        },
        titleRow: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            color: '#000000',
            textTransform: 'capitalize'
        },
        pageNumber: {
            color: '#777777',
            marginLeft: mmToPt(2)
        }
    });

export const PageHeader = ({ title, pageNumber }: PageHeaderProps) => {
    const styles = createHeaderStyles();

    return (
        <View style={styles.header} fixed>
            <View style={styles.titleRow}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.pageNumber}>Page {pageNumber}</Text>
            </View>
        </View>
    );
};
