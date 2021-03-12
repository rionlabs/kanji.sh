import React, { useLayoutEffect, useRef } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { CircularProgress, StyleRules } from '@material-ui/core';
import { Document, Page } from 'react-pdf';
import Spacer from './atoms/Spacer';
import { ArrowBackRounded, ArrowForwardRounded } from '@material-ui/icons';
import { FileData } from '../Metadata';

const styles = (theme: Theme): StyleRules =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2)
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500]
        },
        dialogPaper: {
            height: '100vh'
        },
        dialogContent: {
            backgroundColor: theme.palette.grey.A100
        },
        pdfCanvas: {
            width: '100%',
            height: '100%',
            '& > .react-pdf__message': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center'
            }
        },
        pdfPage: {
            '& > canvas': {
                margin: 'auto'
            }
        }
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

export interface FilePreviewProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    fileData: FileData;
    open: boolean;
    onClose: () => void;
}

const FilePreview: (props: FilePreviewProps) => JSX.Element = (props) => {
    const { id, fileData, classes, children, open, onClose } = props;
    const [numPages, setNumPages] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageHeight, setPageHeight] = React.useState(0);

    const pdfDocument = useRef<HTMLDivElement>(null);
    const pdfPage = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (pdfDocument.current) {
            setPageHeight(pdfDocument.current.clientHeight);
        }
    }, [pdfDocument.current, pdfPage.current]);

    const handleClose: () => void = () => {
        onClose();
    };

    const loadPageNumbers: ({ numPages }: { numPages: number }) => void = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            {children}
            <Dialog
                id={id}
                classes={{ paper: classes.dialogPaper }}
                maxWidth={'sm'}
                fullWidth={true}
                onClose={handleClose}
                aria-labelledby="pdf-preview-dialog-title"
                open={open}>
                <DialogTitle id="pdf-preview-dialog-title" onClose={handleClose}>
                    {fileData.title}
                </DialogTitle>
                <DialogContent dividers className={classes.dialogContent}>
                    <Document
                        inputRef={pdfDocument}
                        className={classes.pdfCanvas}
                        externalLinkTarget={'_blank'}
                        file={`/api/download?path=${fileData.filePath}&name=${fileData.title}`}
                        loading={
                            <div>
                                <CircularProgress />
                            </div>
                        }
                        noData={
                            <div>
                                <CircularProgress />
                            </div>
                        }
                        onLoadSuccess={(pdf) => loadPageNumbers(pdf)}>
                        <Page
                            className={classes.pdfPage}
                            height={pageHeight}
                            pageNumber={pageNumber}
                            inputRef={pdfPage}
                        />
                    </Document>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setPageNumber(pageNumber - 1)}
                        color="primary"
                        disabled={!numPages || pageNumber <= 1}
                        startIcon={<ArrowBackRounded />}>
                        Previous
                    </Button>
                    <p />
                    <Spacer />
                    <p hidden={!numPages}>
                        Page {pageNumber} of {numPages}
                    </p>
                    <Spacer />
                    <p />
                    <Button
                        onClick={() => setPageNumber(pageNumber + 1)}
                        color="primary"
                        disabled={!numPages || pageNumber >= numPages}
                        endIcon={<ArrowForwardRounded />}>
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(FilePreview);
