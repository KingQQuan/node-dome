(async () => {
  const Sequelize = require('sequelize');

  // 建立连接
  const sequelize = new Sequelize('kaikeba', 'root', 'wqq123', {
    host: 'localhost',
    port: '3307',
    dialect: 'mysql',
    // operatorsAliases: false
  });

  // 定义模型
  const Fruit = sequelize.define('Fruit', {
    // name:{type: Sequelize.STRING(20), allowNull: false},
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      get () {
        const fname = this.getDataValue('name');
        const price = this.getDataValue('price');
        const stock = this.getDataValue('stock');
        return `${fname}(价格：￥${price} 库存：${stock}kg)`
      }
    },
    price: { 
      type: Sequelize.FLOAT, 
      allowNull: false,
      validate:{
        isFloat: {msg: '价格字段请输入数字'},
        min: {args:[0], msg: '价格字段必须大于0'}
      }
    },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  },{
    getterMethods:{
      amout(){
        return this.getDataValue('stock')+'kg'
      }
    },
    setterMethods:{
      amout(val){
        const idx = val.indexOf('kg');
        const v = val.slice(0,idx);
        this.setDataValue('stock',v);
      }
    }
  });

  Fruit.classify = function(name){
    // 热带水果
    const tropicFruits = ['香蕉','芒果','椰子'];
    return tropicFruits.includes(name) ? '热带水果' : '其他水果';
  };

  // 同步
  let ret = await Fruit.sync({force:true});
  console.log('ret');

  // 创建
  ret = await Fruit.create({
    name: '香蕉',
    // price: 'abc'
    price: 3.5
  });

  // 查询
  // ret = await Fruit.findAll();
  // console.log('findAll', JSON.stringify(ret));
  // console.log('amout:',ret[0].amout);
  // Fruit.findAll().then(fruits => {
  //   console.log(JSON.stringify(fruits));
  //   // 修改amout,触发setterMethods
  //   fruits[0].amout = '150kg';
  //   fruits[0].save();
  // })
})()