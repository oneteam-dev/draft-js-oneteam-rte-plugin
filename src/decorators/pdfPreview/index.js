import createPDFPreviewStrategy from './createPDFPreviewStrategy';
import PDFPreview from '../../components/PDFPreview';

const createPDFPreviewDecorator = (config, store) => ({
  strategy: createPDFPreviewStrategy(config, store),
  component: PDFPreview,
});

export default createPDFPreviewDecorator;
