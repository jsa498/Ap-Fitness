export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (!phone) return 'Phone number is required';
  if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters long';
  return null;
};

export const validateAge = (age: string): string | null => {
  const ageNum = parseInt(age);
  if (!age) return 'Age is required';
  if (isNaN(ageNum) || ageNum < 16 || ageNum > 99) return 'Please enter a valid age between 16 and 99';
  return null;
};

export const validateWeight = (weight: string): string | null => {
  const weightNum = parseInt(weight);
  if (!weight) return 'Weight is required';
  if (isNaN(weightNum) || weightNum < 50 || weightNum > 500) return 'Please enter a valid weight between 50 and 500 lbs';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value) return `${fieldName} is required`;
  return null;
}; 