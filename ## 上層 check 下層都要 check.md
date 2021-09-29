## 上層 check 下層都要 check
監聽上層 checked 事件

有沒有一次修改所有子 訂單的方法？
- [x]子元件監聽上層改動
只讓主動行為影響 checked


## 下層有一個沒有 checked 上層就不能 checked

- list 內的 todo 更動
監聽整個 list 只要 list 中的其中一個 todo 有更動，就重新判斷一次更新上層的 check
監聽所有 list 中的 todo ，只要 list 內的 todo 更動，就拿所有的 list 中的 todo 做計算，判斷是否要改動到上層的

- list 數量增加，一律讓上層 check 是 false，或是判斷上層是 true 的時候才讓他是 false

可以主動控制不被動，不透過連鎖效應控制表單



// getValue or watch
// getValue 主動
// watch 被動

// setValue 可以用於主動和被動之後