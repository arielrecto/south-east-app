export const routes  = {
    Login : 'login',
    Register : 'register',
    Home : 'home',
    Setting : 'setting',
    HomeStack : 'home-stack',
    ClassroomDrawer : "classroom-drawer",
    Classroom  :{
        Show : 'classroom-show',
        announcement  :{
            show : 'classroom-announcements-show',
        },
        attendance : {
            list : 'classroom-attendance-list',
            scanner : 'classroom -attendance-scanner'
        },
        task : {
            list : "classroom-task-list",
            show : 'classroom-task-show',
            submit : "classroom-task-submit"
        }
    }
}

