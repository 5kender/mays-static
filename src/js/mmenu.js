import Mmenu from 'mmenu-js'

document.addEventListener(
  'DOMContentLoaded', () => {
    const menu = document.getElementById('menu-mobile')
    if (menu) {
      // eslint-disable-next-line
      new Mmenu(menu, {
        extensions: ['fx-panels-slide-100', 'fx-listitems-slide', 'position-front'],
        navbars: { content: ['prev'] }
      }, {
        // configuration
        classNames: {
          fixedElements: {
            fixed: 'fix'
          }
        },
        offCanvas: {
          page: {
            selector: '#app'
          }
        }
      })
    }
  }
)
