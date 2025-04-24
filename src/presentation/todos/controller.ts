import { Request, Response } from "express";

const todos = [
  {
    id: 1,
    text: "Buy milk",
    completedAt: new Date(),
  },
  {
    id: 2,
    text: "Buy bread",
    completedAt: null,
  },
  {
    id: 3,
    text: "Buy butter",
    completedAt: new Date(),
  },
];

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req?.params;
    const idNumber = Number(id);
    if (!id || !idNumber) {
      //Bad request: etsa mandando mal la info
      res.status(400).json({
        message: "Id argument  is not a number",
      });
      return;
    }
    const filteredTodo = todos.find((todo) => todo.id == idNumber);

    if (!filteredTodo) {
      res.status(404).json({
        message: `Todo with id ${id} not found`,
      });
      return;
    }

    res.json(filteredTodo);
  };

  public createTodo = (req: Request, res: Response) => {
    const fields = ["text"];
    let emptyFields = "";
    if (!req?.body || Object.keys(req?.body)?.length !== fields?.length) {
      res.status(400).json({
        message: `You need provide correct properties only`,
      });
      return;
    }

    fields.map((field, index) => {
      if (!req.body[field] || req.body[field] === "") {
        emptyFields = `${emptyFields}${field}${
          index + 1 === fields.length ? "" : ","
        }`;
      }
    });

    if (emptyFields.length > 0) {
      res.status(400).json({
        message: `You need provide correct values at: ${emptyFields}`,
      });
      return;
    }

    const { text } = req.body;

    const newTodo = { id: todos.length + 1, text, completedAt: new Date() };
    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req?.params;
    const idNumber = Number(id);
    //const fields = ["text"];
    //let emptyFields = "";

    if (!id || !idNumber) {
      //Bad request: etsa mandando mal la info
      res.status(400).json({
        message: "Id argument  is not a number",
      });
      return;
    }

    if (!req?.body || Object.keys(req?.body)?.length === 0) {
      res.status(400).json({
        message: `You need provide properties to update`,
      });
      return;
    }

    // if (!req?.body || Object.keys(req?.body)?.length !== fields?.length) {
    //   res.status(400).json({
    //     message: `You need provide correct properties only`,
    //   });
    //   return;
    // }

    // fields.map((field, index) => {
    //   if (!req.body[field] || req.body[field] === "") {
    //     emptyFields = `${emptyFields}${field}${
    //       index + 1 === fields.length ? "" : ","
    //     }`;
    //   }
    // });

    // if (emptyFields.length > 0) {
    //   res.status(400).json({
    //     message: `You need provide correct values at: ${emptyFields}`,
    //   });
    //   return;
    // }

    const updateInfo = req.body;

    const indexTodo = todos.findIndex((todo) => todo.id === idNumber);
    if (indexTodo === -1) {
      res.status(404).json({
        message: `Todo with id ${id} not found`,
      });
      return;
    }
    const updatedTodo = { ...todos[indexTodo], ...updateInfo };
    todos[indexTodo] = updatedTodo;
    res.json(updatedTodo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req?.params;
    const idNumber = Number(id);

    if (!id || !idNumber) {
      res.status(400).json({
        message: "Id argument  is not a number",
      });
      return;
    }

    const indexTodo = todos.findIndex((todo) => todo.id === idNumber);
    if (indexTodo === -1) {
      res.status(404).json({
        message: `Todo with id ${id} not found`,
      });
      return;
    }
    todos.splice(indexTodo, 1);
    res.json(todos);
  };
}
