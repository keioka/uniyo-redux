import * as actions from './actions'
import * as actionTypes from './types'

import * as authActions from './auth'
import * as schoolActions from './school'
import * as commentActions from './comment'
import * as postActions from './post'
import * as userActions from './user'

export default {
  ...authActions,
  ...schoolActions,
  ...commentActions,
  ...postActions,
  ...userActions,
}

export { actionTypes }
