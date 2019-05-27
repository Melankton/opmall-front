const getters = {
  sidebar: state => state.app.sidebar,
  url: state => state.app.url,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  cart: state => state.cart.cart,
  id: state => state.user.id
}
export default getters
