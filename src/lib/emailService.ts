import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_CONSULTATION_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONSULTATION_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS with public key
let isInitialized = false;
try {
  if (EMAILJS_PUBLIC_KEY && !isInitialized) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    isInitialized = true;
    console.log('EmailJS initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize EmailJS:', error);
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

interface EmailResult {
  success: boolean;
  error?: string;
}

interface ConsultationData {
  name: string;
  email: string;
  phone: string;
  weight: string;
  age: string;
  gender: string;
  fitness_goal: string;
  experience_level: string;
  training_type: string;
  preferred_time: string;
  preferred_trainer: string;
  additional_info?: string;
  selected_package?: string;
  subject?: string;
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

export const sendConsultationEmail = async (data: ConsultationData): Promise<EmailResult> => {
  console.log('Starting email service...');
  
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_CONSULTATION_TEMPLATE_ID;
  
  if (!publicKey || !serviceId || !templateId) {
    console.error('Email service configuration missing:', {
      hasPublicKey: !!publicKey,
      hasServiceId: !!serviceId,
      hasTemplateId: !!templateId
    });
    return {
      success: false,
      error: 'Email service is not configured properly. Please contact support.'
    };
  }

  try {
    emailjs.init(publicKey);
    
    console.log('Sending consultation email with data:', {
      ...data,
      email: '***@***.***',
      phone: '(***)***-****'
    });
    
    // Simplified template parameters without conditional logic
    const templateParams = {
      to_name: 'AP Fitness Team',
      from_name: data.name,
      subject: data.subject || `New Consultation Request - ${data.name}`,
      // Personal Information
      name: data.name,
      email: data.email,
      phone: data.phone,
      // Physical Details
      weight: data.weight,
      age: data.age,
      gender: data.gender,
      // Fitness Profile
      fitness_goal: data.fitness_goal || 'Not specified',
      experience_level: data.experience_level,
      // Training Preferences
      training_type: data.training_type,
      preferred_time: data.preferred_time,
      preferred_trainer: data.preferred_trainer,
      // Optional Information
      additional_info: data.additional_info || 'No additional information provided',
      selected_package: 'To be discussed during consultation',
      // Add message field for compatibility
      message: `
Personal Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}

Physical Details:
- Age: ${data.age} years
- Weight: ${data.weight} lbs
- Gender: ${data.gender}

Fitness Profile:
- Goal: ${data.fitness_goal || 'Not specified'}
- Experience Level: ${data.experience_level}

Training Preferences:
- Training Type: ${data.training_type}
- Preferred Time: ${data.preferred_time}
- Preferred Trainer: ${data.preferred_trainer}

Additional Information:
${data.additional_info || 'No additional information provided'}
      `.trim()
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : 'Failed to send consultation request. Please try again or contact us directly.'
    };
  }
}; 