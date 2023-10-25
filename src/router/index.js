import { createRouter, createWebHistory } from 'vue-router';


import Pagination from '@/components/payment/PaymentSuccessful.vue';




// import TermsOfUse from '../components/temp/PaymentPage';

const routes = [
    {
        path: '/pagination',
        name: 'Pagination',
        component: Pagination
    },


    {
        path: '/termsofuse',
        name: 'TermsOfUse',
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/account/TermsOfService.vue'),
        meta: {
            title: 'Churchplus - Terms Of Use',
        }
    },

    {
        path: '/',
        name: 'Login',
        component: () =>
            import( /* webpackChunkName: "login" */ '../views/account/Login.vue'),
        meta: {
            title: 'Churchplus - Login',
        }
    },
    {
        path: '/publicresetpassword',
        name: 'PublicResetPassword',
        component: () =>
            import( /* webpackChunkName: "PublicResetPassword" */ '../views/account/PublicResetPassword.vue'),
        meta: {
            title: 'Churchplus - Admin Reset Password',
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import( /* webpackChunkName: "register" */ '../views/account/Register.vue'),
        meta: {
            title: 'Churchplus - Register',
        }
    },

    {
        path: '/onboarding',
        name: 'Onboarding',
        component: () =>
            import( /* webpackChunkName: "onboarding" */ '../views/account/OnboardingForm.vue'),
        meta: {
            title: 'Churchplus - Onboarding',
        }
    },
    {
        path: '/onboarding/step2',
        name: 'StartingPoint',
        component: () =>
            import( /* webpackChunkName: "startingpoint" */ '../views/onboarding/StartingPoint.vue'),
        meta: {
            title: 'Churchplus - Start Point',
        }
    },
    {
        path: '/next',
        name: 'StartingDashboard',
        component: () =>
            import( /* webpackChunkName: "startingdashboard" */ '../views/onboarding/StartingDashboard.vue'),
        meta: {
            title: 'Churchplus - Starting Board',
        }
    },
    {
        path: '/processing/:option',
        name: 'ProcessRequest',
        component: () =>
            import( /* webpackChunkName: "processrequest" */ '../views/onboarding/ProcessRequest.vue')
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        meta: {
            title: 'Churchplus - Forgot Password',
        },
        component: () =>
            import( /* webpackChunkName: "forgotpassword" */ '../views/account/ForgotPassword.vue')
    },
    {
        path: '/resetpassword',
        name: 'ResetPassword',
        meta: {
            title: 'Churchplus - Reset Password',
        },
        component: () =>
            import( /* webpackChunkName: "resetpassword" */ '../views/account/ResetPassword.vue')
    },
    {
        path: '/emailsent/:email',
        name: 'EmailSent',
        meta: {
            title: 'Churchplus - Reset Email Confirmation',
        },
        component: () =>
            import( /* webpackChunkName: "emailsent" */ '../views/account/EmailSent.vue')
    },

    {
        path: '/tenant',
        name: 'Home',
        component: () =>
            import( /* webpackChunkName: "home" */ '../views/dashboard/Home.vue'),
        children: [{
            path: '',
            name: 'Dashboard',
            component: () =>
                import( /* webpackChunkName: "dashboard" */ '../views/dashboard/ChurchDashboard.vue'),
            meta: {
                title: 'Churchplus - Dashboard',
                metaTags: [{
                    name: 'description',
                    content: 'The home page of Churchplus app.'
                },
                    // {
                    // property: 'og:description',
                    // content: 'The home page of our example app.'
                    // }
                ]
            }
        },

        {
            path: 'subscription',
            name: 'Subscription',
            meta: {
                title: 'Churchplus - Subscription',
            },
            component: () =>
                import( /* webpackChunkName: "dashboard" */ '../views/dashboard/Subscription.vue')
        },
        {
            path: 'people',
            component: () =>
                import( /* webpackChunkName: "people" */ '../views/people/People.vue'),
            children: [

                {
                    path: '',
                    meta: {
                        title: 'Churchplus - Church Members',
                    },
                    component: () =>
                        import( /* webpackChunkName: "peopleempty" */ '../views/people/PeopleEmpty.vue')
                },
                {
                    path: 'import',
                    meta: {
                        title: 'Churchplus - Import Members',
                    },
                    component: () =>
                        import( /* webpackChunkName: "importpeople" */ '../views/people/ImportPeople.vue'),
                    name: 'ImportPeople'
                },
                {
                    path: 'addfirsttimer',
                    name: 'AddFirstTimer',
                    meta: {
                        title: 'Churchplus - First Timer Form',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/people/AddFirstTimer.vue')
                },
                {
                    path: 'addnewconvert',
                    name: 'AddNewConvert',
                    meta: {
                        title: 'Churchplus - New Convert Form',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/people/AddNewConvert.vue')
                },
                {
                    path: 'add/:personId?',
                    name: 'AddPerson',
                    meta: {
                        title: 'Churchplus - Member Form',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addperson" */ '../views/people/AddPerson.vue')
                },
                {
                    path: 'addfirsttimer/:firstTimerId?',
                    meta: {
                        title: 'Churchplus - First Timer Form',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/people/AddFirstTimer.vue')
                }

            ]

        },
        {
            path: 'firsttimermanagement/:personId?',
            name: 'FirsttimerManagement',
            meta: {
                title: 'Churchplus - First Timer CRM',
            },
            component: () =>
                import( /* webpackChunkName: "addfirsttimer" */ '../views/people/firsttimer_crm/Index.vue')
        },

        // {
        //     path: 'branch',
        //     meta: {
        //         title: 'Churchplus - Branch'
        //     },
        //     component: () =>
        //         import ( /* webpackChunkName: "addfirsttimer" */ '../views/branch/FirstTimer'),
        //      children: [

        //      ]   
        // },
        {
            path: 'followup',
            name: 'Followup',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/people/followup/Index'),

        },
        {
            path: 'reports',
            meta: {
                title: 'Churchplus - Reports',
            },
            component: () =>
                import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Reports.vue'),
            children: [
                {
                    path: '',
                    meta: {
                        title: 'Churchplus - Report',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Index.vue'),

                },
                {
                    path: 'membershipreport',
                    name: "MemberShipReport",
                    meta: {
                        title: 'Churchplus - Membership Report',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Membershipreport/MemberShipReport.vue')

                },
                {
                    path: 'firsttimersreport',
                    name: "FirstTimersReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Membershipreport/firstTimersReport.vue')
                },
                {
                    path: 'newconvertreport',
                    name: "NewConvertReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /*webpackChunkName: "addfirsttimer" */ '../views/Reports/Membershipreport/NewConvertReport.vue')
                },
                {
                    path: 'celebrationsreport',
                    name: "CelebrationsReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Membershipreport/BirthdayReport.vue')
                },
                {
                    path: 'attendancereport',
                    name: "CheckinAttendanceReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Performancereport/CheckinAttendanceReport.vue')
                },
                {
                    path: 'firsttimerperformancereport',
                    name: "FirstTimerPerformanceReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "firsttimerperformance" */ '../views/Reports/Performancereport/FirstTimerPerformanceReport.vue')
                },
                {
                    path: 'summaryreport',
                    name: "SummaryReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "summaryreport" */ '../views/Reports/Performancereport/SummaryReport.vue')

                },
                {
                    path: 'overallsummaryreport/:id?',
                    name: "DailySummaryReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "overallsummary" */ '../views/Reports/Performancereport/DailySummaryReport.vue')

                },
                {
                    path: 'attendanceperformancereport',
                    name: "AttendancePerformanceReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "performancereport" */ '../views/Reports/Performancereport/AttendancePerformanceReport.vue')

                },
                {
                    path: 'groupattendancereport',
                    name: "GroupAttendanceReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "presentabsentreport" */ '../views/Reports/Performancereport/GroupAttendanceReport.vue')

                },
                {
                    path: 'summarygroupattendancereport',
                    name: "GroupSummaryAttendanceReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "presentabsentreport" */ '../views/Reports/Performancereport/GroupSummaryAttendanceReport.vue')

                },

                {
                    path: 'newconvertperformancereport',
                    name: "NewConvertPerformanceReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Performancereport/NewConvertPerformanceReport.vue')

                },
                {
                    path: 'accountingtransactionreport',
                    name: "FinancialTransactionReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>

                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Financialreport/FinancialTransactionReport.vue')
                },
                {
                    path: 'expensereport',
                    name: "BasicExpenseReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>

                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Financialreport/BasicExpenseReport.vue')
                },
                {
                    path: 'incomestatementreport',
                    name: "IncomeStatementReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>

                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Financialreport/IncomeStatementReport.vue')
                },
                {
                    path: 'financialofferingreport',
                    name: "FinancialOfferingReport",
                    component: () =>

                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Financialreport/FinancialOfferingReport.vue')
                },
                {
                    path: 'financialpledgesreport',
                    name: "FinancialPledgesReport",
                    component: () =>

                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Financialreport/FinancialPledgesReport.vue')
                },
                {
                    path: 'financialactivitiesbalance',
                    name: "financialActivitiesBalance",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>

                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Financialreport/FinancialActivitiesBalance.vue')
                },
                {
                    path: 'weddinganniversaryreport',
                    name: "weddinganniversaryreport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>

                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Membershipreport/weddinganniversaryReport.vue')
                },
                {
                    path: 'statementofactivity',
                    name: "StatementOfActivity",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Financialreport/StatementOfActivity.vue')
                },
                {
                    path: 'incomereport',
                    name: "IncomeReport",
                    meta: {
                        title: 'Churchplus - Reports',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Financialreport/IncomeReport.vue')
                },
            ]
        },
        {

            path: 'branches',
            name: "singleBranch",
            meta: {
                title: 'Churchplus - Branch',
            },
            component: () =>
                import( /* webpackChunkName: "addfirsttimer" */ '../views/branch/singleBranch'),
            children: [
                {

                    path: 'summary',
                    name: "singleBranchSummary",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/branch/singleBranchSummary')

                },
                {

                    path: 'members_branch',
                    name: "MemberBranch",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/branch/subpages/People.vue')

                },
                {

                    path: 'branch_communication',
                    name: "BranchCommunication",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/branch/subpages/BranchCommunication.vue')

                },
                {

                    path: 'branchattendance',
                    name: "BranchAttendanc",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                    import( /* webpackChunkName: "branchattendance" */ '../views/branch/subpages/BranchAttendance.vue')

                },
                {

                    path: 'branchtransaction',
                    name: "BranchTransaction",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                    import( /* webpackChunkName: "branchtransactions" */ '../views/branch/subpages/BranchTransactions.vue')

                },
                {

                    path: 'branchreport',
                    name: "BranchRepot",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                    import( /* webpackChunkName: "branchreport" */ '../views/branch/report/BranchReport.vue')

                },
                // {

                //     path: 'branchincomestatementreport',
                //     name: "BranchIncomeStatement",
                //     meta: {
                //         title: 'Churchplus - Branch',
                //     },
                //     component: () =>
                //     import( /* webpackChunkName: "branchreport" */ '../views/branch/report/financialReport/BranchIncomeStatement.vue')

                // },
            ]
        },
        {

            path: 'branch',
            name: "Branch",
            meta: {
                title: 'Churchplus - Branch',
            },
            component: () =>
                import( /* webpackChunkName: "addfirsttimer" */ '../views/branch/Branch'),
            children: [
                {

                    path: 'branchsummary',
                    name: "BranchSummary",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/branch/BranchSummary')

                },
                {

                    path: 'mainbranchsummary',
                    name: "MainBranch",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/branch/MainBranch')

                },
                {

                    path: 'addbranch',
                    name: "AddBranch",
                    meta: {
                        title: 'Churchplus - Branch',
                    },
                    component: () =>
                        import( /* webpackChunkName: "addfirsttimer" */ '../views/branch/AddBranch')

                },
                {
                    path: 'branch_members',
                    name: "BranchMembers",
                    meta: {
                        title: 'Church - Branch Members',
                    },
                    component: () =>
                        import( /* webpackChunkName: "branchmembers" */ '../views/branch/subpages/People.vue')

                },
                {
                    path: 'branch_transactions',
                    name: "BranchTransactions",
                    meta: {
                        title: 'Church - Branch Transactions',
                    },
                    component: () =>
                        import( /* webpackChunkName: "branchtransactions" */ '../views/branch/subpages/BranchTransactions.vue')

                },
                {
                    path: 'branch_attendance',
                    name: "BranchAttendance",
                    meta: {
                        title: 'Church - Branch Attendance',
                    },
                    component: () =>
                        import( /* webpackChunkName: "branchattendance" */ '../views/branch/subpages/BranchAttendance.vue')

                },
                {
                    path: 'branch_report',
                    name: "BranchReport",
                    meta: {
                        title: 'Church - Members',
                    },
                    component: () =>
                        import( /* webpackChunkName: "branchreport" */ '../views/branch/report/BranchReport.vue')

                },
                // {

                //     path: 'branch_people',
                //     name: "BranchPeoples",
                //     meta: {
                //         title: 'Churchplus - Members',
                //     },
                //     component: () =>
                //         import ( /* webpackChunkName: "people" */ '../views/people/People.vue'),
                //         children: [
                //             {
                //                 path: 'member',
                //                 name: "Member",
                //                 meta: {
                //                     title: 'Church - Members',
                //                 },
                //                 component: () =>
                //                     import ( /* webpackChunkName: "peopleempty" */ '../views/branch/people/People.vue')

                //             }
                //         ]        
                // },
                // {
                //     path: 'firsttimerslist',
                //     name: 'FirstTimerList',
                //     meta: {
                //         title: 'Churchplus - First Timers',
                //     },
                //     component: () =>
                //         import ( /* webpackChunkName: "addfirsttimer" */ '../views/people/FirstTimerEmpty.vue')
                // },
                // {
                //     path: 'reports',
                //     name: 'ReportList',
                //     meta: {
                //         title: 'Churchplus - Reports',
                //     },
                //     component: () =>
                //     import ( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Index.vue'),
                // },
                // {
                //     path: 'events',
                //     name: 'EventsList',
                //     meta: {
                //         title: 'Churchplus - Event Forms',
                //     },
                //     component: () =>
                //     import ( /* webpackChunkName: "emptyevent" */ '@/views/event/Events.vue')
                // },
            ]

        },


        // {
        //     path: 'attendanceservicereport',
        //     name:"ServiceAttendanceReport",
        //     meta: {
        //         title: 'Churchplus - Reports',
        //     },
        //     component: () =>
        //         import ( /* webpackChunkName: "addfirsttimer" */ '../views/Reports/Performancereport/ServiceAttendanceReport.vue')
        // },
        {
            path: 'family',
            name: 'Family',
            component: () =>
                import( /* webpackChunkName: "event" */ '@/views/family/Family.vue')
        },
        {
            path: 'addfamily/:familyId?',
            name: 'AddFamily',
            component: () =>
                import( /* webpackChunkName: "event" */ '@/views/family/AddFamily.vue')
        },
        {
            path: 'importinstruction',
            name: 'ImportInstruction',
            meta: {
                title: 'Churchplus - Import Members',
            },
            component: () =>
                import( /* webpackChunkName: "addfirsttimer" */ '../views/people/ImportInstruction.vue')
        },
        {
            path: 'events',
            name: 'Events',
            meta: {
                title: 'Churchplus - Event Form',
            },
            component: () =>
                import( /* webpackChunkName: "emptyevent" */ '@/views/event/Events.vue')
        },
        // {
        //     path: 'events',
        //     name: 'EventList',
        //     component: () =>
        //         import ( /* webpackChunkName: "eventlsit" */ '@/views/event/EventList.vue')
        // },
        {
            path: 'event/:event?',
            name: 'Event',
            meta: {
                title: 'Churchplus - Event Form',
            },
            component: () =>
                import( /* webpackChunkName: "event" */ '@/views/event/Event.vue')
        },

        {
            path: 'attendancecheckin',
            name: 'Attendance',
            component: () =>
                import( /* webpackChunkName: "attendancecheckin" */ '@/views/event/attendance&checkin/Attendance'),
            children: [{
                path: '',
                name: 'AttendanceList',
                meta: {
                    title: 'Churchplus - Attendance Checkins',
                },
                component: () =>
                    import( /* webpackChunkName: "attendance" */ '@/views/event/attendance&checkin/AttendanceCheckin'),
            },
            {
                path: 'add',
                name: 'AddCheckin',
                meta: {
                    title: 'Churchplus - Create Checkin',
                },
                component: () =>
                    import( /* webpackChunkName: "addcheckin" */ '@/views/event/attendance&checkin/AddAttendance'),
            },
            {
                path: 'ussd',
                name: 'USSDCheckin',
                meta: {
                    title: 'Churchplus - USSD Checkin',
                },
                component: () =>
                    import( /* webpackChunkName: "ussdcheckin" */ '@/views/event/attendance&checkin/USSDCheckin'),
            },
            {
                path: 'sms',
                name: 'SMSCheckin',
                meta: {
                    title: 'Churchplus - SMS Checkin',
                },
                component: () =>
                    import( /* webpackChunkName: "smscheckin" */ '@/views/event/attendance&checkin/SMSCheckin'),
            },

            {
                path: 'mark',
                name: 'MarkAttendance',
                meta: {
                    title: 'Churchplus - Manual Checkin',
                },
                component: () =>
                    import( /* webpackChunkName: "markattendance" */ '@/views/event/attendance&checkin/MarkAttendance'),
            },

            {
                path: 'childcheckin',
                name: 'ChildCheckin',
                meta: {
                    title: 'Churchplus - Child Checkin',
                },
                component: () =>
                    import( /* webpackChunkName: "childcheckin" */ '@/views/event/attendance&checkin/ChildCheckin'),
            },

            {
                path: 'type',
                name: 'CheckinType',
                meta: {
                    title: 'Churchplus - Checkin Options',
                },
                component: () =>
                    import( /* webpackChunkName: "childcheckin" */ '@/views/event/attendance&checkin/GroupCategoryAttendance'),
            },
            {
                path: 'tag',
                name: 'AttendanceTag',
                meta: {
                    title: 'Churchplus - Checkin Tag',
                },
                component: () =>
                    import( /* webpackChunkName: "tag" */ '@/views/event/attendance&checkin/AttendanceTag')
            },
            {
                path: 'checkins',
                name: 'AttendanceAndCheckinList',
                meta: {
                    title: 'Churchplus - Attendance List',
                },
                component: () =>
                    import( /* webpackChunkName: "checkins" */ '@/views/event/attendance&checkin/AttendanceAndCheckinList')
            },
            {
                path: 'qr',
                name: 'AttendanceQR',
                meta: {
                    title: 'Churchplus - QR Checkin',
                },
                component: () =>
                    import( /* webpackChunkName: "attendaceqr" */ '@/views/event/attendance&checkin/AttendanceQR')
            },

            {
                path: 'report/:id',
                name: 'AttendanceReport',
                meta: {
                    title: 'Churchplus - Attendance Checkin Report',
                },
                component: () =>
                    import( /* webpackChunkName: "childcheckin" */ '@/views/event/attendance&checkin/AttendanceReport'),
            }
            ]
        },
        {
            path: 'childcheckin',
            name: 'ChildCheckin',
            meta: {
                title: 'Churchplus - Child Checkin',
            },
            component: () =>
                import( /* webpackChunkName: "wardcheckin" */ '@/views/event/childcheckin/Index.vue')
        },
        {
            path: 'checkinachild',
            name: 'CheckinAChild',
            meta: {
                title: 'Churchplus - Child Checkin',
            },
            component: () =>
                import( /* webpackChunkName: "checkinachild" */ '@/views/event/childcheckin/pages/WardCheckin.vue')
        },
        {
            path: 'checkins',
            name: 'AttendanceAndCheckinList',
            meta: {
                title: 'Churchplus - Attendance Checkins',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/event/attendance&checkin/AttendanceAndCheckinList')
        },

        {
            path: 'attendancetag',
            name: 'AttendanceTag',
            meta: {
                title: 'Churchplus - Checkin Tag',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/event/attendance&checkin/AttendanceTag')
        },

        {
            path: 'addattendancecheckin/:id?',
            name: 'AddAttendance',
            meta: {
                title: 'Churchplus - Create Attendance Checkin',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/event/attendance&checkin/AddAttendance')
        },

        {
            path: 'firsttimers',
            name: 'FirstTimers',
            meta: {
                title: 'Churchplus - First Timers',
            },
            component: () =>
                import( /* webpackChunkName: "firsttimers" */ '@/views/people/FirstTimersList.vue')
        },
        {
            path: 'firsttimerslist',
            name: 'FirstTimerEmpty',
            meta: {
                title: 'Churchplus - First Timers',
            },
            component: () =>
                import( /* webpackChunkName: "addfirsttimer" */ '../views/people/FirstTimerEmpty.vue')
        },
        {
            path: 'newconvertlist',
            name: 'NewConvert',
            meta: {
                title: 'Churchplus - New Convert',
            },
            component: () =>
                import( /* webpackChunkName: "addfirsttimer" */ '../views/people/NewConvert.vue')
        },
        {
            path: '/chartpage',
            name: 'FirstTimersChartArea',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/people/FirstTimersChartArea.vue'),

        },
        {
            path: 'report/:id',
            name: 'Report',
            meta: {
                title: 'Churchplus - Event Report',
            },
            component: () =>
                import( /* webpackChunkName: "report" */ '@/views/event/EventReport.vue')
        },
        {
            path: 'contacts',
            name: 'ContactList',
            meta: {
                title: 'Churchplus - SMS Communication - Phone Groups',
            },
            component: () =>
                import( /* webpackChunkName: "contactlist" */ '@/views/communication/ContactList')
        },
        {
            path: 'sms',
            name: 'SmsCommunication',
            component: () =>
                import( /* webpackChunkName: "smscommunication" */ '@/views/communication/SmsCommunication'),
            children: [{
                path: '',
                name: 'Inbox',
                meta: {
                    title: 'Churchplus - SMS Inbox',
                },
                component: () =>
                    import( /* webpackChunkName: "inbox" */ '@/views/communication/MessageInbox')
            },
            {
                path: 'sent',
                name: 'SentMessages',
                meta: {
                    title: 'Churchplus - SMS Communication - Sent Messages',
                },
                component: () =>
                    import( /* webpackChunkName: "sentmessages" */ '@/views/communication/SentMessages'),
            },
            {
                path: 'draft',
                name: 'DraftMessages',
                meta: {
                    title: 'Churchplus - SMS Communication - Drafts',
                },
                component: () =>
                    import( /* webpackChunkName: "draftmessages" */ '@/views/communication/DraftMessages')
            },
            // {
            //     path: 'contacts',
            //     name: 'ContactList',
            //     meta: {
            //         title: 'Churchplus - SMS Communication - Phone Groups',
            //     },
            //     component: () =>
            //         import( /* webpackChunkName: "contactlist" */ '@/views/communication/ContactList')
            // },
            {
                path: 'sent/:messageId',
                name: 'MessageDetails',
                meta: {
                    title: 'Churchplus - SMS Communication - Message Details',
                },
                component: () =>
                    import( /* webpackChunkName: "contactlist" */ '@/views/communication/MessageDetails')
            },
            {
                path: 'addgroup',
                name: 'Phongroup',
                meta: {
                    title: 'Churchplus - Create | Edit Phone Group',
                },
                component: () =>
                    import( /* webpackChunkName: "phonegroup" */ '@/views/communication/PhoneGroup')
            },
            {
                path: 'editcontact/:groupId',
                name: 'EditContactList',
                meta: {
                    title: 'Churchplus - SMS Communication - Edit Phone group',
                },
                component: () =>
                    import( /* webpackChunkName: "editcontactlist" */ '@/views/communication/EditGroup')
            },
            {
                path: 'report/:messageId',
                name: 'DeliveryReport',
                meta: {
                    title: 'Churchplus - SMS Communication - Delivery Report',
                },
                component: () =>
                    import( /* webpackChunkName: "deliveryreport" */ '@/views/communication/DeliveryReport')
            },
            {
                path: 'compose',
                name: 'SendMessage',
                meta: {
                    title: 'Churchplus - SMS Communication - Compose message',
                },
                component: () =>
                    import( /* webpackChunkName: "sendmessage" */ '@/views/communication/SendSms')
            },
            {
                path: 'scheduled',
                name: 'ScheduledSMS',
                meta: {
                    title: 'Churchplus - SMS Communication - Scheduled',
                },
                component: () =>
                    import( /* webpackChunkName: "scheduled" */ '@/views/communication/ScheduledSMS')
            }
            ]
        },
        {
            path: 'email',
            name: 'EmailCommunication',
            component: () =>
                import( /* webpackChunkName: "emailcommunication" */ '@/views/communication/EmailCommunication'),
            children: [{
                path: '',
                name: 'Sent',
                meta: {
                    title: 'Churchplus - Email Communication - Sent Emails',
                },
                component: () =>
                    import( /* webpackChunkName: "sentemails" */ '@/views/communication/SentEmails')
            },
            {
                path: 'sent',
                name: 'SentEmails',
                meta: {
                    title: 'Churchplus - Email Communication - Sent Emails',
                },
                component: () =>
                    import( /* webpackChunkName: "sentemails" */ '@/views/communication/SentEmails')
            },
            {
                path: 'sent/:messageId',
                name: 'EmailDetails',
                meta: {
                    title: 'Churchplus - Email Communication - Email Details',
                },
                component: () =>
                    import( /* webpackChunkName: "emaildetails" */ '@/views/communication/EmailDetails')
            },
            {
                path: 'draft',
                name: 'EmailDraft',
                meta: {
                    title: 'Churchplus - Email Communication - Email Drafts',
                },
                component: () =>
                    import( /* webpackChunkName: "emaildraft" */ '@/views/communication/EmailDraft')
            },
            // { path: 'contacts', name: 'ContactList', component: ContactList },
            // { path: 'report', name: 'DeliveryReport', component: DeliveryReport },
            {
                path: 'compose',
                name: 'ComposeEmail',
                meta: {
                    title: 'Churchplus - Email Communication - Compose',
                },
                component: () =>
                    import( /* webpackChunkName: "compose" */ '@/views/communication/ComposeEmail')
            },
            {
                path: 'schedules',
                name: 'Schedules',
                meta: {
                    title: 'Churchplus - Email Communication - Scheduled',
                },
                component: () =>
                    import( /* webpackChunkName: "compose" */ '@/views/communication/ScheduledEmails')
            }
            ]
        },
        {
            path: 'whatsapp',
            name: 'Whatsapp',
            meta: {
                title: 'Churchplus - Whatsapp Communication',
            },
            component: () =>
                import( /* webpackChunkName: "whatsappmodule" */ '@/components/whatsapp/whatsapp'),
            children: [
                {
                    path: 'auth',
                    name: 'ConnectWhatsapp',
                    meta: {
                        title: 'Churchplus - Connect Whatsapp',
                    },
                    component: () =>
                        import( /* webpackChunkName: "connectwhatsapp" */ '@/views/communication/whatsapp/ConnectWhatsapp')
                },
                {
                    path: '',
                    name: 'Compose',
                    meta: {
                        title: 'Churchplus - Whatsapp Compose',
                    },
                    component: () =>
                        import( /* webpackChunkName: "composewhatsapp" */ '@/views/communication/whatsapp/composeWhatsapp')
                },
                {
                    path: 'scheduledmessages',
                    name: 'ScheduledList',
                    meta: {
                        title: 'Churchplus - Whatsapp Scheduled Messages',
                    },
                    component: () =>
                        import( /* webpackChunkName: "scheduledwhatsapp" */ '@/views/communication/whatsapp/ScheduledList')
                }
            ]
        },
        {
            path: 'voice',
            name: 'Voice',
            meta: {
                title: 'Churchplus - Voice Communication',
            },
            component: () =>
                import( /* webpackChunkName: "voicemodule" */ '@/components/Voice/Voice'),
            children: [
                {
                    path: 'voicelist',
                    name: 'VoiceList',
                    meta: {
                        title: 'Churchplus -Voice List',
                    },
                    component: () =>
                        import( /* webpackChunkName: "voicelist" */ '@/views/communication/Voice/VoiceList')
                },
                {
                    path: 'sendvoicemessage',
                    name: 'composeVoice',
                    meta: {
                        title: 'Churchplus - Send Voice Message',
                    },
                    component: () =>
                        import( /* webpackChunkName: "sendvoicemessage" */ '@/views/communication/Voice/composeVoice')
                },
                {
                    path: 'report/:messageId',
                    name: 'VoiceDeliveryReport',
                    meta: {
                        title: 'Churchplus - Voice Communication - Delivery Report',
                    },
                    component: () =>
                        import( /* webpackChunkName: "deliveryreport" */ '@/views/communication/DeliveryReport')
                },
            ]
        },
        {
            path: 'peoplegroups:actionType?',
            name: 'Groups',
            meta: {
                title: 'Churchplus - Groups',
            },
            component: () =>
                import( /* webpackChunkName: "groups" */ '@/views/groups/GroupsList')
        },
        {
            path: 'sidemodal',
            name: 'SideModal',
            meta: {
                title: 'Churchplus - Groups',
            },
            component: () =>
                import( /* webpackChunkName: "groups" */ '@/views/groups/sidemodal/SideModal.vue')
        },
        {
            path: 'createpeoplegroup/:groupId?',
            name: 'CreateGroup',
            meta: {
                title: 'Churchplus - Create | Edit Group',
            },
            component: () =>
                import( /* webpackChunkName: "createpeoplegroup" */ '@/views/groups/CreateGroup')
        },
        {
            path: 'groupleader',
            name: 'GroupLeaderDashboard',
            meta: {
                title: 'Churchplus - Gorup Leader',
            },
            component: () =>
                import( /* webpackChunkName: "createpeoplegroup" */ '@/views/groups/groupleader/GroupLeaderDashboard')
        },
        {
            path: 'groupleaderattendance',
            name: 'GroupLeaderAttendanceReport',
            meta: {
                title: 'Churchplus - Gorup Leader',
            },
            component: () =>
                import( /* webpackChunkName: "createpeoplegroup" */ '@/views/groups/groupleader/GroupLeaderAttendanceReport')
        },
        {
            path: 'takeattendance/:id',
            name: 'TakeAttendance',
            meta: {
                title: 'Churchplus - Gorup Leader',
            },
            component: () =>
                import( /* webpackChunkName: "createpeoplegroup" */ '@/views/groups/groupleader/TakeAttendance')
        },
        {
            path: 'units',
            name: 'BuyUnits',
            meta: {
                title: 'Churchplus - Purchase SMS Units',
            },
            component: () =>
                import( /* webpackChunkName: "buyunits" */ '@/views/payment/BuyUnits')
        },

        {
            path: 'social',
            name: 'Social',
            component: () =>
                import( /* webpackChunkName: "social" */ '@/views/social&mobile/home/Index'),
            children: [{
                path: '',
                name: 'SocialDashboard',
                meta: {
                    title: 'Churchplus - Social Media Dashboard',
                },
                component: () =>
                    import( /* webpackChunkName: "socialdashboard" */ '@/views/social&mobile/dashboard/Index'),
            },
            {
                path: 'post',
                name: 'SocialPost',
                meta: {
                    title: 'Churchplus - Social Media - Create Post',
                },
                component: () =>
                    import( /* webpackChunkName: "post" */ '@/views/social&mobile/post/Index'),
            },
            {
                path: 'feed',
                name: 'SocialFeed',
                component: () =>
                    import( /* webpackChunkName: "feed" */ '@/views/social&mobile/feed/Index'),
                children: [{
                    path: '',
                    name: 'AllPosts',
                    meta: {
                        title: 'Churchplus - Socail Media - All Posts',
                    },
                    component: () =>
                        import( /* webpackChunkName: "facebookposts" */ '@/views/social&mobile/feed/general/Index'),
                },
                {
                    path: 'facebook',
                    name: 'FacebookPosts',
                    meta: {
                        title: 'Churchplus - Socail Media - Facebook Posts',
                    },
                    component: () =>
                        import( /* webpackChunkName: "facebookposts" */ '@/views/social&mobile/feed/facebook/Index'),
                },
                {
                    path: 'twitter',
                    name: 'TwitterPosts',
                    meta: {
                        title: 'Churchplus - Socail Media - Twitter Posts',
                    },
                    component: () =>
                        import( /* webpackChunkName: "facebookposts" */ '@/views/social&mobile/feed/twitter/Index'),
                },
                {
                    path: 'instagram',
                    name: 'InstagramPosts',
                    meta: {
                        title: 'Churchplus - Socail Media - Instagram Posts',
                    },
                    component: () =>
                        import( /* webpackChunkName: "facebookposts" */ '@/views/social&mobile/feed/instagram/Index'),
                },
                {
                    path: 'whatsapp',
                    name: 'WhatsappPosts',
                    meta: {
                        title: 'Churchplus - Socail Media - WhatsApp Posts',
                    },
                    component: () =>
                        import( /* webpackChunkName: "facebookposts" */ '@/views/social&mobile/feed/whatsapp/Index'),
                },
                ]
            },
            {
                path: 'pending',
                name: 'PendingPosts',
                meta: {
                    title: 'Churchplus - Socail Media - Pending Posts',
                },
                component: () =>
                    import( /* webpackChunkName: "pendingfeed" */ '@/views/social&mobile/pending/Index'),
            },
            {
                path: 'schedule',
                name: 'PendingReview',
                meta: {
                    title: 'Churchplus - Socail Media - Scheduled Posts',
                },
                component: () =>
                    import( /* webpackChunkName: "schedule" */ '@/views/social&mobile/schedule/Index'),
            },
            {
                path: 'setting',
                name: 'SocialSetting',
                meta: {
                    title: 'Churchplus - Socail Media - Setup',
                },
                component: () =>
                    import( /* webpackChunkName: "socialsetting" */ '@/views/social&mobile/settingspage/Index'),
            },
            {
                path: 'category',
                name: 'PostCategory',
                meta: {
                    title: 'Churchplus - Socail Media - Create Post Category',
                },
                component: () =>
                    import( /* webpackChunkName: "socialsetting" */ '@/views/social&mobile/settingspage/PostCategory'),
            },
            {
                path: 'involvement',
                name: 'PostEngagement',
                meta: {
                    title: 'Churchplus - Socail Media - All Posts',
                },
                component: () =>
                    import( /* webpackChunkName: "involvement" */ '@/views/social&mobile/involvement/Index'),
            },
            ]
        },
        {
            path: 'workflow',
            name: 'WorkFlow',
            component: () =>
                import( /* webpackChunkName: "workflow" */ '../views/workflow/Index.vue'),
            meta: {
                title: 'Churchplus - Ministry Workflow',
            },
            children: [{
                path: 'list',
                name: 'Workflows',
                component: () =>
                    import( /* webpackChunkName: "workflows" */ '../views/workflow/pages/Workflows.vue'),
                meta: {
                    title: 'Churchplus - Add Workflow',
                }
            },
            {
                path: 'add',
                name: 'AddWorkflow',
                component: () =>
                    import( /* webpackChunkName: "addworkflow" */ '../views/workflow/components/MainBoard.vue'),
                meta: {
                    title: 'Churchplus - Add Workflow',
                }
            },
            ]
        },

        {
            path: 'settings',
            name: 'ChurchSettings',
            component: () =>
                import( /* webpackChunkName: "settings" */ '@/views/settings/ChurchSettings'),
            children: [{
                path: '',
                name: 'MinistryUsers',
                meta: {
                    title: 'Churchplus - Church Settings',
                },
                component: () =>
                    import( /* webpackChunkName: "ministryusers" */ '@/views/settings/MinistryUsers')
            },
            {
                path: 'invitenewuser',
                name: 'InviteNewUser',
                meta: {
                    title: 'Churchplus - Church Settings - Invite User',
                },
                component: () =>
                    import( /* webpackChunkName: "ministryusers" */ '@/views/settings/InviteNewUser')
            },
            {
                path: 'profile',
                name: 'ChurchProfile',
                meta: {
                    title: 'Churchplus - Church Profile',
                },
                component: () =>
                    import( /* webpackChunkName: "churchprofile" */ '@/views/settings/ChurchProfile')
            },
            {
                path: 'defaultmessage',
                name: 'DefaultMessage',
                meta: {
                    title: 'Churchplus - Church Settings - Default Messages',
                },
                component: () =>
                    import( /* webpackChunkName: "defaultmessage" */ '@/views/settings/DefaultMessage')
            },
            {
                path: 'membership',
                name: 'MembershipCategory',
                meta: {
                    title: 'Churchplus - Church Settings - Membership Category',
                },
                component: () =>
                    import( /* webpackChunkName: "membership" */ '@/views/settings/MembershipCategory')
            },
            {
                path: 'attendance',
                name: 'AttendanceCategory',
                meta: {
                    title: 'Churchplus - Church Settings - Attendance Category',
                },
                component: () =>
                    import( /* webpackChunkName: "membership" */ '@/views/settings/AttendanceCategory')
            },
            {
                path: 'social',
                name: 'SocialCategory',
                meta: {
                    title: 'Churchplus - Church Settings - Social&Mobile Category',
                },
                component: () =>
                    import( /* webpackChunkName: "membership" */ '@/views/settings/SocialCategory')
            },
            {
                path: 'ageGroup',
                name: 'AgeGroupCategory',
                meta: {
                    title: 'Churchplus - Church Settings',
                },
                component: () =>
                    import( /* webpackChunkName: "membership" */ '@/views/settings/AgeGroupCategory')
            },
            {
                path: 'giving',
                name: 'OnlineGiving',
                meta: {
                    title: 'Churchplus - Online Giving',
                },
                component: () =>
                    import( /* webpackChunkName: "giving" */ '@/views/settings/OnlineGivingSetup')
            },
            {
                path: 'adddefaultmessage',
                name: 'AddDefaultMessage',
                meta: {
                    title: 'Churchplus - Church Settings - Add | Edit Default Message',
                },
                component: () =>
                    import( /* webpackChunkName: "defaultmessage" */ '@/views/settings/AddDefaultMessage')
            },
            {
                path: 'firsttimersettings',
                name: 'FirstTimerSettings',
                component: () =>
                    import( /* webpackChunkName: "defaultmessage" */ '@/views/settings/FirstTimerSettings')
            },
            {
                path: 'archivedpeople',
                meta: {
                    title: 'Churchplus - Archived People',
                },
                component: () =>
                    import( /* webpackChunkName: "importpeople" */ '../views/people/ArchivedPeople.vue'),
                name: 'ArchivedPeople'
            },
            {
                path: 'branchlevelsettings',
                name: 'BranchLevelSettings',
                component: () =>
                    import( /* webpackChunkName: "defaultmessage" */ '@/views/settings/BranchLevelSettings')
            },
            {
                path: 'customfieldsetup',
                name: 'CustomFieldSetup',
                component: () =>
                    import( /* webpackChunkName: "defaultmessage" */ '@/views/settings/CustomFieldSetup')
            },
            {
                path: 'followupstatus',
                name: 'FollowUpStatus',
                component: () =>
                    import( /* webpackChunkName: "defaultmessage" */ '@/views/settings/FollowUpStatus')
            },
                // {
                //     path: 'details',
                //     name: 'Details',
                //     component: () =>
                //         import ( /* webpackChunkName: "defaultmessage" */ '@/views/settings/Details')
                // },
            ]
        },
        {
            path: 'chartofaccount',
            name: 'ChartOfAccount',
            meta: {
                title: 'Churchplus - Chart Of Accounts',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/accounting/chartOfAccount/ChartOfAccount')
        },
        {
            path: 'media',
            name: 'MediaLibrary',
            component: () =>
                import( /* webpackChunkName: "medialibrary" */ '@/views/media/library/Index'),
            children: [{
                path: '',
                name: 'Gallery',
                meta: {
                    title: 'Churchplus - Media Gallery',
                },
                component: () =>
                    import( /* webpackChunkName: "medialibrary" */ '@/views/media/library/components/Gallery')
            },
            {
                path: 'file',
                name: 'FileDetails',
                meta: {
                    title: 'Churchplus - Media Library',
                },
                component: () =>
                    import( /* webpackChunkName: "medialibrary" */ '@/views/media/file/Index')
            },
            ]
        },
        {
            path: 'upload',
            name: 'UploadMedia',
            meta: {
                title: 'Churchplus - Upload Media',
            },
            component: () =>
                import( /* webpackChunkName: "uploadmedia" */ '@/views/media/upload/Index')
        },
        {
            path: 'chartofaccount/update',
            name: 'OldAccounts',
            meta: {
                title: 'Churchplus - Chart Of Accounts - Update',
            },
            component: () =>
                import( /* webpackChunkName: "oldaccounts" */ '@/views/accounting/chartOfAccount/OldAccounts')
        },
        {
            path: 'offering',
            name: 'Offering',
            meta: {
                title: 'Churchplus - Contributions',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/accounting/offering/Offering')
        },
        {
            path: 'offeringcategory/:offId?',
            name: 'OfferingCategory',
            meta: {
                title: 'Churchplus - Contribution Item Form',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/accounting/offering/SelectOffCat')
        },
        {
            path: 'addoffering/:offId?',
            name: 'AddOffering',
            meta: {
                title: 'Churchplus - Add Contribution',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/accounting/offering/AddOffering')
        },
        {
            path: 'offeringreport',
            name: 'OfferingReport',
            meta: {
                title: 'Churchplus - Contribution Report',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/accounting/offering/OfferingReport')
        },
        {
            path: 'offeringreport',
            name: 'OfferingReport',
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/accounting/offering/OfferingReport')
        },
        {
            path: 'contributionCategory',
            name: 'ContributionCategory',
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/accounting/offering/ContributionCategory')
        },
        {
            path: 'transactionlist',
            name: 'TransactionList',
            meta: {
                title: 'Churchplus - Transactions',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/accounting/transaction/TransactionList')
        },
        {
            path: 'onlinedonation',
            name: 'DonateOnline',
            meta: {
                title: 'Churchplus - Online Donations',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/churchdonation/onlinedonation/Index.vue')
        },
        {
            path: 'payments/:editPayment?',
            name: 'PaymentTransaction',
            meta: {
                title: 'Churchplus - Payment',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/PaymentTransaction')
        },
        {
            path: 'paymentoptions/:paymentId',
            name: 'PaymentOption',
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/PaymentOption')
        },
        {
            path: 'payment',
            name: 'Payment',
            meta: {
                title: 'Churchplus - Payment',
            },
            component: () =>
                import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/Payment')
        },
        {
            path: '/onboardingprocess',
            name: 'OnboardingProcess',
            component: () =>
                import( /* webpackChunkName: "giving" */ '@/views/mobile/mobileapp/OnboardingProcess')
        },
        {
            path: '/mobileonboarding',
            name: 'MobileOnboarding',
            meta: {
                title: 'Churchplus - Mobile Onboarding',
            },
            component: () =>
                import( /* webpackChunkName: "giving" */ '@/views/mobile/mobileapp/MobileOnboarding')
        },
        {
            path: '/appbranding',
            name: 'AppBranding',
            meta: {
                title: 'Churchplus - App Branding',
            },
            component: () =>
                import( /* webpackChunkName: "giving" */ '@/views/mobile/mobileapp/AppBranding')
        },
        {
            path: '/socialmedia',
            name: 'SocialMedia',
            meta: {
                title: 'Churchplus - Social media',
            },
            component: () =>
                import( /* webpackChunkName: "giving" */ '@/views/mobile/mobileapp/SocialMedia')
        },
        {
            path: '/onboardingsuccessful',
            name: 'OnboardingSuccessful',
            component: () =>
                import( /* webpackChunkName: "giving" */ '@/views/mobile/mobileapp/OnboardingSuccessful')
        },
        {
            path: '/churchsetup',
            name: 'ChurchSetUp',
            meta: {
                title: 'Churchplus - Church Setup',
            },
            component: () =>
                import( /* webpackChunkName: "giving" */ '@/views/mobile/mobileapp/ChurchSetUp')
        },
        {
            path: '/donationsetup',
            name: 'DonationSetup',
            meta: {
                title: 'Churchplus - Donation Setup',
            },
            component: () =>
                import( /* webpackChunkName: "giving" */ '@/views/mobile/mobileapp/DonationSetup')
        },
        {
            path: 'pledge',
            component: () =>
                import( /* webpackChunkName: "pledge" */ '../views/pledge/Pledge.vue'),
            children: [
                {
                    path: 'pledgedefinition',
                    meta: {
                        title: 'Churchplus - Pledge',
                    },
                    component: () =>
                        import( /* webpackChunkName: "pledgedefinition" */ '../views/pledge/PledgeDefinition.vue')
                },
                {
                    path: 'pledgeslist',
                    meta: {
                        title: 'Churchplus - Pledge',
                    },
                    component: () =>
                        import( /* webpackChunkName: "pledgeslist" */ '../views/pledge/PledgesList.vue')
                },
                {
                    path: 'pledgedefinitionlist',
                    name: 'PledgeDefinitionList',
                    meta: {
                        title: 'Churchplus - Pledge',
                    },
                    component: () =>
                        import( /* webpackChunkName: "pledgedefinitionlist" */ '../views/pledge/PledgeDefinitionList.vue')
                },
                {
                    path: 'makepledge',
                    name: 'MakePledge',
                    meta: {
                        title: 'Churchplus - Pledge',
                    },
                    component: () =>
                        import( /* webpackChunkName: "makepledge" */ '../views/pledge/MakePledge.vue')
                },
                {
                    path: 'pledgemaking',
                    name: 'PledgeMaking',
                    meta: {
                        title: 'Churchplus - Pledge',
                    },
                    component: () =>
                        import( /* webpackChunkName: "pledgemaking" */ '../views/pledge/PledgeMaking.vue')
                },

                {
                    path: 'pledgepaymentlist',
                    name: 'PledgePaymentList',
                    meta: {
                        title: 'Churchplus - Pledge',
                    },
                    component: () =>
                        import( /* webpackChunkName: "pledgepaymentlist" */ '../views/pledge/PledgePaymentList.vue')
                },
            ]
        }

        ],
    },
    {
        path: '/partnership/pay/',
        name: 'PublicPledgePayment',
        meta: {
            title: 'Churchplus - Church Pledge',
        },
        component: () =>
            import( /* webpackChunkName: "partnershippayment" */ '../views/pledge/PublicPledgePayment.vue')
    },
    {
        path: '/pricing',
        name: 'PricingPage',
        meta: {
            title: 'Churchplus - Pricing ',
        },
        component: () =>
            import( /* webpackChunkName: "dashboard" */ '../views/dashboard/PricingPage.vue')
    },
    // {
    //     path: '/PublicPledgeMaking/:id',
    //     name: 'PublicPledgeMaking',
    //     meta: {
    //         title: 'Churchplus - Church Pledge',
    //     },
    //     component: () =>
    //     import ( /* webpackChunkName: "peopleempty" */ '../views/pledge/PublicPledgeMaking.vue')
    // },
    {
        path: '/checkin/e/:code',
        name: 'WebCheckin',
        meta: {
            title: 'Churchplus - Web Checkin',
        },
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/event/attendance&checkin/MarkinAttendance')
    },
    {
        path: '/event/:checkinId',
        name: 'EventRegistration',
        meta: {
            title: 'Churchplus - Event Registration',
        },
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/event/EventRegistration')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/onlinegivingform1',
        name: 'OnlineGiving',
        meta: {
            title: 'Churchplus - Online Giving',
        },
        component: () =>
            import( /* webpackChunkName: "giving" */ '@/views/giving/onlinegiving/GivingForm')
    },
    {
        path: '/onlinegivingform2',
        name: 'OnlineGiving2',
        component: () =>
            import( /* webpackChunkName: "giving" */ '@/views/giving/onlinegiving/GivingForm2')
    },
    {
        path: '/onlinegivingform3',
        name: 'OnlineGiving3',
        component: () =>
            import( /* webpackChunkName: "giving" */ '@/views/giving/onlinegiving/GivingForm3')
    },
    {
        path: '/give/:userId?',
        name: 'OnlineGiving4',
        meta: {
            title: 'Churchplus - Online Giving',
        },
        component: () =>
            import( /* webpackChunkName: "giving" */ '@/views/giving/onlinegiving/GivingForm4')
    },
    {
        path: '/iframe/:userId?',
        name: 'iFrame',
        component: () =>
            import( /* webpackChunkName: "giving" */ '@/views/giving/onlinegiving/iFrame')
    },
    {
        path: '/pay',
        name: 'Pay',
        meta: {
            title: 'Churchplus - Pay',
        },
        component: () =>
            import( /* webpackChunkName: "giving" */ '@/views/giving/onlinegiving/Pay')
    },
    {
        path: '/onlinegivingform5',
        name: 'OnlineGiving5',
        component: () =>
            import( /* webpackChunkName: "giving" */ '@/views/giving/onlinegiving/GivingForm5')
    },
    {
        path: '/paymentgivingform2',
        name: 'OnlineGivingform2',
        component: () =>
            import( /* webpackChunkName: "giving" */ '@/views/giving/onlinegiving/PaymentGivingForm2')
    },
    {
        path: '/signuppayment/:userId?',
        name: 'SignUpPayment',
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/SignUpPayment')
    },
    {
        path: '/signinpayment/:userId?',
        name: 'SignInPayment',
        meta: {
            title: 'Churchplus - Payment',
        },
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/SignInPayment')
    },
    {
        path: '/transactionpage/:userId?',
        name: 'TransactionPage',
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/donation/TransactionPage')
    },
    {
        path: '/childcheckin',
        name: 'PublibView',
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/event/childcheckin/components/PublicView')
    },
    {
        path: '/checkinsignup/:tenantId',
        name: 'CheckinSignup',
        component: () =>
            import( /* webpackChunkName: "workflow" */ '../views/ChildCheckinPortal/CheckinSignup.vue'),
        meta: {
            title: 'Churchplus - ChildSignup',
        }
    },
    {
        path: '/childcheckin/:tenantId',
        name: 'CheckinSignin',
        component: () =>
            import( /* webpackChunkName: "workflow" */ '../views/ChildCheckinPortal/CheckinSignin.vue'),
        meta: {
            title: 'Churchplus - ChildSignin',
        },
        beforeEnter() {
            window.location.href = "https://child-checkin-seven.vercel.app/";
        },
    },
    {
        path: '/checkin',
        name: 'BaseIndex',
        component: () =>
            import( /* webpackChunkName: "defaultmessage" */ '@/views/ChildCheckinPortal/BaseIndex'),
        children: [{
            path: '',
            name: 'CheckinDashboard',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/CheckinDashboard')
        },
        {
            path: 'checkinfamily',
            name: 'CheckinFamily',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/CheckinFamily')
        },
        {
            path: 'checkinevent/:eventId',
            name: 'CheckinEvent',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/CheckinEvent')
        },
        {
            path: 'upcomingevents',
            name: 'UpcomingEvents',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/UpcomingEvents')
        },
        {
            path: 'checkinprofile',
            name: 'CheckinProfile',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/CheckinProfile')
        },
        {
            path: 'checkinguardian',
            name: 'Guardian',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/Guardian')
        },
        {
            path: 'thankyou/:code',
            name: 'ThankYou',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/views/ChildCheckinPortal/ThankYou')
        }
        ]
    },
    {
        path: '/createmember/',
        name: 'PublicPerson',
        meta: {
            title: 'Register member',
        },
        component: () =>
            import( /* webpackChunkName: "emailsent" */ '../views/people/PublicPerson.vue')
    },
    {
        path: '/createfirsttimer/:id',
        name: 'PublicFirstTimer',
        meta: {
            title: 'Register firsttimer',
        },
        component: () =>
            import( /* webpackChunkName: "emailsent" */ '../views/people/PublicFirstTimer.vue')
    },
    {
        path: '/createnewconvert/:id',
        name: 'PublicNewConvert',
        meta: {
            title: 'Register newconvert',
        },
        component: () =>
            import( /* webpackChunkName: "emailsent" */ '../views/people/PublicNewConvert.vue')
    },
    {
        path: '/errorpage',
        name: 'errorpage',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/components/errorpages/PageError'),
        children: [{
            path: 'expiredSubscription',
            name: 'ExpiredSubscription',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/components/errorpages/ExpiredSubscription'),
        },
        {
            path: 'unauthorized',
            name: 'Unauthorized',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/components/errorpages/Unauthorized')
        },
        {
            path: 'member-capacity-reached',
            name: 'MemberMaxCap',
            component: () =>
                import( /* webpackChunkName: "sentemails" */ '@/components/errorpages/MemberMaxCap')
        }
        ]
    },
    {
        path: '/subexpired',
        name: 'subexpired',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/components/expiredpages/SubExpired'),

    },
    {
        path: '/sendsmsexpired',
        name: 'SendSmsExpired',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/components/expiredpages/SendSmsExpired'),

    },
    {
        path: '/buyunitsexpired',
        name: 'BuyUnitsExpired',
        component: () =>
            import( /* webpackChunkName: "sentemails" */ '@/components/expiredpages/BuyUnitsExpired'),

    },
    {
        path: '/feedbackform',
        name: 'FollowUpFeedbackForm',
        component: () =>
            import( /* webpackChunkName: "followupfeedback" */ '@/views/people/followup/FollowUpFeedbackForm'),

    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {

    const checkinToken = localStorage.getItem('checkinToken')
    //   alert(4)
    if ((to.name === "CheckinSignUp" || to.name === "CheckinSignin") && checkinToken) {
        //   alert("hello")
        return next({ name: 'CheckinDashboard' })
    }
    //   else {
    //       alert(false)
    //   }

    const token = localStorage.getItem("token")
    const role = localStorage.getItem("roles") ? JSON.parse(localStorage.getItem("roles")) : ''
    const tokenIsValid = token && token.length > 30 ? true : false;
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    if ((to.name === "ResetPassword" ||
        to.name === "EmailSent" ||
        to.name === "OnboardingForm" ||
        to.name === "WebCheckin" ||
        to.name === "OnlineGiving4" ||
        to.name === "Pay" ||
        to.name === "iFrame" ||
        to.name === "SignUpPayment" ||
        to.name === "SignInPayment" ||
        to.name === "TransactionPage" ||
        to.name === "PublicResetPassword" ||
        to.name === "PublicPerson" ||
        to.name === "PublicFirstTimer" ||
        to.name === "PublicNewConvert" ||
        to.name === "EventRegistration" ||
        to.name === "PricingPage" ||
        to.name === "PublicPledgePayment") && !tokenIsValid) return next(true)


    if ((to.name !== "Login" && to.name !== "Register") && to.name !== "Onboarding" && to.name !== "StartingPoint" && to.name !== "ForgotPassword" && to.name !== "ResetPassword" && to.name !== "TermsOfUse" && (!token || token.length < 30)) return next("/")
    if ((to.name === "Login" || to.name === "Register") && tokenIsValid) return next("/tenant")

    if ((role && role.length === 1 && role[0] === "FollowUp" && token) && (to.path !== "/tenant/followup" && to.name !== "FirsttimerManagement")) {
        localStorage.removeItem('token')
        next("/")
    }
    else {
        next(true)
    }
    next(true)


    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title;
    } else if (previousNearestWithMeta) {
        document.title = previousNearestWithMeta.meta.title;
    }

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));

})

router.onError((error) => {
    console.log(error, 'router error')
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});



export default router