import User from '../models/User.js';

const seedDefaultUser = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultEmail = process.env.DEFAULT_USER_EMAIL || 'admin@safi-plant.ma';
      const defaultPassword = process.env.DEFAULT_USER_PASSWORD || 'Admin@1234';

      await User.create({
        email: defaultEmail,
        password: defaultPassword,
      });

      console.log(`Default user created: ${defaultEmail}`);
    }
  } catch (error) {
    console.error(`Failed to seed default user: ${error.message}`);
  }
};

export default seedDefaultUser;