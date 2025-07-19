/**
 * Generates a PDF from a DOM element
 * @param {HTMLElement} element - The DOM element to convert to PDF
 * @param {string} filename - The name of the PDF file
 * @param {Object} options - Additional options for PDF generation
 */
export const generatePDF = async (element, filename, options = {}) => {
  // Make sure html2pdf is available
  if (typeof window.html2pdf === 'undefined') {
    // Load html2pdf from CDN if not available
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    
    // Wait for the script to load
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  // Default options
  const defaultOptions = {
    margin: [10, 10, 10, 10],
    filename: `${filename || 'resume'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Merge default options with provided options
  const pdfOptions = { ...defaultOptions, ...options };
  
  return window.html2pdf().from(element).set(pdfOptions).save();
};

/**
 * Prepares the resume for PDF export by applying print-specific styles
 * @param {string} templateId - The ID of the template being used
 * @returns {Object} - Object with setup and cleanup functions
 */
export const preparePDFExport = (templateId) => {
  // Create a style element for print-specific styles
  const styleElement = document.createElement('style');
  styleElement.id = 'pdf-export-styles';
  
  // Add template-specific print styles
  switch (templateId) {
    case 'modern':
      styleElement.textContent = `
        @media print {
          body { margin: 0; padding: 0; }
          .resume-container { width: 210mm; height: 297mm; }
          .resume-header { break-inside: avoid; }
        }
      `;
      break;
    case 'classic':
      styleElement.textContent = `
        @media print {
          body { margin: 0; padding: 0; }
          .resume-container { width: 210mm; height: 297mm; }
          h1, h2, h3 { break-after: avoid; }
        }
      `;
      break;
    case 'creative':
      styleElement.textContent = `
        @media print {
          body { margin: 0; padding: 0; }
          .resume-container { width: 210mm; height: 297mm; }
          .gradient-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `;
      break;
    case 'professional':
      styleElement.textContent = `
        @media print {
          body { margin: 0; padding: 0; }
          .resume-container { width: 210mm; height: 297mm; }
          .section-title { break-after: avoid; }
        }
      `;
      break;
    case 'minimal':
      styleElement.textContent = `
        @media print {
          body { margin: 0; padding: 0; }
          .resume-container { width: 210mm; height: 297mm; }
        }
      `;
      break;
    default:
      styleElement.textContent = `
        @media print {
          body { margin: 0; padding: 0; }
          .resume-container { width: 210mm; height: 297mm; }
        }
      `;
  }
  
  // Append the style element to the head
  document.head.appendChild(styleElement);
  
  // Return functions to setup and cleanup
  return {
    setup: () => {
      // Additional setup if needed
      document.body.classList.add('printing');
    },
    cleanup: () => {
      // Remove the style element
      const styleEl = document.getElementById('pdf-export-styles');
      if (styleEl) {
        styleEl.remove();
      }
      document.body.classList.remove('printing');
    }
  };
};

/**
 * Downloads the resume as a PDF
 * @param {HTMLElement} resumeElement - The DOM element containing the resume
 * @param {string} filename - The name of the PDF file
 * @param {string} templateId - The ID of the template being used
 */
export const downloadResumePDF = async (resumeElement, filename, templateId) => {
  if (!resumeElement) {
    console.error('Resume element not found');
    return;
  }
  
  const { setup, cleanup } = preparePDFExport(templateId);
  
  try {
    // Setup for PDF export
    setup();
    
    // Generate the PDF
    await generatePDF(resumeElement, filename || 'resume');
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Cleanup after PDF export
    cleanup();
  }
};