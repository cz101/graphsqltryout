
import { products } from './data';
const { Keystone } = require('@keystonejs/keystone');
const { MongooseAdapter } = require('@keystonejs/adapter-mongoose');

export async function insertSeedData( ) {
  // Keystone API changed, so we need to check for both versions to get keystone
// const keystone = Keystone.keystone ;
 // const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;
const keystone = new Keystone({
  adapter: new MongooseAdapter({ mongoUri: 'mongodb://localhost/keystonedb' }),
});
  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
// const { mongoose } = keystone.adapters.MongooseAdapter;
  const { mongoose } = keystone.adapter;
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    const { _id } = await mongoose
      .model('ProductImage')
      .create({ image: product.photo, altText: product.description });
    product.photo = _id;
    await mongoose.model('Product').create(product);
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
  process.exit();
}

