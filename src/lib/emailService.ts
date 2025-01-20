import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_hqiwj3m';
const EMAILJS_TEMPLATE_ID = 'template_b4m7v0q';
const EMAILJS_CONSULTATION_TEMPLATE_ID = 'template_sxvid22';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

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
  additional_info?: string;
}

export const sendEmail = async (params: EmailParams) => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      params,
      EMAILJS_PUBLIC_KEY
    );
    return { success: true, response };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
};

export const sendConsultationEmail = async (params: ConsultationParams) => {
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
    return { success: true, response };
  } catch (error) {
    console.error('Consultation booking email failed:', error);
    return { success: false, error };
  }
}; 