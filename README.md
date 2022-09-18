# pdf转换图片nodejs demo

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

## 使用
```
访问：http://localhost:3000/pdf2PicList?fileName=contract
```
