import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// This function will take an HTML element as input and generate a PDF.
export const generatePdfFromElement = async (element: HTMLElement, fileName: string): Promise<void> => {
  if (!element) {
    console.error('The provided element is null.');
    return;
  }

  // Use html2canvas to render the HTML element into a canvas
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');

  // Create a new jsPDF instance
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

  // Calculate the image dimensions to fit within the PDF page
  const newWidth = imgWidth * ratio;
  const newHeight = imgHeight * ratio;

  // Add the image to the PDF
  pdf.addImage(imgData, 'PNG', 0, 0, newWidth, newHeight);

  // Save the PDF with the given file name
  pdf.save(`${fileName}.pdf`);
};
