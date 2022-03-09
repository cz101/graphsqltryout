
import { products } from './data';
import { Keystone } from '@keystonejs/keystone'

//const { Keystone } = require('@keystonejs/keystone');
import {MongooseAdapter} from '@keystonejs/adapter-mongoose'

export async function insertSeedData( keystone: any) {
 // setup code

 const adapter = keystone.adapters.MongooseAdapter
 const { mongoose } = adapter;
 mongoose.set("debug", true);

 for (const product of products) {
  console.log(`  🛍️ Adding Product: ${product.name}`);
  const { _id } = await  adapter
    .model('ProductImage')
    .create({ image: product.photo, altText: product.description });
  product.photo = _id;
  await mongoose.model('Product').create(product);
}

  /*
  // Keystone API changed, so we need to check for both versions to get keystone
// const keystone = Keystone.keystone ;
 // const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;
 const adapter = new MongooseAdapter ({ mongoUri: 'mongodb://localhost/keystonedb' })
//const keystone = new Keystone ({adapter})

const { mongoose } = adapter;


  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);

  
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    const { _id } = await  adapter
      .model('ProductImage')
      .create({ image: product.photo, altText: product.description });
    product.photo = _id;
    await mongoose.model('Product').create(product);
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
  process.exit();

  */
}

