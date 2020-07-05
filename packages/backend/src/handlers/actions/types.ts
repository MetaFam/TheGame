type Maybe<T> = T | null





type UpdateBoxProfileResponse = {
  success: boolean
  updatedProfiles: Array<string>
}

type Mutation = {
  updateBoxProfile?: Maybe<UpdateBoxProfileResponse>
}

type updateBoxProfileArgs = {

}
