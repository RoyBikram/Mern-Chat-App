
export const getSender = (LoggedUser, Users) => Users[0]._id === LoggedUser._id ? Users[1] : Users[0]

