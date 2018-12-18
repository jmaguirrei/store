
export const validations = {

/* --------------------------------------------------------------------------------------------- */

  email: str => {

    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return {
      result: regex.test(str),
      error: {
        en: 'It doesn\'t look like and email yet',
        es: 'No parece un email aún',
      },
    };

  },

/* --------------------------------------------------------------------------------------------- */

  name: str => {
    return {
      result: str.trim().length >= 2,
      error: {
        en: 'At least 2 characters',
        es: 'Mínimo 2 caracteres',
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
        en: 'At least 8 characters',
        es: 'Mínimo 8 caracteres',
      },
    };

  }


};

