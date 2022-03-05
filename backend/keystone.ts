import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import  {User}  from './schemas/User';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';


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
    },
    lists: createSchema({
        User : User,
      }),
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ( {session}) => {
        console.log(session)
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