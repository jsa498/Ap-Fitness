import emailjs from '@emailjs/browser';

interface EmailData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  serviceType?: string;
  experience?: string;
  goals?: string;
  preferredTime?: string;
}

const formatEmailTemplate = (data: EmailData) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f8f8;">
      <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; text-align: center;">New Inquiry from AP Fitness Website</h1>
      </div>
      
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Contact Information</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
      </div>
      
      ${data.serviceType ? `
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Service Details</h2>
        <p><strong>Service Type:</strong> ${data.serviceType}</p>
        ${data.experience ? `<p><strong>Experience Level:</strong> ${data.experience}</p>` : ''}
        ${data.preferredTime ? `<p><strong>Preferred Time:</strong> ${data.preferredTime}</p>` : ''}
      </div>
      ` : ''}
      
      ${data.goals ? `
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Goals</h2>
        <p>${data.goals}</p>
      </div>
      ` : ''}
      
      <div style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
        <h2 style="color: #dc2626; margin-top: 0;">Message</h2>
        <p>${data.message}</p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #666666; font-size: 12px;">
        <p>This email was sent from the AP Fitness website contact form.</p>
      </div>
    </div>
  `;
};

export const sendEmail = async (data: EmailData) => {
  try {
    // Send email to business
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        to_email: 'info@apfitness.com',
        from_name: data.name,
        from_email: data.email,
        subject: data.subject || 'New Inquiry from Website',
        message_html: formatEmailTemplate(data),
        ...data
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    // Send confirmation email to customer
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID!,
      {
        to_name: data.name,
        to_email: data.email,
        subject: 'Thank you for contacting AP Fitness'
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('Email send failed:', error);
    throw error;
  }
};

export const sendClassBookingEmail = async (data: EmailData & { className: string; classTime: string; classDate: string }) => {
  try {
    // Send booking confirmation to business
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_CLASS_BOOKING_TEMPLATE_ID!,
      {
        to_email: 'info@apfitness.com',
        from_name: data.name,
        from_email: data.email,
        subject: `New Class Booking: ${data.className}`,
        class_name: data.className,
        class_time: data.classTime,
        class_date: data.classDate,
        message_html: formatEmailTemplate({
          ...data,
          subject: `Class Booking: ${data.className}`,
          message: `Class Details:\nClass: ${data.className}\nDate: ${data.classDate}\nTime: ${data.classTime}\n\nAdditional Message: ${data.message}`
        }),
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    // Send confirmation to customer
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_CLASS_CONFIRMATION_TEMPLATE_ID!,
      {
        to_name: data.name,
        to_email: data.email,
        class_name: data.className,
        class_time: data.classTime,
        class_date: data.classDate,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('Class booking email send failed:', error);
    throw error;
  }
}; 