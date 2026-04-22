import nodemailer from 'nodemailer'

let transporter

try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
} catch (error) {
  console.log('Email service not configured')
}

export async function sendBookingConfirmation(booking, service) {
  if (!transporter) {
    console.log('Email service not available')
    return
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@olaspa.com',
      to: booking.clientEmail,
      subject: `Booking Confirmed - Ola Spa - ${booking.confirmationCode}`,
      html: `
        <h2>Booking Confirmed!</h2>
        <p>Dear ${booking.clientName},</p>
        <p>Your appointment has been confirmed at Ola Spa.</p>
        <h3>Booking Details</h3>
        <ul>
          <li><strong>Service:</strong> ${service.name}</li>
          <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${booking.timeSlot}</li>
          <li><strong>Duration:</strong> ${service.duration} minutes</li>
          <li><strong>Price:</strong> $${booking.price}</li>
          <li><strong>Confirmation Code:</strong> ${booking.confirmationCode}</li>
        </ul>
        <p>Please save your confirmation code for your records.</p>
        <p>Thank you for choosing Ola Spa!</p>
        <p>Best regards,<br>Ola Spa Team</p>
      `,
    })
    console.log('Confirmation email sent to', booking.clientEmail)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export function generateConfirmationCode() {
  const date = new Date()
  const year = date.getFullYear()
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, '0')
  return `OLA-${year}-${random}`
}
