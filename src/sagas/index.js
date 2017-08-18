import * as schoolSagas from './schools'
import * as authSagas from './auth'
import * as usersSagas from './profile'
import * as postSagas from './post'
import * as commentSagas from './comment'
import * as userSagas from './user'
import * as messageSagas from './message'
import * as channelSagas from './channel'
import * as hashtagSagas from './hashtag'
import * as notificationSagas from './notification'
import * as shareSagas from './share'

export default {
  ...schoolSagas,
  ...authSagas,
  ...usersSagas,
  ...postSagas,
  ...userSagas,
  ...commentSagas,
  ...messageSagas,
  ...channelSagas,
  ...hashtagSagas,
  ...notificationSagas,
  ...shareSagas,
}
