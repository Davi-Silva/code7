import Admin from '@models/Admin/Admin';

export async function validateRegisterAdminInput(
  email: string,
  username: string,
): Promise<{ errors: string[]; valid: boolean }> {
  try {
    const errors: string[] = [];

    const adminEmailObj = await Admin.findOne({
      where: {
        email,
      },
    });

    const adminUsernameObj = await Admin.findOne({
      where: {
        username,
      },
    });

    if (adminEmailObj) {
      errors.push('This email is already taken');
    }

    if (adminUsernameObj) {
      errors.push('This username is already taken');
    }

    if (errors.length > 0) {
      return {
        errors,
        valid: false,
      };
    }

    return {
      errors: [],
      valid: true,
    };
  } catch (err) {
    return {
      errors: [err.message],
      valid: false,
    };
  }
}
