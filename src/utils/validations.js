
export const validations = {

/* --------------------------------------------------------------------------------------------- */

  email: str => {

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return {
      result: regex.test(str),
      error: str.indexOf('@') === -1 ? null : {
        en: 'It almost looks like an email',
        es: 'Ya casi parece un email',
      },
    };

  },

/* --------------------------------------------------------------------------------------------- */

  name: str => {
    const minLength = 5;
    return {
      result: str.trim().length >= minLength,
      error: {
        en: `At least ${minLength} characters`,
        es: `Mínimo ${minLength} caracteres`,
      },
    };
  },

/* --------------------------------------------------------------------------------------------- */

  password: str => {
    const noSpaces = /^\S+$/.test(str);
    if (!noSpaces && str.length > 0) {
      return {
        result: false,
        error: {
          en: 'Password can\'t contain white spaces',
          es: 'La contraseña no puede contener espacios',
        },
      };
    }
    const minLength = 8;
    return {
      result: str.length >= minLength,
      error: {
        en: `At least ${minLength} characters`,
        es: `Mínimo ${minLength} caracteres`,
      },
    };

  }


};

