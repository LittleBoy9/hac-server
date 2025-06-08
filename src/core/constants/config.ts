import * as Joi from 'joi';
import envSchema from './env-schema';

const schema = Joi.object(envSchema);
const data: Record<string, any> = {};

Object.keys(envSchema).forEach((each) => {
  data[each] = process.env[each];
});
const validationResult = schema.validate(data);

const flattenToNested = (data: Record<string, any>): ConfigType => {
  const result: Record<string, any> = {};

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const keys = key.split('.'); // Split the dot-separated keys
    let currentLevel = result;

    keys.forEach((subKey, index) => {
      if (!currentLevel[subKey]) {
        currentLevel[subKey] = index === keys.length - 1 ? value : {};
      }
      currentLevel = currentLevel[subKey];
    });
  });

  return result as ConfigType;
};

let configData: ConfigType;

// Transform validated data into a nested object
if (!validationResult.error) {
  configData = flattenToNested(validationResult.value);
} else {
  console.error('Validation Error:', validationResult.error.details);
}

export default configData;
