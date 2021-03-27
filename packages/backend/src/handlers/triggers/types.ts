export interface TriggerPayload<T> {
  event: {
    session_variables: { [x: string]: string };
    op: 'INSERT' | 'UPDATE' | 'DELETE' | 'MANUAL';
    data: {
      old: T | null;
      new: T | null;
    };
  };
  created_at: string;
  id: string;
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };
  trigger: {
    name: string;
  };
  table: {
    schema: string;
    name: string;
  };
}
