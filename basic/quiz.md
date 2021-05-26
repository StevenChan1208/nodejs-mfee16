# (1)請問下列程式執行後的結果為何？為什麼？


```
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();
    console.log("end");

```


    

> 解答:程式由上往下執行分別為 start→IIFE→end→Timeout，Javascript執行時，程序中的代碼依序進入stack中等待執行， 於是會先執行console.log("start")和console.log("IIFE") ，但當執行setTimeout()時，會被丟到webapi中並開始延時方法的處理， 當延時方法處理結束後，會被加入到（task queue) ，而當stack所有同步任務執行完畢，系統的事件迴圈(event loop)就會讀取task queue，看看裡面有哪些事件並讓它進入執行棧，開始執行。於是這範例結果依序會是console.log("end")後才是console.log("Timeout") 。
>




# (2) 請問下列程式執行的結果為何？為什麼？

```
console.log("start");

(function () {
    console.log("IIFE");
    setTimeout(function () {
        console.log("Timeout");
    }, 0);
})();

console.log("end");

```

    
>解答: 如同剛剛的邏輯，即使我們使用 0 秒，它一樣會先將 cb 放到 WebAPIs 的計時器中，當時間到時，把該 cb 放到工作佇列（task queue）內，「等到」所有堆疊的內容都被清空後才會「立即」執行這個 cb。 
程式由上往下執行分別為 start→IIFE→end→Timeout，Javascript執行時，程序中的代碼依序進入stack中等待執行， 於是會先執行console.log("start")和console.log("IIFE") ，但當執行setTimeout()時，會被丟到webapi中並開始延時方法的處理， 當延時方法處理結束後，會被加入到（task queue) ，而當stack所有同步任務執行完畢，系統的事件迴圈(event loop)就會讀取task queue，看看裡面有哪些事件並讓它進入執行棧，開始執行。於是這範例結果依序會是console.log("end")後才是console.log("Timeout") 。
>
# (3) 請問下列程式執行的結果為何？為什麼？

```
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
    console.log("foo");
    bar();
    baz();
};

foo();
```
    
>解答: foo→bar→baz，foo()呼叫函式後，會接續執行console.log("foo")和console.log("bar")最後是console.log("baz")。
>


# (4) 請問下列程式執行的結果為何？為什麼？

```
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
    console.log("foo");
    setTimeout(bar, 0);
    baz();
};

foo();
```
     
> 解答: foo→baz→bar，foo()呼叫函式後，會接續執行console.log("foo")和console.log("baz")，而由於bar()有設定setTimeout()所以是最後執行。
>


# 所以說event loop是甚麼? | Philip Roberts | JSConf EU 心得分享

程式碼的執行順序，是由最上方的程式碼開始，往下逐行執行。

stack跟 task queue 可以把它當成陣列來看
JavaScript是以「後進先出」（ LIFO， Last In First Out）執行堆疊（call stack）。而執行堆疊（call stack）也可以理解為是「執行當下的紀錄」
而 task queue 是採先進先出    

# 以下為我想跟大家分享的 

## Stack(堆疊)
Stack 中文翻譯為堆疊，是資料結構的一種，它就像是疊盤子一樣，特性為後進先出

## Queue(佇列)
Queue 中文翻譯為佇列，是資料結構的一種，它就像排隊一樣，特性為先進先出

## Web APIs
Web API 是瀏覽器提供的方法，它並不是 JavaScript 引擎的一部分，且運作於瀏覽器端，也就是說他們可以同時運行，常見的 Web API 有 setTimeout、XMLHttpRequest 等等....

## Call Stack
這個區塊的運作原理使用 Stack 的方式，程式碼會先到這個區塊執行以下的操作

若同步的動作則直接執行
非同步的動作則丟到 Web Apis 做處理
若 function 內有另一個 function 則向上堆疊( Stack )
執行完成後則移出 Call Stack

## Web Apis
到這邊的非同步動作會在瀏覽器背景執行，這裡並沒有所謂 Stack 或是 Queue 的概念，而是先執行完成會先丟到 Callback Queue 去做等待

## Callback Queue
進到這邊的函式會等待 Call Stack 清空後才依序將其放回 Call Stack 執行，看名字就知道這邊是一個 Queue，也就是 Web Api 執行完成後，先進入這個 Queue 的函式會先被放入　Call Stack

# Event Loop
Event Loop 指的就是這一整個循環，當 Call Stack 被清空則會檢視 Callback Queue，並將其放入 Call Stack，就這樣不斷的循環，達成一個不阻塞的機制


