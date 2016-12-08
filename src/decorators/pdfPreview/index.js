import createPDFPreviewStrategy from './pdfPreviewStrategy';
import PDFPreview from '../../components/PDFPreview';

const createPDFPreviewDecorator = (config, store) => ({
  strategy: createPDFPreviewStrategy(config, store),
  component: PDFPreview,
});

export default createPDFPreviewDecorator;
