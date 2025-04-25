export class CreateTodoDto {
  constructor(public readonly text: string) {}

  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    if (props === undefined) return ["You need provided the properties", undefined];
    const { text } = props;

    if (!text) return ["Text property is required", undefined];

    return [undefined, new CreateTodoDto(text)];
  }
}
