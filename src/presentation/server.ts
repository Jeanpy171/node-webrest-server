import express, { Router } from "express";
import path from "path";

interface Options {
  PORT: number;
  router: Router;
  PUBLIC_PATH: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { PORT, PUBLIC_PATH, router } = options;
    this.port = PORT;
    this.publicPath = PUBLIC_PATH;
    this.routes = router;
  }

  async start() {
    //*Middleware
    this.app.use(express.json()); //raw
    this.app.use(express.urlencoded({ extended: true })); //x-www-form-urlencoded
    //*Public
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);
    // this.app.get("/api/todos", (req, res) => {
    //   res.json([
    //     {
    //       id: 1,
    //       text: "Buy milk",
    //       createdAt: new Date(),
    //     },
    //     {
    //       id: 2,
    //       text: "Buy bread",
    //       createdAt: null,
    //     },
    //     {
    //       id: 3,
    //       text: "Buy butter",
    //       createdAt: new Date(),
    //     },
    //   ]);
    // });

    //* SPA
    this.app.use((req, res) => {
      const indexPath = path.join(
        `${__dirname}../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on PORT ${this.port}`);
    });
  }
}
