import { Department, ReportData, StoredFile } from '../types';

// jsPDF and autoTable are loaded from script tags in index.html
declare const jspdf: any;

const VERTICAL_PHOTO_GAP = 8; // Increased from 5 to add more space

// Helper function to add text and handle page breaks, returns the height of the added text
const addText = (doc: any, text: string, x: number, y: number, options: { maxWidth?: number, fontStyle?: string } = {}) => {
  const { maxWidth, fontStyle = 'normal' } = options;
  doc.setFont(undefined, fontStyle);
  const splitText = doc.splitTextToSize(text, maxWidth || (doc.internal.pageSize.width - x * 2));
  doc.text(splitText, x, y);
  return doc.getTextDimensions(splitText).h;
};

// Helper function to calculate the total height a photo block will occupy
const getPhotosBlockHeight = (photos: StoredFile[]): number => {
    if (!photos || photos.length === 0) return 0;

    const photoHeight = 85;
    const singlePhotoHeight = 120;

    if (photos.length === 1) {
        return singlePhotoHeight + VERTICAL_PHOTO_GAP;
    }
    if (photos.length === 3) {
        return (photoHeight + VERTICAL_PHOTO_GAP) * 2; // Two rows high
    }
    // All other cases (2, 4, etc.) use the standard 2-column grid layout
    return Math.ceil(photos.length / 2) * (photoHeight + VERTICAL_PHOTO_GAP);
};


// Helper function to render photos with different layouts
const addPhotosToDoc = (doc: any, photos: StoredFile[], currentCursorY: number, margin: number, checkPageBreak: (height: number) => void): number => {
    let cursorY = currentCursorY;
    const pageWidth = doc.internal.pageSize.width;

    if (!photos || photos.length === 0) {
        return cursorY;
    }

    if (photos.length === 1) {
        // --- Single Photo Layout: Centered and larger ---
        const photo = photos[0];
        const singlePhotoWidth = 120;
        const singlePhotoHeight = 120;
        const centerX = (pageWidth - singlePhotoWidth) / 2;

        checkPageBreak(singlePhotoHeight + VERTICAL_PHOTO_GAP);
        try {
            doc.addImage(photo.dataUrl, photo.type.split('/')[1].toUpperCase(), centerX, cursorY, singlePhotoWidth, singlePhotoHeight);
        } catch (e) {
            console.error("Error adding single image:", e);
            doc.text('[Image Error]', centerX, cursorY + singlePhotoHeight / 2);
        }
        cursorY += singlePhotoHeight + VERTICAL_PHOTO_GAP;
        return cursorY;
    }

    // --- Multi-Photo Layouts ---
    const photoWidth = 85;
    const photoHeight = 85;
    const photoGap = 10;
    
    // Center the 2-column block on the page
    const twoColTotalWidth = photoWidth * 2 + photoGap;
    const twoColStartX = (pageWidth - twoColTotalWidth) / 2;
    const leftX = twoColStartX;
    const rightX = twoColStartX + photoWidth + photoGap;

    if (photos.length === 3) {
        // --- 3-Photo Layout: 2 on top, 1 centered below ---
        checkPageBreak(photoHeight * 2 + (VERTICAL_PHOTO_GAP * 2));
        
        // Top row: Photo 1 and 2
        try { doc.addImage(photos[0].dataUrl, photos[0].type.split('/')[1].toUpperCase(), leftX, cursorY, photoWidth, photoHeight); } catch(e) { console.error("Error adding image:", e); doc.text('[Image Error]', leftX, cursorY + photoHeight/2); }
        try { doc.addImage(photos[1].dataUrl, photos[1].type.split('/')[1].toUpperCase(), rightX, cursorY, photoWidth, photoHeight); } catch(e) { console.error("Error adding image:", e); doc.text('[Image Error]', rightX, cursorY + photoHeight/2); }
        cursorY += photoHeight + VERTICAL_PHOTO_GAP;

        // Bottom row: Photo 3 centered
        const bottomCenterX = (pageWidth - photoWidth) / 2;
        try { doc.addImage(photos[2].dataUrl, photos[2].type.split('/')[1].toUpperCase(), bottomCenterX, cursorY, photoWidth, photoHeight); } catch(e) { console.error("Error adding image:", e); doc.text('[Image Error]', bottomCenterX, cursorY + photoHeight/2); }
        cursorY += photoHeight + VERTICAL_PHOTO_GAP;

    } else { // Logic for 2, 4 photos in a centered 2-column grid
        for (let i = 0; i < photos.length; i += 2) {
            checkPageBreak(photoHeight + VERTICAL_PHOTO_GAP);
            
            // Left image
            const photo1 = photos[i];
            try {
                doc.addImage(photo1.dataUrl, photo1.type.split('/')[1].toUpperCase(), leftX, cursorY, photoWidth, photoHeight);
            } catch (e) {
                console.error("Error adding image:", e);
                doc.text('[Image Error]', leftX, cursorY + photoHeight / 2);
            }

            // Right image if it exists
            if (i + 1 < photos.length) {
                const photo2 = photos[i + 1];
                try {
                    doc.addImage(photo2.dataUrl, photo2.type.split('/')[1].toUpperCase(), rightX, cursorY, photoWidth, photoHeight);
                } catch (e) {
                    console.error("Error adding image:", e);
                    doc.text('[Image Error]', rightX, cursorY + photoHeight / 2);
                }
            }
            
            cursorY += photoHeight + VERTICAL_PHOTO_GAP;
        }
    }
    return cursorY;
};

export const generatePdf = (schema: Department, data: ReportData) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
  
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  let cursorY = margin;

  // Function to check if a new page is needed
  const checkPageBreak = (heightNeeded: number) => {
    if (cursorY + heightNeeded > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }
  };

  // --- Document Title ---
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  cursorY += addText(doc, `${schema.department} Report`, margin, cursorY, { maxWidth: 180 });
  cursorY += 10;
  
  // --- Iterate through sections ---
  schema.sections.forEach(section => {
    checkPageBreak(12); // Minimum space for a section header
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text(section.name, margin, cursorY);
    cursorY += 8;
    doc.setDrawColor(200); // Light grey line
    doc.line(margin, cursorY, doc.internal.pageSize.width - margin, cursorY);
    cursorY += 6;

    // --- Handle Field-based Sections ---
    if (section.fields) {
      section.fields.forEach(field => {
        const value = data[section.name]?.[field.label] || null;
        
        if (field.type === 'signature') {
          // Each signature block takes up about 30mm for a standard, professional layout.
          checkPageBreak(30); 
          
          const signatureContentHeight = 20; // Space for the actual signature image.
          const lineY = cursorY + signatureContentHeight;
          
          // 1. Draw the image if it exists in the top part of the block.
          if (value && typeof value === 'string' && value.startsWith('data:image/')) {
            try {
              doc.addImage(value, 'PNG', margin, cursorY, 60, signatureContentHeight);
            } catch(e) {
              console.error("Error adding signature image: ", e);
              doc.setFont(undefined, 'italic');
              addText(doc, '[Invalid Image]', margin, cursorY + 8, { maxWidth: 180 });
            }
          }

          // 2. Draw the line under the signature area.
          doc.setDrawColor(150);
          doc.line(margin, lineY, margin + 70, lineY);

          // 3. Draw the label/title *below* the line.
          doc.setFontSize(10);
          doc.setFont(undefined, 'normal'); // Smaller, normal text for the label.
          addText(doc, field.label, margin, lineY + 4, { maxWidth: 70 });

          // 4. Update cursor for the next block, ensuring consistent spacing.
          cursorY = lineY + 10;
        } else {
          const valueStr = value ? String(value).trim() : 'N/A';
          const safeValueStr = valueStr.length > 10000 ? valueStr.substring(0, 10000) + '... (truncated)' : valueStr;
          const textHeight = doc.getTextDimensions(doc.splitTextToSize(safeValueStr, 180)).h;

          checkPageBreak(textHeight + 12); 
          doc.setFontSize(11);
          doc.setFont(undefined, 'bold');
          addText(doc, field.label, margin, cursorY, { maxWidth: 180 });
          cursorY += 6;
          
          doc.setFont(undefined, 'normal');
          cursorY += addText(doc, safeValueStr, margin, cursorY, { maxWidth: 180 });
          cursorY += 6;
        }
      });
      
      const photos = (data[section.name] as any)?.__photos as StoredFile[];
      if (photos && photos.length > 0) {
        const labelText = "Attached Photos:";
        const labelHeight = doc.getTextDimensions(labelText).h + 8; // Height of text + padding
        const photoBlockHeight = getPhotosBlockHeight(photos);
        
        // Check if the title and the entire photo block can fit together
        checkPageBreak(labelHeight + photoBlockHeight);

        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(labelText, margin, cursorY);
        cursorY += 8;
        cursorY = addPhotosToDoc(doc, photos, cursorY, margin, checkPageBreak);
      }
    }

    // --- Handle Table-based Sections ---
    if (section.type === 'table' && section.columns) {
      const isGridTable = section.tableType === 'grid';
      const tableData = Array.isArray(data[section.name]) ? data[section.name] as any[] : [];
      const head = [section.columns];
      let body: string[][];

      if (isGridTable) {
        body = tableData.map(row => section.columns!.map(col => row[col] || ''));
      } else {
        body = (section.rows || []).map((rowLabel, rowIndex) => {
            return section.columns!.map((col, colIndex) => {
                if (colIndex === 0) return rowLabel;
                return tableData[rowIndex]?.[col] || '';
            });
        });
      }
      
      if (body.length > 0) {
        checkPageBreak(20); // Minimum table height
        doc.autoTable({
          startY: cursorY,
          head: head,
          body: body,
          theme: 'grid',
          headStyles: { 
            fillColor: [230, 230, 230], 
            textColor: [0, 0, 0], 
            fontStyle: 'bold'
          },
          styles: {
            lineColor: [180, 180, 180],
            lineWidth: 0.1,
          },
          didDrawPage: (hookData: any) => { cursorY = hookData.cursor.y; } // Update cursor after page break
        });
        cursorY = (doc as any).lastAutoTable.finalY + 10;
      }


       const tablePhotos: { rowIndex: number; photos: StoredFile[] }[] = [];
       tableData.forEach((row, rowIndex) => {
           if(row.photos && row.photos.length > 0) {
               tablePhotos.push({ rowIndex, photos: row.photos });
           }
       });

       if (tablePhotos.length > 0) {
            checkPageBreak(12);
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text("Photos for Table Section:", margin, cursorY);
            cursorY += 8;

            tablePhotos.forEach(item => {
                const rowLabel = section.rows?.[item.rowIndex] || `Row ${item.rowIndex + 1}`;
                const textForLabel = `For item: "${rowLabel}"`;
                const photos = item.photos;
                
                // Pre-calculate the total height needed for the label and its photos
                const labelHeight = doc.getTextDimensions(doc.splitTextToSize(textForLabel, 180)).h + 6;
                const photoBlockHeight = getPhotosBlockHeight(photos);
                
                // Check if the entire block fits, if not, move to a new page
                checkPageBreak(labelHeight + photoBlockHeight);

                // Now render the label and photos, assured they will be together
                doc.setFont(undefined, 'bold');
                const actualLabelHeight = addText(doc, textForLabel, margin, cursorY, {});
                cursorY += actualLabelHeight + 6;
                
                cursorY = addPhotosToDoc(doc, photos, cursorY, margin, checkPageBreak);
            });
       }
    }
    cursorY += 5; // Space between sections
  });

  doc.save(`${schema.department.replace(/\s+/g, '-')}-report.pdf`);
};