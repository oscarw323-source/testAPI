import { app, HTTP_STATUSES } from "./app";
export { app, HTTP_STATUSES };

const port = 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
