/**
 * Professional Email Validation Utility
 * 
 * Validates that email addresses are from professional domains
 * and not from free email providers or temporary email services.
 */

export function isProfessionalEmail(email: string): boolean {
  // List of common free email providers
  const freeEmailProviders = [
    'gmail.com', 'googlemail.com',
    'yahoo.com', 'ymail.com', 'rocketmail.com',
    'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
    'icloud.com', 'me.com',
    'aol.com', 'aim.com',
    'protonmail.com', 'proton.me',
    'zoho.com', 'yandex.com', 'mail.ru',
    'gmx.com', 'gmx.net', 'gmx.us',
    'fastmail.com', 'hushmail.com'
  ];

  // List of known temporary email domains
  const tempEmailDomains = [
    'tempmail.com', 'temp-mail.org', '10minutemail.com',
    'guerrillamail.com', 'mailinator.com', 'fakeinbox.com',
    'throwawaymail.com', 'tempinbox.com', 'temp-mail.io',
    'mailcatch.com', 'getnada.com', 'trashmail.com',
    '10minutemail.net', '20minutemail.com', '33mail.com',
    'emailondeck.com', 'fake-mail.net', 'jetable.org',
    'maildrop.cc', 'mail-eater.com', 'mailnesia.com',
    'mohmal.com', 'mytrashmail.com', 'nowmymail.com',
    'tempmail.net', 'tempmail.org', 'tempmail.pro',
    'yopmail.com', 'temp-mail.org'
  ];

  // Extract domain from email
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;

  // Check if domain is in free email providers list
  if (freeEmailProviders.includes(domain)) {
    return false;
  }

  // Check if domain is in temporary email domains list
  if (tempEmailDomains.includes(domain)) {
    return false;
  }

  // Additional checks for common patterns in temporary emails
  if (domain.includes('temp') || domain.includes('fake') || domain.includes('throw')) {
    return false;
  }

  // Domain must have at least one dot and be at least 5 characters
  if (domain.split('.').length < 2 || domain.length < 5) {
    return false;
  }

  // Domain should not be just numbers
  if (/^\d+\.\w+$/.test(domain)) {
    return false;
  }

  return true;
}

export function validateOrganizationEmail(email: string, organizationName: string): { valid: boolean; message?: string } {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }

  // Check if email is professional
  if (!isProfessionalEmail(email)) {
    return { 
      valid: false, 
      message: 'Please use a professional organizational email address (not Gmail, Yahoo, or temporary emails)'
    };
  }

  // Check if email domain matches organization name (basic check)
  const emailDomain = email.split('@')[1]?.toLowerCase();
  const orgName = organizationName.toLowerCase().replace(/\s+/g, '');
  
  // If organization name is provided, do a basic domain check
  if (organizationName && orgName.length > 3) {
    if (!emailDomain.includes(orgName) && !emailDomain.includes('gov') && !emailDomain.includes('org')) {
      return { 
        valid: false,
        message: `For security, please use an email address associated with your organization (${organizationName})`
      };
    }
  }

  return { valid: true };
}

export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}