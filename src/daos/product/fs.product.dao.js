import ContainerFs from '../../containers/fs.container.js'

class FsProductsDao extends ContainerFs {
  constructor() {
    super('products.json');
  }
}

export default FsProductsDao;