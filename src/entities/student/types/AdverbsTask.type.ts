export interface AdverbsTask {
  taskId: string;
  weight: number;
  options: {
    word: string;
    correct: boolean;
  }[];
}