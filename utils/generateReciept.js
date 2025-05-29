import jsPDF from 'jspdf';

export function generateReceipt(bookingData) {
  const {
    name,
    phone,
    email,
    dob,
    service,
    appointment_time,
    provider_id,
  } = bookingData;

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text('Lock’d In Appointment Receipt', 20, 20);
  doc.setFontSize(12);

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Date of Birth: ${dob}`,
    `Service: ${service}`,
    `Appointment Time: ${new Date(appointment_time).toLocaleString()}`,
    `Provider: ${provider_id}`,
  ];

  lines.forEach((line, i) => doc.text(line, 20, 40 + i * 10));

  doc.save(`LockdIn_Receipt_${name.replaceAll(' ', '_')}.pdf`);
}
