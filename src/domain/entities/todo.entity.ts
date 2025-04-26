export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  get isCompletedAt() {
    return !!this.completedAt;
  }

  
}
