import ContainerFs from '../../containers/fs.container.js'

class FsCartsDao extends ContainerFs {
  constructor() {
    super('carts.json');
  }
}

export default FsCartsDao;