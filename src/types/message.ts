export interface CommandResult<T = any> {
  type: 'commandResult';
  data: T;
  id: string;
}

export interface ReadyResult {
  type: 'onReady';
  data: null;
}
