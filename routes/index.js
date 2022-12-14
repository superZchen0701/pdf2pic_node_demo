const router = require('koa-router')()
const path = require('path');
const pdf2pic = require('pdf2pic');

const port = process.env.PORT || '3000';

// pdf2图片转换参数配置
const picFolder = '/images';
const pdf2picOpts = {
  saveFilename: 'untitled',
  savePath: path.resolve(__dirname, `../public${picFolder}`),
  format: 'png',
  width: 700,
  height: 1000,
};

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/pdf2PicList', async (ctx, next) => {
  const defaultBody = {
    code: -1,
    data: {
      fileName: '',
      list: [],
    },
  };
  try {
    const { fileName = '' } = ctx.query;
    if (!fileName) {
      ctx.body = {
        ...defaultBody,
        msg: 'fileName参数必须',
      };
      return;
    }
    pdf2picOpts.saveFilename = fileName;
    const storeAsImage = pdf2pic.fromPath(
      path.resolve(__dirname, `../static/pdfs/${fileName}.pdf`),
      pdf2picOpts,
    );
    // pdf全部页面进行转换
    const pageToConvertAsImage = -1;
    // 转成base64
    const res = await storeAsImage.bulk(pageToConvertAsImage, true);
    // 转成图片
    // const res = await storeAsImage.bulk(pageToConvertAsImage);
    console.log(res);
    if (!Array.isArray(res) || !res.length) {
      ctx.body = {
        ...defaultBody,
        msg: 'pdf转换出错：res不是数组',
      };
      return;
    }
    // 转成图片用到的处理
    // const firstPath = res[0].path;
    // const index = firstPath.indexOf(picFolder);
    // if (index === -1) {
    //   ctx.body = {
    //     ...defaultBody,
    //     msg: 'pdf转换出错：picFolder index = -1',
    //   };
    //   return;
    // }
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {
        fileName: `${fileName}.pdf`,
        list: res.map(item => ({
          ...item,
          base64: `data:image/png;base64,${item.base64}`,
        })),
        // 转成图片用到的处理
        // list: res.map(item => {
        //   const picPathSuffix = item.path.substring(index);
        //   return {
        //     ...item,
        //     url: `http://localhost:${port}${picPathSuffix}`,
        //   }
        // }),
      },
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      ...defaultBody,
      msg: `pdf转换出错：${error}`,
    };
  }
})

module.exports = router
