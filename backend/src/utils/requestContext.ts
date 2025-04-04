import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<Map<string, string>>();

export function setRequestId(id: string) {
  const store = new Map<string, string>();
  store.set("requestId", id);
  asyncLocalStorage.enterWith(store);
}

export function getRequestId(): string | undefined {
  return asyncLocalStorage.getStore()?.get("requestId");
}
