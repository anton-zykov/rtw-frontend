export interface GenitiveTask {
  taskId: string;
  weight: number;
  nominative: string;
  options: {
    word: string;
    correct: boolean;
  }[];
}
