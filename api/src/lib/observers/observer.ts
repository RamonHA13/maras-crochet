export interface Observable<T> {
  observers: Set<T>
  subscribe: (observer: T) => void
  unsuscribe: (observer: T) => void
  notify: <U>(data: U) => void
}

export abstract class Observer<T> implements Observable<T> {
  observers: Set<T> = new Set<T>()
  subscribe(observer: T): void {
    this.observers.add(observer)
  }

  unsuscribe(observer: T): void {
    this.observers.delete(observer)
  }
  notify<U>(data: U): void {
    this.observers.forEach(x => this.update<U>(x, data))
  }

  protected abstract update<U>(observer: T, data: U): void
}
