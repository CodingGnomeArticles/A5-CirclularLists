import { List } from "../dll"


let list: List<number>

describe("doubly-linked circular list", () => {

  beforeEach(() => list = new List())

  it(`starts out empty`, () => {
    expect(list.pop()).toBe(undefined)
  })

  it(`unshifts what it shifts`, () => {
    list.shift(99)
    expect(list.unshift()).toBe(99)
    expect(list.unshift()).toBe(undefined)
  })

  it(`unshifts in reverse order`, () => {
    ([5,6,7,8]).forEach(x => list.shift(x));
    ([8,7,6,5]).forEach(x => expect(list.unshift()).toBe(x))
  })

  it (`can intersperse shifts and unshifts`, () => {
    list.shift(1)
    list.shift(2)
    expect(list.unshift()).toBe(2)
    list.shift(3)
    expect(list.unshift()).toBe(3)
    expect(list.unshift()).toBe(1)
    expect(list.unshift()).toBe(undefined)
  })

  it(`pops what it pushes`, () => {
    list.push(99)
    expect(list.pop()).toBe(99)
    expect(list.pop()).toBe(undefined)
  })

  it(`pops in reverse order`, () => {
    ([5,6,7,8]).forEach(x => list.push(x));
    ([8,7,6,5]).forEach(x => expect(list.pop()).toBe(x))
  })

  it (`can intersperse pushes and pops`, () => {
    list.push(1)
    list.push(2)
    expect(list.pop()).toBe(2)
    list.push(3)
    expect(list.pop()).toBe(3)
    expect(list.pop()).toBe(1)
    expect(list.pop()).toBe(undefined)
  })

  it(`can mix and match`, () => {
    debugger
    list.shift(1)
    list.shift(2)
    expect(list.pop()).toBe(1)
    list.push(3)
    expect(list.unshift()).toBe(2)
    expect(list.unshift()).toBe(3)
    expect(list.unshift()).toBe(undefined)
  })

  it(`can determine if entries are in the list`, () => {
    ([5,6,7,8]).forEach(x => list.push(x));
    for (let i = 0; i < 10; i++) {
      expect(list.contains(i)).toBe( i >= 5 && i <= 8)
    }
  })

  function testCanRemove(el: number) {
    ([5,6,7,8]).forEach(x => list.push(x));
   
    expect(list.removeFirstMatch(el)).toBe(true)
    for (let i = 5; i <= 8; i++) {
      expect(list.contains(i)).toBe( i != el)
    }
  }

  it(`can remove the first element`, () => testCanRemove(5))
  it(`can remove the last element`, () => testCanRemove(8))
  it(`can remove a middle element`, () => testCanRemove(6))
})
