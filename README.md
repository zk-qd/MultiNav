# 多级导航插件

## 思路

1. 结构

```js
children: [
            {
                dirname: 'monitor',
                name: '实时监测',
                children: [
                    {
                        filename: 'run',
                        name: '实时运行情况',
                    },
                    {
                        filename: 'searchtrack',
                        name: '车辆轨迹查询',
                    },
                    {
                        hidden: true,
                        filename: 'test',
                        name: '测试',
                    },
                ]
            },
            {
                filename: 'monitor',
                name: '实时监测',
            },
        ],
    }
```

2. 交互

- 选中的是 h3
- 鼠标悬停 li
  两个类 一个是悬停 一个是选中

3. 跳转

- 记录当前目录层级
- 将文件名称目录名称添加到 h3 上然后通过，循环取出
- 最后加起来，意思就是先利用层级跳到根目录然后在通过循环获取的文件目录名称跳到其他目录
  > 难点： 需要循环获取 h3.可能会想不到如何获取

## 配置
1. 数据配置同一数据层级需要同一目录层级
2. 文件名称不要有相同的
```js
var multilevelNavData = {
  yz_map: {
    logo: 1,
    title: "永州市出租汽车监管平台",
    children: [
      {
        dirname: "monitor",
        name: "实时监测",
        children: [
          {
            filename: "run",
            name: "实时运行情况",
          },
          {
            filename: "searchtrack",
            name: "车辆轨迹查询",
          },
          {
            hidden: true,
            filename: "test",
            name: "测试",
          },
        ],
      },
      {
        filename: "monitor",
        name: "实时监测",
      },
    ],
  },
};
```

## 用法

```js
new MultiNav(document.body, multilevelNavData.yz_map).active("searchtrack");
```
