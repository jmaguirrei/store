

export function processOptimistic(Store, args) {

  const { _id, domain, attrs } = args;

  if (!Store.db.data[domain]) Store.db.data[domain] = [];
  const findEntity = Store.db.data[domain].find(item => item._id === _id);

  /*
    Case 1: New Entity
  */

  if (!findEntity) {

    // Create entity
    Store.db.data[domain].push({
      _id,
      attrs: Object.keys(attrs).reduce((acum, key) => {
        return {
          ...acum,
          [key]: {
            value: attrs[key],
            dbValue: null,
            status: 0,
            timestamp: Date.now(),
          },
        };
      }, {}),
    });

  } else {

  /*
    Case 2: Existing entity, new attrs
  */

    // Update entity
    Object.keys(attrs).forEach(key => {
      const dbValue = attrs[key].value;
      findEntity.attrs[key] = {
        value: attrs[key],
        dbValue,
        status: 0,
        timestamp: Date.now(),
      };
    });

  }


  Store.methods.render();

  return isOK => {

    if (!findEntity && !isOK) {
      // New Entity + error => Remove the entity
      Store.db.data[domain] = Store.db.data[domain].filter(item => item._id !== _id);

    } else {
      // New Entity + ok || Existing entity => Update fields

      const entity = Store.db.data[domain].find(item => item._id === _id);

      Object.keys(entity.attrs).forEach(key => {
        const field = entity.attrs[key];
        if (field.status === 0) {
          field.status = isOK ? 2 : 1;
          if (!isOK) field.value = field.dbValue;
          if (isOK) field.dbValue = field.value;
          field.timestamp = Date.now();
        }
      });

    }

    if (!isOK) Store.methods.render();

  };

}

