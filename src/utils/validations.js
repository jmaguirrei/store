
export const validations = {

/* --------------------------------------------------------------------------------------------- */

  email: str => {

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return {
      result: regex.test(str),
      error: {
        en: 'Invalid email format',
        es: 'Formato de email no válido',
      },
    };

  },

/* --------------------------------------------------------------------------------------------- */

  name: str => {
    return {
      result: str.trim().length >= 2,
      error: {
        en: 'Name should have at least 2 characters',
        es: 'El nombre debe tener al menos 2 caracteres',
      },
    };
  },

/* --------------------------------------------------------------------------------------------- */

  password: str => {
    const noSpaces = /^\S+$/.test(str);
    if (!noSpaces) {
      return {
        result: false,
        error: {
          en: 'Password can not contain white spaces',
          es: 'La contraseña no puede contener espacios',
        },
      };
    }
    return {
      result: str.length >= 8,
      error: {
        en: 'Password must have at least 8 characters',
        es: 'La contraseña debe tener al menos 8 caracteres',
      },
    };

  }


};

