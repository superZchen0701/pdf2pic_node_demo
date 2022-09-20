# pdf2pic_node_demo(pdf转换图片nodejs demo)

基于 pdf2pic [github地址](https://github.com/yakovmeister/pdf2image) 实现的pdf转换图片的nodejs demo。


## 前提
1. node >= 12.x
2. graphicsmagick
3. ghostscript

其中graphicsmagick和ghostscript可以参考 [这里](https://github.com/yakovmeister/pdf2image/blob/master/docs/gm-installation.md) 进行安装。


## 本地开发

```bash
# 安装依赖
npm i
npm start
```


## api文档

各环境前缀：

|环境       |前缀       |
|-----------|----------|
|本地开发|http://localhost:3000|
|测试|http://test.xxx.com|
|正式|http://xxx.com|

### 1. pdf相关

#### URL

/pdf2PicList

#### method

get

#### 参数

fileName：pdf文档名称

#### 返回数据示例

```
{
  "code": 0,
  "msg": "success",
  "data": {
    "fileName": "xxx.pdf",
    "list": [
      {
        "base64": "xxx",
        "size": "700x1000",
        page: 1
      }
      ...
    ]
  }
}
```
#### 字段说明
|字段       |类型       |说明     |
|-----------|----------|--------|
|base64|string|pdf转图片base64编码|
|size|string|图片宽高，宽x高|
|page|number|页码|


## 配合使用前端项目

[前端项目地址](https://github.com/superZchen0701/pic2pdf_vue_demo)


## TODO
1. 由于没有图片存储服务，所以只能将pdf转成图片base64编码返回；其次可以统一转换的图片宽高，使之更加符合源pdf文档。
