// PDF Export Logic for Form 14 & Form 15 using jsPDF
// Balkrishna Driving School, Solapur
// Tailored to replicate the paper registers used in Solapur RTO

/**
 * Helper to convert standard date string (YYYY-MM-DD) to Indian format (DD/MM/YYYY)
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
  } catch (e) {}
  return dateStr;
}

/**
 * Export Trainee Form 14 PDF
 * Single-page layout matching the official RTO register
 */
export function exportForm14(trainee) {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    alert('jsPDF library not loaded. Please wait or check your internet connection.');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;

  // Header Title matching official template
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('FORM 14', pageWidth / 2, 18, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text('[See rule 27(a)]', pageWidth / 2, 23, { align: 'center' });
  
  doc.setFontSize(10.5);
  doc.text('REGISTER SHOWING THE ENROLMENT OF TRAINEE (S)', pageWidth / 2, 29, { align: 'center' });
  doc.text('IN THE DRIVING SCHOOL ESTABLISHMENTS', pageWidth / 2, 33, { align: 'center' });

  // Photo Box (Top Right)
  const photoX = pageWidth - margin - 35;
  const photoY = 40;
  doc.setLineWidth(0.3);
  doc.rect(photoX, photoY, 35, 45);
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Affix trainee\'s', photoX + 17.5, photoY + 20, { align: 'center' });
  doc.text('photograph here', photoX + 17.5, photoY + 24, { align: 'center' });

  // Left Content details
  doc.setFontSize(9.5);
  let y = 44;
  const lineSpacing = 7.5;
  const valX = 65;

  // Year estimation
  let enrollYear = new Date().getFullYear().toString();
  if (trainee.date_of_enrollment) {
    enrollYear = trainee.date_of_enrollment.substring(0, 4);
  }
  doc.setFont('Helvetica', 'normal');
  doc.text('Register for the year: ', margin, 40);
  doc.setFont('Helvetica', 'bold');
  doc.text(enrollYear, margin + 35, 40);

  // 1. Enrollment Number
  doc.setFont('Helvetica', 'normal');
  doc.text('1. Enrollment Number', margin, y);
  doc.line(margin + 38, y + 1, photoX - 5, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.enrollment_number || '-', margin + 40, y);

  // 2. Name of the trainee
  y += lineSpacing;
  doc.setFont('Helvetica', 'normal');
  doc.text('2. Name of the trainee:', margin, y);
  doc.line(margin + 38, y + 1, photoX - 5, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.full_name || '-', margin + 40, y);

  // 3. Relation & Guardian Name
  y += lineSpacing;
  doc.setFont('Helvetica', 'normal');
  doc.text(`3. ${trainee.guardian_relation || 'Son / Wife / Daughter of'}:`, margin, y);
  doc.line(margin + 38, y + 1, photoX - 5, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.guardian_name || '-', margin + 40, y);

  // 4. Addresses
  y += lineSpacing;
  doc.setFont('Helvetica', 'normal');
  doc.text('4. Address', margin, y);
  
  y += 5.5;
  doc.text('(a) Permanent Address:', margin + 4, y);
  doc.line(margin + 44, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.permanent_address || '-', margin + 46, y);

  y += 6.5;
  doc.setFont('Helvetica', 'normal');
  doc.text('(b) Temporary Address/official address (if any):', margin + 4, y);
  doc.line(margin + 76, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.temporary_address || '-', margin + 78, y);

  // 5. DOB
  y += lineSpacing;
  doc.setFont('Helvetica', 'normal');
  doc.text('5. Date of birth:', margin, y);
  doc.line(margin + 28, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(formatDate(trainee.date_of_birth), margin + 30, y);

  // 6. DOE
  y += lineSpacing;
  doc.setFont('Helvetica', 'normal');
  doc.text('6. Date of enrollment:', margin, y);
  doc.line(margin + 38, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(formatDate(trainee.date_of_enrollment), margin + 40, y);

  // 7. LLR Details
  y += lineSpacing;
  doc.setFont('Helvetica', 'normal');
  doc.text('7. Learner\'s licence number and date of it\'s expiry:', margin, y);
  doc.line(margin + 83, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  const llrExpiry = trainee.learners_licence_expiry ? ` (Expires: ${formatDate(trainee.learners_licence_expiry)})` : '';
  doc.text((trainee.learners_licence_number || '-') + llrExpiry, margin + 85, y);

  // 8. Test Competence Date
  y += lineSpacing;
  doc.setFont('Helvetica', 'normal');
  doc.text('8. Date of passing the test of competence to drive:', margin, y);
  doc.line(margin + 82, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(formatDate(trainee.test_competence_date) || '-', margin + 84, y);

  // 9. DL Details
  y += lineSpacing;
  doc.setFont('Helvetica', 'normal');
  doc.text('9. Driving licence number and date of issue and the licence authority which issued the licence:', margin, y);
  
  y += 5.5;
  doc.line(margin, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  let dlDetails = '-';
  if (trainee.driving_licence_number) {
    dlDetails = `${trainee.driving_licence_number} (Issued: ${formatDate(trainee.driving_licence_issue_date)}) by ${trainee.driving_licence_authority || 'RTO Solapur'}`;
  }
  doc.text(dlDetails, margin + 2, y);

  // Course table drawing (Matches the table grid in Form 14 image)
  y += 12;
  const tableTop = y;
  const colX = [
    margin,
    margin + 75,
    margin + 105,
    margin + 135,
    pageWidth - margin
  ];

  doc.setLineWidth(0.4);
  // Header box
  doc.rect(margin, tableTop, pageWidth - (margin * 2), 15);
  // Split header cells
  doc.line(colX[1], tableTop, colX[1], tableTop + 15);
  doc.line(colX[3], tableTop, colX[3], tableTop + 15);
  // Split Period cell horizontally
  doc.line(colX[1], tableTop + 7, colX[3], tableTop + 7);
  doc.line(colX[2], tableTop + 7, colX[2], tableTop + 15);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Course of Training in Driving', margin + 37.5, tableTop + 9, { align: 'center' });
  doc.text('Period', margin + 105, tableTop + 5, { align: 'center' });
  doc.text('From', margin + 90, tableTop + 12, { align: 'center' });
  doc.text('To', margin + 120, tableTop + 12, { align: 'center' });
  doc.text('Remarks', margin + 155, tableTop + 9, { align: 'center' });

  // Data row box
  const rowHeight = 18;
  doc.rect(margin, tableTop + 15, pageWidth - (margin * 2), rowHeight);
  doc.line(colX[1], tableTop + 15, colX[1], tableTop + 15 + rowHeight);
  doc.line(colX[2], tableTop + 15, colX[2], tableTop + 15 + rowHeight);
  doc.line(colX[3], tableTop + 15, colX[3], tableTop + 15 + rowHeight);

  doc.setFont('Helvetica', 'normal');
  doc.text(trainee.course_assigned || '-', margin + 4, tableTop + 25);
  doc.text(formatDate(trainee.training_period_from), margin + 77, tableTop + 25);
  doc.text(formatDate(trainee.training_period_to), margin + 107, tableTop + 25);
  
  // Remarks text wrap
  const remarksText = trainee.remarks || '-';
  const remarksLines = doc.splitTextToSize(remarksText, 42);
  doc.text(remarksLines, margin + 137, tableTop + 22);

  // Footer / Signatures
  y = pageHeight - margin - 22;
  doc.setFont('Helvetica', 'normal');
  doc.text('13.Signature of the licence holder / Instructor', margin, y);
  
  doc.setFont('Helvetica', 'bold');
  doc.text('Balkrishna Driving School,', pageWidth - margin - 55, y);
  doc.text('Solapur.', pageWidth - margin - 55, y + 4.5);

  // Save the PDF
  doc.save(`Form_14_${trainee.enrollment_number.replace(/\//g, '_')}.pdf`);
}

/**
 * Export Trainee Form 15 PDF
 * Daily logbook matching the 30-row register structure in Form 15 image
 */
export function exportForm15(trainee, sessions = [], schoolLicence = '', closedWeekday = 'Sunday') {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    alert('jsPDF library not loaded. Please wait or check your internet connection.');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 12;

  // 1. Draw top license & details boxes (Matches top grids of Form 15 image)
  doc.setLineWidth(0.3);
  
  // Top Left Box (Licence No. and Class)
  doc.rect(margin, 10, 65, 12);
  doc.line(margin, 16, margin + 65, 16);
  doc.line(margin + 20, 10, margin + 20, 22);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Licence No.', margin + 1, 14);
  doc.text('Class', margin + 1, 20);
  
  doc.setFont('Helvetica', 'bold');
  doc.text(schoolLicence || '-', margin + 22, 14);
  doc.text(trainee.course_assigned || '-', margin + 22, 20);

  // Top Right Box (Year and Number)
  const trBoxX = pageWidth - margin - 45;
  doc.rect(trBoxX, 10, 45, 12);
  doc.line(trBoxX, 16, trBoxX + 45, 16);
  doc.line(trBoxX + 15, 10, trBoxX + 15, 22);
  doc.line(trBoxX + 33, 16, trBoxX + 33, 22);

  doc.setFont('Helvetica', 'normal');
  doc.text('Year', trBoxX + 2, 14);
  doc.text('Number', trBoxX + 2, 20);

  const currentYear = trainee.date_of_enrollment ? trainee.date_of_enrollment.substring(0, 4) : new Date().getFullYear().toString();
  let seqNumber = '-';
  if (trainee.enrollment_number) {
    const parts = trainee.enrollment_number.split('-');
    if (parts.length >= 3) seqNumber = parts[2];
  }
  doc.setFont('Helvetica', 'bold');
  doc.text(currentYear, trBoxX + 17, 14);
  doc.text(seqNumber, trBoxX + 17, 20);

  // Main Headers
  doc.setFontSize(11);
  doc.text('FORM - 15', pageWidth / 2, 15, { align: 'center' });
  doc.setFontSize(8.5);
  doc.setFont('Helvetica', 'normal');
  doc.text('(See Rule 27 (i))', pageWidth / 2, 19, { align: 'center' });

  doc.setFontSize(14.5);
  doc.setFont('Helvetica', 'bold');
  doc.text('BALKRISHNA DRIVING SCHOOL, SOLAPUR.', pageWidth / 2, 26, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('Helvetica', 'italic');
  doc.text('Register Showing the driving hours spent by a trainee.', pageWidth / 2, 30, { align: 'center' });

  // Trainee Detail Lines (Double column matching layout)
  doc.setFontSize(9.5);
  doc.setFont('Helvetica', 'normal');
  
  let y = 37;
  // 1. Name of the Trainee
  doc.text('1. Name of the Trainee -', margin, y);
  doc.line(margin + 38, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.full_name || '-', margin + 40, y);

  // 2. Enrollment & 3. Date Enrollment
  y += 6.5;
  doc.setFont('Helvetica', 'normal');
  doc.text('2. Enrolment Number -', margin, y);
  doc.line(margin + 36, y + 1, margin + 115, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.enrollment_number || '-', margin + 38, y);

  doc.setFont('Helvetica', 'normal');
  doc.text('3. Date Enrolment -', margin + 120, y);
  doc.line(margin + 150, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(formatDate(trainee.date_of_enrollment), margin + 152, y);

  // 4. LLR & 5. Mobile
  y += 6.5;
  doc.setFont('Helvetica', 'normal');
  doc.text('4. Learning Licence No. -', margin, y);
  doc.line(margin + 38, y + 1, margin + 115, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.learners_licence_number || '-', margin + 40, y);

  doc.setFont('Helvetica', 'normal');
  doc.text('5. Mobile -', margin + 120, y);
  doc.line(margin + 138, y + 1, pageWidth - margin, y + 1);
  doc.setFont('Helvetica', 'bold');
  doc.text(trainee.phone || '94223 70787', margin + 140, y);

  // Grid headers parameters
  y += 7.5;
  const gridTop = y;
  const colX = [
    margin,              // Sr. No.
    margin + 10,         // Date
    margin + 30,         // Hours From
    margin + 45,         // Hours To
    margin + 60,         // Class of Vehicle
    margin + 115,        // Signature of Instructor
    margin + 148,        // Signature of trainee
    pageWidth - margin   // Right Boundary
  ];

  doc.setLineWidth(0.4);
  // Outer box headers
  doc.rect(margin, gridTop, pageWidth - (margin * 2), 12);
  
  // Dividers
  doc.line(colX[1], gridTop, colX[1], gridTop + 12);
  doc.line(colX[2], gridTop, colX[2], gridTop + 12);
  doc.line(colX[4], gridTop, colX[4], gridTop + 12);
  doc.line(colX[5], gridTop, colX[5], gridTop + 12);
  doc.line(colX[6], gridTop, colX[6], gridTop + 12);
  
  // Hours Subtitle split
  doc.line(colX[2], gridTop + 6, colX[4], gridTop + 6);
  doc.line(colX[3], gridTop + 6, colX[3], gridTop + 12);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Sr.', colX[0] + 5, gridTop + 5, { align: 'center' });
  doc.text('No.', colX[0] + 5, gridTop + 9, { align: 'center' });
  
  doc.text('Date', colX[1] + 10, gridTop + 7, { align: 'center' });
  
  doc.text('Hours spent in', colX[2] + 15, gridTop + 3.5, { align: 'center' });
  doc.text('actual driving', colX[2] + 15, gridTop + 5.5, { align: 'center' });
  doc.text('From', colX[2] + 7.5, gridTop + 10, { align: 'center' });
  doc.text('To', colX[3] + 7.5, gridTop + 10, { align: 'center' });

  doc.text('Class of', colX[4] + 27.5, gridTop + 5, { align: 'center' });
  doc.text('Vehicale', colX[4] + 27.5, gridTop + 9, { align: 'center' });

  doc.text('Signature of', colX[5] + 16.5, gridTop + 5, { align: 'center' });
  doc.text('Instructor', colX[5] + 16.5, gridTop + 9, { align: 'center' });

  doc.text('Signature of', colX[6] + 19, gridTop + 5, { align: 'center' });
  doc.text('trainee', colX[6] + 19, gridTop + 9, { align: 'center' });

  y += 12;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);

  const rowHeight = 6.2; // Fits 30 rows precisely on a4 height
  // Draw 30 rows register log
  for (let i = 0; i < 30; i++) {
    doc.rect(margin, y, pageWidth - (margin * 2), rowHeight);
    
    // inner lines
    doc.line(colX[1], y, colX[1], y + rowHeight);
    doc.line(colX[2], y, colX[2], y + rowHeight);
    doc.line(colX[3], y, colX[3], y + rowHeight);
    doc.line(colX[4], y, colX[4], y + rowHeight);
    doc.line(colX[5], y, colX[5], y + rowHeight);
    doc.line(colX[6], y, colX[6], y + rowHeight);

    doc.setFont('Helvetica', 'bold');
    doc.text((i + 1).toString(), colX[0] + 5, y + 4.5, { align: 'center' });
    doc.setFont('Helvetica', 'normal');

    const session = sessions[i];
    if (session) {
      doc.text(formatDate(session.session_date), colX[1] + 1.5, y + 4.5);
      doc.text(session.hours_from.substring(0, 5), colX[2] + 7.5, y + 4.5, { align: 'center' });
      doc.text(session.hours_to.substring(0, 5), colX[3] + 7.5, y + 4.5, { align: 'center' });
      doc.text(session.vehicle_class || '-', colX[4] + 2, y + 4.5);
      
      doc.setFontSize(7);
      doc.text(session.instructor_name || '-', colX[5] + 2, y + 4.5);
      doc.setFontSize(8.5);

      if (session.trainee_signed) {
        doc.text('SIGNED', colX[6] + 19, y + 4.5, { align: 'center' });
      }
    }

    y += rowHeight;
  }

  // NOTE : SUNDAY HOLIDAY Solid Block (Bottom Center)
  const holidayText = `NOTE : ${closedWeekday.toUpperCase()} HOLIDAY`;
  const blockWidth = 55;
  const blockHeight = 6;
  const blockX = (pageWidth / 2) - (blockWidth / 2);
  const blockY = y + 4;

  doc.setFillColor(0, 0, 0); // Black block
  doc.rect(blockX, blockY, blockWidth, blockHeight, 'F');
  
  doc.setTextColor(255, 255, 255); // White text
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(holidayText, pageWidth / 2, blockY + 4.2, { align: 'center' });

  // Save the PDF
  doc.save(`Form_15_${trainee.enrollment_number.replace(/\//g, '_')}.pdf`);
}
