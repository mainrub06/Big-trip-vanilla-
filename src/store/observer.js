const callbacks = new Set();

const on = (callback) => {
  callbacks.add(callback);
};

const off = (callback) => {
  callbacks.delete(callback);
};

const fire = (payload) => {
  callbacks.forEach((callback) => {
    callback(payload);
  });
};

export default { on, off, fire };
