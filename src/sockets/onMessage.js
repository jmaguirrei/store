

export function onMessage(Store) {

  return payload => {
    const { data, isInitial } = payload;
    if (isInitial) console.log('Socket first message --> ', payload);

    if (data) {
      const { _id, domain, attrs } = data;
      if (!Store.db.data[domain]) Store.db.data[domain] = [];
      const findEntity = Store.db.data[domain].find(item => item._id === _id);

      if (!findEntity) {

        // Create entity
        Store.db.data[domain].push({
          _id,
          attrs: attrs.reduce((acum, item) => {
            const { key, value, timestamp } = item;
            return {
              ...acum,
              [key]: {
                value,
                dbValue: value,
                status: 3,
                timestamp,
              },
            };
          }, {}),
        });

      } else {

        // Update entity
        attrs.forEach(item => {
          const { key, value, timestamp } = item;
          findEntity.attrs[key] = {
            value,
            dbValue: value,
            status: 3,
            timestamp,
          };
        });

      }

      Store.methods.render();

    }
  };

}

