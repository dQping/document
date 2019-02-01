#pointer-events 的使用

**pointer-events** 允许作者控制特定的图形元素在何时成为鼠标事件的 target。当未指定该属性时，SVG 内容表现如同 visiblePainted。

除了指定元素不成为鼠标事件的目标，**pointer-events：none** 值还指示鼠标事件**穿过该元素**，并指向位于元素下面的元素。例如可以穿过遮罩选中下面的文字


大家都知道  
```
input[type=text|button|radio|checkbox]
// 支持 disabled 属性，可以实现事件的完全禁用
```
如果其他标签需要类似的禁用效果，可以试试 pointer-events: none ;

例如：
```
<a href="http://sf.gg" style="pointer-events: none">click me</a>
```



————2018.12.28