import slugify from 'slugify';

export function toSlugLowerCase(string: string): string {
  return slugify(string).toLowerCase();
}

export function toSlug(string: string): string {
  return slugify(string);
}

export function toSlugUpperCase(string: string): string {
  return slugify(string);
}

export function toSlugCapitalized(string: string): string {
  let slug: string = slugify(string);
  const words: string[] = slug.split('-');
  let capitalized: string[] = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.substring(1, word.length);
  });
  return capitalized.join('-');
}
