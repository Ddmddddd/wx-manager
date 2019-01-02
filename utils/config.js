const eduBaseUrl = "https://zjubiomedit.com/healtheducation/"

const eduSubscribeApi = eduBaseUrl + "api/data/subscribe"
const eduTodayScheduleApi = eduBaseUrl + 'api/data/today?patientId='
const eduTodayLoginApi = eduBaseUrl + 'api/data/login?patientId='
const eduMainCoursesApi = eduBaseUrl + 'api/data/mainCourses?patientId='
const eduScheduleAndCourseApi = eduBaseUrl + "api/data/schedule?patientId="
const eduWXKnowledgeDetailApi = eduBaseUrl + "api/kno/wx/knowledge"
const eduRecordApi = eduBaseUrl + "api/data/record"
const eduFavorApi = eduBaseUrl + "api/data/favor"

export {
  eduBaseUrl,
  eduSubscribeApi,
  eduTodayScheduleApi,
  eduTodayLoginApi,
  eduMainCoursesApi,
  eduScheduleAndCourseApi,
  eduWXKnowledgeDetailApi,
  eduRecordApi,
  eduFavorApi
}
