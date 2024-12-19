# Utils by `edu-tosel`

# migrate from version 0 to version 1

from this

```Typescript
const { getExpressLoggerRouter, createMapObject } = require('@edu-tosel/utils');


(async()=>{
  const app = express();
  const user = userService.getUsers();
  const userMap = createMapObject(user, 'id');

  ...

  app.use(await getExpressLoggerRouter());
})()

```

to this

```Typescript
const { createExpressLoggerRouter } = require('@edu-tosel/express-utils');
const { createRecord } = require('@edu-tosel/utils');

(async()=>{
  const app = express();
  const user = userService.getUsers();
  const userRecord = createRecord(user, 'id');

  ...

  app.use(createExpressLoggerRouter());
})()

```
