class ListNode<T> {

  next: ListNode<T>
  prev: ListNode<T>


  constructor(public payload?: T) {
    this.next = this.prev = this
  }
}

export class List<T> {
  head = new ListNode<T>()     // this never holds real data


  // shift: add to start of list
  shift(payload: T): void {
    this.insertBefore(payload, this.head.next)
  }

  // unshift: remove from start of list
  unshift(): T | undefined {
    const result =  this.removeBefore(this.head.next.next)
    return result.payload
  }

  // Push onto end of list
  push(payload: T): void {
    this.insertBefore(payload, this.head)
  }

  // pop and return from end of list
  pop(): T | undefined {
    const result = this.removeBefore(this.head)
    return result.payload
  }

  // remove the node containing the given payload
  removeFirstMatch(payload: T): boolean {
    const node = this.findFirstWithPayload(payload)
    if (!node)
      return false
    this.removeBefore(node.next)
    return true
  }

  // return true if the payload is in the list
  contains(payload: T) {
    return !!this.findFirstWithPayload(payload)
  }

  // --------------------------------------------------------------
  // actual implementation
  private insertBefore(payload: T, anchor: ListNode<T>): void {
    const newNode    = new ListNode(payload)
    newNode.prev     = anchor.prev
    newNode.next     = anchor
    anchor.prev.next = newNode
    anchor.prev      = newNode
  }

  private removeBefore(anchor: ListNode<T>): ListNode<T> {
    const result     = anchor.prev
    result.prev.next = anchor
    anchor.prev      = result.prev

    return result
  }

  private findFirstWithPayload(payload: T): ListNode<T> | undefined {
    for (let ptr = this.head.next; ptr != this.head; ptr = ptr.next) {
      if (ptr.payload == payload)
        return ptr
    }
    return undefined
  }
}
