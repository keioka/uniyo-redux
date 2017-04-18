import { schoolsSearchSaga, schoolInfoSaga } from './schools'
import { logInSaga, userCreateSaga, tokenRefreshSaga } from './auth'
import { addUserTagsSaga, updateUserProfilePicSaga } from './profile'
import { postsSearchSaga } from './post'

export default {
  schoolsSearchSaga,
  schoolInfoSaga,
  logInSaga,
  userCreateSaga,
  tokenRefreshSaga,
  addUserTagsSaga,
  updateUserProfilePicSaga,
  postsSearchSaga,
}
