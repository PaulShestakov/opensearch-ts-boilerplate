export const startServer = (app: any) => {
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`App is listening at port: ${port}`);
  });
};
