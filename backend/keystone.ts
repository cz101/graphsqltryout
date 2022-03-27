import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import  {User}  from './schemas/User';
import  {Product}  from './schemas/Product';
import  {ProductImage}  from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
//import { insertSeedData } from './seed-data';
//import {extendGraphqlSchema} from "./mutations/index"
import {extendGraphqlSchema } from './mutations';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';



const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost:27017/KeystoneDB';


console.log(`the db link is ${process.env.DATABASE_URL}`)

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long user stay once they signed 
  secret: process.env.COOKIE_SECRET,
};


const {withAuth} = createAuth({ 
  
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in inital roles here
  },
  
 
  passwordResetLink: {
    async sendToken(args) {
      // send the email
       console.log (args)
      //await sendPasswordResetEmail(args.token, args.identity);
    },
  },

})
export default withAuth(config({
  
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      /*
      async onConnect(keystone) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      }
      */
    },
    
    lists: createSchema({
        User : User,
        Product: Product,
        ProductImage : ProductImage,
        CartItem:CartItem,
        OrderItem:OrderItem,
        Order:Order
      }),
    extendGraphqlSchema,
    
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ( {session}) => {
       // console.log(session)
        return !!session?.data

      }
    },

      // to do add session 
      session: withItemData(statelessSessions(sessionConfig), {
        User: `id`,
      }),
  }));


/*{ withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add in inital roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

*/
/*
export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    }),
    extendGraphqlSchema,
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: `id name email role { ${permissionsList.join(' ')} }`,
    }),
  })
);
*/