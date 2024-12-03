import jsPDF from "jspdf";


const pdfWriter = (response) => {
    const pdf = new jsPDF();
    const config = {
      margin: {
        left: 20,
        right: 20,
        top: 20
      },
      lineHeight: {
        title: 12,
        heading: 10,
        text: 7
      },
      fontSize: {
        title: 24,
        heading1: 20,
        heading2: 16,
        heading3: 14,
        text: 12
      },
      indent: {
        bullet: 10
      }
    };
    
    let yPosition = config.margin.top;
    const pageWidth = pdf.internal.pageSize.width;
    const maxWidth = pageWidth - config.margin.left - config.margin.right;
    
    const addWrappedText = (text, x, y, maxWidth) => {
      const lines = pdf.splitTextToSize(text, maxWidth);
      lines.forEach((line, index) => {
        if (y + (index * config.lineHeight.text) > pdf.internal.pageSize.height - config.margin.top) {
          pdf.addPage();
          y = config.margin.top;
        }
        pdf.text(line, x, y + (index * config.lineHeight.text));
      });
      return y + (lines.length * config.lineHeight.text);
    };

    const lines = response.split('\n');
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
    
      if (!trimmedLine) {
        yPosition += config.lineHeight.text;
        return;
      }
  
  
      if (yPosition > pdf.internal.pageSize.height - config.margin.top) {
        pdf.addPage();
        yPosition = config.margin.top;
      }
  
      // Handle different heading levels and text
      if (trimmedLine.startsWith('# ')) {
        pdf.setFontSize(config.fontSize.title);
        pdf.setFont('helvetica', 'bold');
        const text = trimmedLine.replace(/^# /, '');
        yPosition = addWrappedText(text, config.margin.left, yPosition, maxWidth);
        yPosition += config.lineHeight.title;
      } 
      else if (trimmedLine.startsWith('## ')) {
        pdf.setFontSize(config.fontSize.heading1);
        pdf.setFont('helvetica', 'bold');
        const text = trimmedLine.replace(/^## /, '');
        yPosition = addWrappedText(text, config.margin.left, yPosition, maxWidth);
        yPosition += config.lineHeight.heading;
      } 
      else if (trimmedLine.startsWith('### ')) {
        pdf.setFontSize(config.fontSize.heading2);
        pdf.setFont('helvetica', 'bold');
        const text = trimmedLine.replace(/^### /, '');
        yPosition = addWrappedText(text, config.margin.left, yPosition, maxWidth);
        yPosition += config.lineHeight.heading;
      } 
      else if (trimmedLine.startsWith('- ')) {
        pdf.setFontSize(config.fontSize.text);
        pdf.setFont('helvetica', 'normal');
        const text = trimmedLine.replace(/^- /, '');

        pdf.text('•', config.margin.left, yPosition);
        yPosition = addWrappedText(text, config.margin.left + config.indent.bullet, yPosition, maxWidth - config.indent.bullet);
        yPosition += config.lineHeight.text;
      } 
      else {
        pdf.setFontSize(config.fontSize.text);
        pdf.setFont('helvetica', 'normal');
        yPosition = addWrappedText(trimmedLine, config.margin.left, yPosition, maxWidth);
        yPosition += config.lineHeight.text;
      }
    });
    
    return pdf;
}

export default pdfWriter