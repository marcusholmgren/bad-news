interface CreateLinkValues {
  url?: string;
  description?: string;
}

interface CreateLinkErrors {
  url?: string;
  description?: string;
}

export default function validateCreateLink(values: CreateLinkValues): CreateLinkErrors {
  const errors: CreateLinkErrors = {};

  // URL Errors
  if (!values.url) {
    errors.url = 'URL required';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = 'Invalid URL address';
  }

  // Description Errors
  if (!values.description) {
    errors.description = 'Description required';
  } else if (values.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  return errors;
}
