import _ from "lodash";
import moment from "moment";
import { BaseStore } from "fluxible/addons";

class UserStore extends BaseStore {

  static storeName = "UserStore"

  static handlers = {
    ["RECEIVE_USER"]: "receiveUser",
    ["RECEIVE_EQUIPMENT_RESERVATIONS_USER"]: "receiveEquipmentReservations",
    ["RECEIVE_COURSE_INSCRIPTIONS_USER"]: "receiveCourseInscriptions",
    ["RECEIVE_USER_MEMBERSHIPS"]: "receiveMemberships",
    ["RECEIVE_ALL_COURSE_SESSIONS"]: "updateUserPassedInscriptionsAndEmit",
    ["START_LOADING_USER_RESOURCE"] : "startLoading",
    ["STOP_LOADING_USER_RESOURCE"] : "stopLoading",
    ["CLEAR_USER_STORE"]: "clearStore"
  }

  constructor(dispatcher) {
    super(dispatcher)
    this.dispatcher = dispatcher
    this.user = null
    this.reservations = []
    this.inscriptions = []
    this.reservationsThisWeek = null
    this.coursesAttended = null
    this.memberships = []
    this.loading = {}
  }

  startLoading(resourceName) {
    this.loading[resourceName] = true
    this.emitChange()
  }

  stopLoading(resourceName) {
    this.loading[resourceName] = false
    this.emitChange()
  }

  receiveMemberships(memberships) {
    if (!memberships.length) {
      this.memberships = []
    }
    else {
      this.memberships = memberships.filter((membership) => {
        return membership.status === '1' && (membership.end !== '0' && !(parseInt(membership.end) < moment().unix()) )
      })
    }

    this.emitChange()
  }

  updateUserPassedInscriptionsAndEmit(courseSessions) {
    this.updateUserPassedInscriptions(courseSessions)
    this.emitChange()
  }

  updateUserPassedInscriptions(courseSessions) {
    if (!(courseSessions && courseSessions.length)) {
      courseSessions = _.cloneDeep(this.dispatcher.getStore('CourseSessionsStore').getCourseSessions())
    }

    let coursesAttended = []
    this.inscriptions.forEach((inscription) => {
      if (inscription.status === 'passed') {
        if (coursesAttended.indexOf(inscription.courseId) === -1) {
          coursesAttended.push(inscription.courseId)
        }
      }
    })
    this.coursesAttended = coursesAttended
  }

  updateUserReservationsThisWeek(reservations) {
    let counter = 0
    reservations.forEach((reservation) => {
      let now = moment()
      let firstDayOfTheWeek = now.startOf('day').unix() - now.day() * 24 * 3600

      if (reservation.start / 1000 > firstDayOfTheWeek && reservation.start / 1000 < firstDayOfTheWeek + 7 * 24 * 3600) {
        counter++
      }
    })
    this.reservationsThisWeek = counter
  }

  receiveUser(user) {
    this.user = user
    this.emitChange()
  }

  receiveCourseInscriptions(inscriptions) {
    this.inscriptions = inscriptions
    this.updateUserPassedInscriptions()
    this.emitChange()
  }

  receiveEquipmentReservations(reservations) {
    this.reservations = reservations
    this.updateUserReservationsThisWeek(reservations)
    this.emitChange()
  }

  clearStore() {
    this.user = null
    this.reservations = []
    this.inscriptions = []
    this.reservationsThisWeek = null
    this.coursesAttended = null
    this.memberships = []
    this.loading = {}

    this.emitChange()
  }

  getLoading() {
    return this.loading
  }

  getUser() {
    return this.user
  }

  getMemberships() {
    return this.memberships
  }

  getReservations() {
    return this.reservations
  }

  getReservationsThisWeek() {
    return this.reservationsThisWeek
  }

  getCoursesAttended() {
    return this.coursesAttended
  }

  getInscriptions() {
    return this.inscriptions
  }

  dehydrate() {
    return {
      user: this.user,
      reservations: this.reservations,
      inscriptions: this.inscriptions,
      reservationsThisWeek: this.reservationsThisWeek,
      coursesAttended: this.coursesAttended,
      memberships: this.memberships,
      loading: this.loading
    }
  }

  rehydrate(state) {
    this.user = state.user
    this.reservations = state.reservations
    this.inscriptions = state.inscriptions
    this.reservationsThisWeek = state.reservationsThisWeek
    this.coursesAttended = state.coursesAttended
    this.memberships = state.memberships
    this.loading = state.loading
  }

}

export default UserStore;
