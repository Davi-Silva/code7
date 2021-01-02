import sanitizeHtml from 'sanitize-html';

export function sanitizeRegisterInput(
  name: string,
  username: string,
  email: string,
): {
  name: string;
  username: string;
  email: string;
} {
  const cleanName = sanitizeHtml(name, {
    allowedTags: [],
  });

  const cleanEmail = sanitizeHtml(email, {
    allowedTags: [],
  });
  const cleanUsername = sanitizeHtml(username, {
    allowedTags: [],
  });

  return {
    name: cleanName,
    email: cleanEmail,
    username: cleanUsername,
  };
}

export function sanitizeLoginInput(
  email: string,
): {
  email: string;
} {
  const cleanEmail = sanitizeHtml(email, {
    allowedTags: [],
  });

  return {
    email: cleanEmail,
  };
}
