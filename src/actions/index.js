import * as actionTypes from './types'

import * as authActions from './auth'
import * as schoolActions from './school'
import * as commentActions from './comment'
import * as postActions from './post'
import * as userActions from './user'
import * as messageActions from './message'
import * as channelActions from './channel'
import * as hashtagActions from './hashtag'
import * as answerActions from './answer'
import * as notificationActions from './notification'
import * as shareActions from './share'

export default {
  ...authActions,
  ...schoolActions,
  ...commentActions,
  ...postActions,
  ...userActions,
  ...channelActions,
  ...messageActions,
  ...hashtagActions,
  ...answerActions,
  ...notificationActions,
  ...shareActions,
}

export { actionTypes }
