```mermaid
graph TD
  app[app.ts]

  express[express]
  db[db.ts]

  courses[courses routes]
  tests[tests routes]

  app --> express
  app --> db
  app --> courses
  app --> tests

  courses --> db
  tests --> db
```
