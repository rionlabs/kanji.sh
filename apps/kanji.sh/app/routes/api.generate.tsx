import { LoaderFunction } from '@remix-run/node';

import { Document, G, Page, Path, renderToBuffer, StyleSheet, Svg, Text, View } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';
import { times } from 'lodash';

export const loader: LoaderFunction = async ({ request }) => {
    // font-family: 'Montserrat', sans-serif;
    // margin-left: auto;
    // margin-right: auto;

    const square = (sizeInMm: number) => {
        return StyleSheet.create({
            size: {
                width: mm(sizeInMm),
                height: mm(sizeInMm),
                minWidth: mm(sizeInMm),
                minHeight: mm(sizeInMm),
            }
        }).size;
    }

    const styles = StyleSheet.create({

        borderTL: {
            borderTop: '1pt solid #777777',
            borderLeft: '1pt solid #777777',
        },
        borderRB: {
            borderRight: '1pt solid #777777',
            borderBottom: '1pt solid #777777',
        }

        // page: {
        //     // display: 'flex',
        //     // flexDirection: 'column',
        //     // alignItems: 'center',
        // },
        // text: {
        //     // lineHeight: '1.1em',
        //     // overflowWrap: 'break-word',
        //     // wordBreak: 'break-all'
        // },
        // table: {
        //     // height: '40mm',
        //     // width: '150mm',
        //     // margin: '3mm auto',
        //     border: '#777777 solid 1pt'
        // }
//     table {
//         border-spacing: 0;
//         page-break-inside: avoid;
//     }


//     tr,
//         th,
//         td {
//         margin: 0;
//         padding: 0;
//         border-spacing: 0;
//         border: #777777 solid 0.05pt;
//         text-align: center;
//         align-content: center;
//         page-break-inside: avoid;
//     }
//     bigSquare: {
//       backgroundColor: '#f0f0f0',
//       height: '30mm',
//       width: '30mm',
//       minHeight: '30mm',
//       minWidth: '30mm'
//     },
//     bigSquareContent: {
//       backgroundColor: '#f0f0f0',
//       height: '25mm',
//       width: '25mm'
//     },
//
//     smallSquare: {
//       height: '15mm',
//       width: '15mm',
//       minHeight: '15mm',
//       minWidth: '15mm',
//       maxHeight: '15mm',
//       maxWidth: '15mm',
//       margin: 'auto',
//       backgroundSize: '15mm 15mm',
//       backgroundPositionX: '0',
//       backgroundPositionY: '0',
//       backgroundImage: 'url("../graphics/square_99.png")'
//     },
//
//     smallSquareContent: {
//       height: '13mm',
//       width: '13mm'
//     }

//
// .small-square > object {
//         height: 13mm;
//         width: 13mm;
//     }
//
//     #kvg {
//         stroke: #bbbbbb;
//     }
//
// .small-square > object > svg {
//         stroke: #bbbbbb;
//     }
//
// .small-square > object > svg > g {
//         stroke: #bbbbbb;
//     }
//
// .small-square > object > svg > text {
//         font-size: 0;
//     }
//
// .small-square > object > svg:last-child {
//         font-size: 0;
//     }
    });

    const DPI = 72;
    const mm = (pt: number) => `${pt * DPI / 25.4}pt`;


    type StyleProps = {
        style?: Style | Style[];
    }

    const DisplaySquare = ({ style = {} }: StyleProps) => {
        return (<View style={{ backgroundColor: '#f0f0f0', ...style, ...square(30) }}>
            <View style={{ backgroundColor: '#fff0f0', ...square(25) }}></View>
        </View>);
    }

    const DisplaySquare2 = ({ style = {} }: StyleProps) => {
        return (<View style={{ padding: mm(2), ...style, ...square(30) }}>
            <View style={{ ...square(25) }}>
                <Svg width="100%" height="100%" viewBox="0 0 109 109">
                    <G fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <G>
                            <G>
                                <Path d="M49.62,13.25c0.11,0.94,0.38,2.48-0.22,3.77c-4.15,8.86-15.15,25.23-36.65,37.08"/>
                                <Path d="M50.54,16.55c6.13,4.35,24.99,20.22,33.98,27.33c3.22,2.54,5.6,4.12,9.73,5.37"/>
                            </G>
                            <G>
                                <G>
                                    <Path d="M 38.590625,42.910833 c 1.76,0.72 3.84,0.36 5.65,0.14 5.4,-0.66 13.08,-1.76 18.48,-2.24 1.88,-0.17 3.54,-0.23 5.37,0.21"/>
                                </G>
                                <G>
                                    <Path d="M 31.464375,53.641042 c 0.61,0.15 3,1 4.21,0.87 10.329583,-0.937708 28.549375,-2.998125 38.130833,-4.17 1.516086,-0.185427 4.278829,-0.290121 3.95,2.89 -0.431171,4.169879 -2.680149,16.919928 -6,23.84 -1.890149,3.939928 -3.18,3.45 -6.23,0.46"/>
                                    <Path d="M 44.769166,53.809375 c 0.87,0.87 1.8,2 1.8,3.5 0,7.36 -0.04,24.53 -0.1,34.13 -0.02,3.3 -0.05,5.71 -0.08,6.51"/>
                                </G>
                            </G>
                        </G>
                    </G>
                    <G fill="fill:#808080" style={{ fontSize: 8 }}>
                        <Text transform="matrix(1 0 0 1 42.50 15.13)">1</Text>
                        <Text transform="matrix(1 0 0 1 58.50 19.63)">2</Text>
                        <Text transform="matrix(1 0 0 1 43 40)">3</Text>
                        <Text transform="matrix(1 0 0 1 25.1 62.1)">4</Text>
                        <Text transform="matrix(1 0 0 1 36.4 65.5)">5</Text>
                    </G>
                </Svg>
            </View>

        </View>);
    }

    const WritingSquare = ({ style = {} }: StyleProps) => {
        return (<View style={{ backgroundColor: '#f0f0ff', ...square(15), padding: mm(1), ...style }}>
            <View style={{ backgroundColor: '#f0fff0', ...square(13) }}></View>
        </View>);
    }

    const RequestedDocument = () => {
        return (<Document title='Document Title' pageLayout='singlePage' pageMode='fullScreen'>
            <Page size='A4' orientation='portrait' debug={false} dpi={DPI}>
                {/*<View style={{ width: '100vw', display: 'flex', flexDirection: 'row', backgroundColor : 'red'}} render={() => {*/}
                {/*    <Svg width="100vw" height={3}>*/}
                {/*        { times(210).map() for (let i = 0; i < 210; i++) {*/}
                {/*            return*/}
                {/*        } }*/}
                {/*    </Svg>*/}
                {/*    */}
                {/*}}/>*/}
                <Text render={ ({pageNumber, totalPages}) => `${pageNumber}/${totalPages}` } />
                {/* Table */}
                <View style={{ width: mm(180), height: mm(30), marginHorizontal: 'auto', display: 'flex', flexDirection: 'row', ...styles.borderTL }}>
                    <DisplaySquare2 style={styles.borderRB} />
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            { times(10).map((i) => <WritingSquare style={styles.borderRB} key={i}/>) }
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            { times(10).map((i) => <WritingSquare style={styles.borderRB} key={i}/>) }
                        </View>
                    </View>
                </View>


                {/*/!**!/<View style={{ ...styles.table }}></View>*/}
                {/*  <Text x='125' y='10mm'>Section #1</Text>*/}
                {/*</View>*/}
                {/*<View style={styles.bigSquare}>
                <Text>Big Square</Text>
              </View>
              <View style={styles.smallSquare}>
                <Text>Small Square</Text>
              </View>*/}
            </Page>
        </Document>);
    };
    try {
        // Render the PDF in 5 seconds, if not send error response
        const buffer = await/* performTaskWithTimeout(() => */renderToBuffer(<RequestedDocument/>)/*, 5000);*/
        return new Response(buffer, { headers: { 'Content-Type': 'application/pdf' } });
    } catch (error) {
        console.error(error);
        return new Response('Error rendering PDF', { status: 500 });
    }

};
