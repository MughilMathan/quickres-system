import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId, filename = 'receipt.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
  return pdf.output('blob');
};

export const sharePDF = async (blob, filename = 'Abhirami_Hotel_Receipt.pdf') => {
  if (navigator.share) {
    const file = new File([blob], filename, { type: 'application/pdf' });
    try {
      await navigator.share({
        title: 'Abhirami Hotel Receipt',
        text: 'Here is your receipt for your recent order.',
        files: [file],
      });
    } catch (err) {
      console.error('Sharing failed', err);
    }
  } else {
    alert('Web Share API not supported on this browser.');
  }
};
