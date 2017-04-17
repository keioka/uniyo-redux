import { schoolsSearchSaga, schoolInfoSaga } from './schools'
import { logInSaga, userCreateSaga, tokenRefreshSaga } from './auth'
import { addUserTagsSaga, updateUserProfilePicSaga } from './profile'

export default {
  schoolsSearchSaga,
  schoolInfoSaga,
  logInSaga,
  userCreateSaga,
  tokenRefreshSaga,
  addUserTagsSaga,
  updateUserProfilePicSaga,
}
