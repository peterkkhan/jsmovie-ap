///// Component /////

export class Component {
  constructor(payload = {}) {
    const { 
      tagName = 'div',
      state = {},
      props = {} 
    } = payload
    this.el = document.createElement(tagName)
    this.state = state
    this.props = props
    this.render()
  }
  render() {
    // ...
  }
}

///////// Router //////////
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/')
  }


  const routerView = document.querySelector('router-view')
  // https://localhost:1234/#/about?name=heropy
  // #/about?name=heropy
  const [hash, queryString = ''] = location.hash.split('?')

  // a=123&b=456
  // ['a=123', 'b=456']
  // { a: '123', b: '456' }
  const query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=')
      acc[key] = value
      return acc
    }, {})
    history.replaceState(query, '')

  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  routerView.innerHTML = ''
  routerView.append(new currentRoute.component().el)

  window.scrollTo(0, 0)
}
export function createRouter(routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}


///// Store ////
export class Store {
  constructor(state) {
    this.state = {}
    this.observers = {}
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: val => {
          state[key] = val
          this.observers[key]()
        }
      })
    }
  }
  subscribe(key, cb) {
    this.observers[key] =cb
  }
}