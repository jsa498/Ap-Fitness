import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_CONSULTATION_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONSULTATION_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS with public key
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

interface EmailParams extends Record<string, unknown> {
  from_name: string;
  from_email: string;
  message: string;
  subject?: string;
  reply_to?: string;
  phone?: string;
}

interface ConsultationParams extends Record<string, unknown> {
  name: string;
  email: string;
  phone: string;
  weight?: string;
  gender?: string;
  age?: string;
  fitness_goal: string;
  experience_level: string;
  training_type: string;
  preferred_time: string;
  preferred_trainer?: string;
  selected_package?: string;
  additional_info?: string;
}

export const sendEmail = async (params: EmailParams) => {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
    console.error('EmailJS configuration is incomplete');
    return { success: false, error: 'Email service is not configured properly' };
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        ...params,
        reply_to: params.from_email
      },
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return { success: true, response };
    } else {
      throw new Error(`Failed to send email: ${response.text}`);
    }
  } catch (error) {
    console.error('Email send failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
};

export const sendConsultationEmail = async (params: ConsultationParams) => {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_CONSULTATION_TEMPLATE_ID) {
    console.error('EmailJS configuration is incomplete');
    return { success: false, error: 'Email service is not configured properly' };
  }

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_CONSULTATION_TEMPLATE_ID,
      {
        ...params,
        reply_to: params.email
      },
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      return { success: true, response };
    } else {
      throw new Error(`Failed to send consultation email: ${response.text}`);
    }
  } catch (error) {
    console.error('Consultation booking email failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send consultation request'
    };
  }
}; 